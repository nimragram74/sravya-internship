import { useMemo } from 'react'
import { allDays } from '../data/curriculum'

const DAY_MS = 24 * 60 * 60 * 1000
const todayISO = () => new Date().toISOString().slice(0, 10)

function daysAgo(iso) {
  if (!iso) return null
  const then = new Date(iso).getTime()
  return Math.floor((Date.now() - then) / DAY_MS)
}

function relTime(iso) {
  if (!iso) return 'never'
  const d = daysAgo(iso)
  if (d === 0) return 'today'
  if (d === 1) return 'yesterday'
  return `${d} days ago`
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

// A read-only page for the mentor: at-a-glance "is she doing daily work?".
export default function MentorView({ state, stats, sync, refresh }) {
  const info = useMemo(() => {
    const byId = Object.fromEntries(allDays.map((d) => [d.id, d]))

    // Completed labs, newest first.
    const completions = Object.entries(state.days)
      .filter(([, r]) => r?.done && r?.doneAt)
      .map(([id, r]) => ({ id, doneAt: r.doneAt, day: byId[id] }))
      .sort((a, b) => (a.doneAt < b.doneAt ? 1 : -1))

    // Notes she has written, newest activity first (best-effort ordering by day id).
    const notes = Object.entries(state.days)
      .filter(([, r]) => r?.notes && r.notes.trim())
      .map(([id, r]) => ({ id, notes: r.notes.trim(), day: byId[id] }))
      .sort((a, b) => (a.id < b.id ? 1 : -1))

    const completionDates = new Set(completions.map((c) => c.doneAt))
    const today = todayISO()
    const workedToday = completionDates.has(today)
    const lastActive = state.updatedAt || null
    const lastCompletion = completions[0]?.doneAt || null

    // 21-day activity strip (oldest → newest).
    const strip = []
    for (let i = 20; i >= 0; i--) {
      const d = new Date(Date.now() - i * DAY_MS)
      const iso = d.toISOString().slice(0, 10)
      strip.push({ iso, active: completionDates.has(iso), dow: d.toLocaleDateString(undefined, { weekday: 'narrow' }) })
    }

    return { completions, notes, workedToday, lastActive, lastCompletion, strip, completionDates }
  }, [state])

  // Status light: green if worked today, amber if within the last 2 days, red otherwise.
  const sinceCompletion = daysAgo(info.lastCompletion)
  let light = 'red'
  let headline = 'No work done yet'
  let sub = 'She hasn’t completed any labs so far. Nudge her to start Day 1.1.'
  if (info.workedToday) {
    light = 'green'
    headline = 'Completed a lab today ✓'
    sub = 'She has finished at least one “Done when” today. Nice — the streak continues.'
  } else if (sinceCompletion !== null && sinceCompletion <= 2) {
    light = 'amber'
    headline = sinceCompletion === 1 ? 'No lab completed today (yet)' : 'Last worked 2 days ago'
    sub = 'Recently active, but nothing finished today. A good moment for the 10-min check-in.'
  } else if (sinceCompletion !== null) {
    light = 'red'
    headline = `No activity for ${sinceCompletion} days`
    sub = 'The streak has broken. Time for a gentle nudge.'
  }

  return (
    <>
      <div className="eyebrow">For the mentor</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <h2 className="section-title" style={{ marginBottom: 4 }}>How is Sravya doing?</h2>
        <button className="btn ghost sm" onClick={refresh} title="Fetch the latest from the cloud">
          ↻ Refresh
        </button>
      </div>
      <p className="lead">
        A quick read on daily activity.{' '}
        {sync.status === 'local'
          ? 'Note: cloud sync is off, so this reflects only this device.'
          : 'Live from the cloud — works from any device using the same profile key.'}
      </p>

      {/* Status light */}
      <div className={`card mentor-status ${light}`}>
        <div className="light-dot" aria-hidden="true" />
        <div>
          <h3>{headline}</h3>
          <p>{sub}</p>
        </div>
      </div>

      {/* Key numbers */}
      <div className="mentor-metrics">
        <div className="card mmetric">
          <b>{stats.streak}🔥</b>
          <span>Day streak</span>
        </div>
        <div className="card mmetric">
          <b>{stats.completed}<i>/{stats.total}</i></b>
          <span>Days completed</span>
        </div>
        <div className="card mmetric">
          <b>{stats.pct}%</b>
          <span>Overall progress</span>
        </div>
        <div className="card mmetric">
          <b style={{ fontSize: 17 }}>{relTime(info.lastActive)}</b>
          <span>Last active {info.lastActive ? `· ${fmtDate(info.lastActive)}` : ''}</span>
        </div>
      </div>

      {/* 21-day activity strip */}
      <section className="block" style={{ marginTop: 34 }}>
        <h3 className="section-title" style={{ fontSize: 18 }}>Last 3 weeks of activity</h3>
        <p className="lead" style={{ marginBottom: 12 }}>A filled square = she completed at least one lab that day.</p>
        <div className="heat">
          {info.strip.map((c) => (
            <div key={c.iso} className={`heat-cell ${c.active ? 'on' : ''}`} title={`${c.iso}${c.active ? ' · worked' : ' · no completions'}`}>
              <span>{c.dow}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent completions */}
      <section className="block" style={{ marginTop: 34 }}>
        <h3 className="section-title" style={{ fontSize: 18 }}>Recent completed labs</h3>
        {info.completions.length === 0 ? (
          <p className="lead">Nothing completed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ width: 60 }}>Day</th>
                <th>What she finished</th>
                <th style={{ width: 130 }}>Completed</th>
              </tr>
            </thead>
            <tbody>
              {info.completions.slice(0, 10).map((c) => (
                <tr key={c.id}>
                  <td className="mono">{c.id}</td>
                  <td>{c.day ? c.day.focus : '—'}</td>
                  <td>{fmtDate(c.doneAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Her notes */}
      <section className="block" style={{ marginTop: 34 }}>
        <h3 className="section-title" style={{ fontSize: 18 }}>Her notes (what she wrote)</h3>
        {info.notes.length === 0 ? (
          <p className="lead">No notes written yet. Encourage her to jot her own answer before asking the AI.</p>
        ) : (
          info.notes.slice(0, 8).map((n) => (
            <div className="card note-item" key={n.id}>
              <div className="note-head">
                <span className="mono">Day {n.id}</span>
                {n.day && <span>{n.day.focus}</span>}
              </div>
              <p>{n.notes}</p>
            </div>
          ))
        )}
      </section>

      <div className="banner info" style={{ marginTop: 34 }}>
        <b>Mentor tip:</b> The daily 10-minute check-in — ask her to <i>show you today’s “Done when”</i> live, then pick one line of her work and ask “why does this work?”. That one question is the real learning check.
      </div>
    </>
  )
}
