import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loadProgress, saveProgress, emptyState, isSupabaseConfigured } from '../lib/store'
import { allDays } from '../data/curriculum'

const todayISO = () => new Date().toISOString().slice(0, 10)

// Central hook: owns the progress state, exposes actions + derived stats.
export function useProgress() {
  const [state, setState] = useState(emptyState())
  const [loading, setLoading] = useState(true)
  const [sync, setSync] = useState({ status: isSupabaseConfigured ? 'cloud' : 'local', savedAt: null })
  const saveTimer = useRef(null)

  // Initial load (cloud + local merge).
  useEffect(() => {
    let alive = true
    loadProgress().then((s) => {
      if (!alive) return
      setState(s)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  // Debounced persistence whenever state changes (but not on first load).
  const firstRun = useRef(true)
  useEffect(() => {
    if (loading) return
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    setSync((s) => ({ ...s, status: 'saving' }))
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      const res = await saveProgress(state)
      setSync({
        status: isSupabaseConfigured ? (res.synced ? 'cloud' : 'error') : 'local',
        savedAt: new Date().toISOString(),
      })
    }, 500)
    return () => clearTimeout(saveTimer.current)
  }, [state, loading])

  const toggleDay = useCallback((id) => {
    setState((prev) => {
      const cur = prev.days[id] || {}
      const done = !cur.done
      const days = { ...prev.days, [id]: { ...cur, done, doneAt: done ? todayISO() : null } }
      const startDate = prev.startDate || (done ? todayISO() : null)
      return { ...prev, days, startDate }
    })
  }, [])

  const setNote = useCallback((id, notes) => {
    setState((prev) => ({
      ...prev,
      days: { ...prev.days, [id]: { ...(prev.days[id] || {}), notes } },
    }))
  }, [])

  const setStartDate = useCallback((date) => {
    setState((prev) => ({ ...prev, startDate: date || null }))
  }, [])

  const resetAll = useCallback(() => {
    setState(emptyState())
  }, [])

  const stats = useMemo(() => computeStats(state), [state])

  return { state, loading, sync, stats, toggleDay, setNote, setStartDate, resetAll }
}

function computeStats(state) {
  const total = allDays.length
  const completed = allDays.filter((d) => state.days[d.id]?.done).length
  const pct = total ? Math.round((completed / total) * 100) : 0

  // Per-week completion.
  const byWeek = {}
  for (const d of allDays) {
    byWeek[d.week] = byWeek[d.week] || { done: 0, total: 0 }
    byWeek[d.week].total += 1
    if (state.days[d.id]?.done) byWeek[d.week].done += 1
  }

  // Next unfinished day (in curriculum order).
  const nextDay = allDays.find((d) => !state.days[d.id]?.done) || null

  // Streak: consecutive calendar days (ending today or yesterday) that have
  // at least one completed lab.
  const dates = new Set(
    Object.values(state.days)
      .filter((d) => d.done && d.doneAt)
      .map((d) => d.doneAt)
  )
  let streak = 0
  const cursor = new Date()
  const has = (dt) => dates.has(dt.toISOString().slice(0, 10))
  if (!has(cursor)) cursor.setDate(cursor.getDate() - 1) // allow "yesterday" grace
  while (has(cursor)) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return { total, completed, pct, byWeek, nextDay, streak, allDone: completed === total && total > 0 }
}
