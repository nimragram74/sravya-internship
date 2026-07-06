import { useEffect, useRef } from 'react'
import { weeks } from '../data/curriculum'
import DayCard from './DayCard'

export default function WeeksView({ state, stats, toggleDay, setNote, focusWeek, focusDayId }) {
  const weekRefs = useRef({})
  const dayRefs = useRef({})

  // Scroll to a requested week or day when navigating in.
  useEffect(() => {
    if (focusDayId && dayRefs.current[focusDayId]) {
      dayRefs.current[focusDayId].scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else if (focusWeek && weekRefs.current[focusWeek]) {
      weekRefs.current[focusWeek].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [focusWeek, focusDayId])

  return (
    <>
      <div className="eyebrow">The path · day by day</div>
      <h2 className="section-title">Eight weeks, one hour at a time</h2>
      <p className="lead">
        Each day has <b style={{ color: 'var(--accent)' }}>Learn</b> (steps + the exact link) and{' '}
        <b style={{ color: 'var(--build)' }}>Do</b> (a lab with a <b style={{ color: 'var(--accent-deep)' }}>Done when</b> check). Tick the box when the lab passes; jot notes as you go.
      </p>

      {weeks.map((w) => {
        const p = stats.byWeek[w.num] || { done: 0, total: w.days.length }
        const wpct = Math.round((p.done / p.total) * 100)
        return (
          <div key={w.num} ref={(el) => (weekRefs.current[w.num] = el)}>
            <header className="week-head">
              <div className="week-num">
                Week
                <b>{w.num}</b>
              </div>
              <div className="week-meta">
                <span className="week-code">{w.code}</span>
                <h3>{w.title}</h3>
                <p className="week-goal">{w.goal}</p>
              </div>
              <div className="week-progress">
                <div className="mini-bar">
                  <i style={{ width: `${wpct}%` }} />
                </div>
                <span>{p.done}/{p.total}</span>
              </div>
            </header>

            {w.days.map((d) => (
              <div key={d.id} ref={(el) => (dayRefs.current[d.id] = el)}>
                <DayCard
                  day={d}
                  record={state.days[d.id]}
                  onToggle={toggleDay}
                  onNote={setNote}
                  defaultOpen={d.id === focusDayId}
                />
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}
