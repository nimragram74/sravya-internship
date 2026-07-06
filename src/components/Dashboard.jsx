import ProgressRing from './ProgressRing'
import { weeks, meta } from '../data/curriculum'

export default function Dashboard({ stats, onOpenWeek, onGoNext }) {
  const { pct, completed, total, streak, byWeek, nextDay } = stats

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-grid">
            <div className="ring-wrap">
              <ProgressRing pct={pct} />
            </div>
            <div>
              <h1>Hi Sravya — let's build something real today.</h1>
              <p>{meta.subtitle}</p>
              <div className="stat-row">
                <div className="stat">
                  <b>{completed}<span style={{ fontSize: 14, color: '#7aa892' }}>/{total}</span></b>
                  <span>Days done</span>
                </div>
                <div className="stat">
                  <b className="fire">{streak}🔥</b>
                  <span>Day streak</span>
                </div>
                <div className="stat">
                  <b>{Object.values(byWeek).filter((w) => w.done === w.total).length}<span style={{ fontSize: 14, color: '#7aa892' }}>/8</span></b>
                  <span>Weeks shipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {nextDay ? (
        <div className="card nextup">
          <div>
            <div className="np-tag">Next up · Day {nextDay.id}</div>
            <h3>{nextDay.focus}</h3>
            <div className="np-meta">
              Week {nextDay.week} · {nextDay.dow} · {nextDay.mins} min · Lab: {nextDay.lab.title}
            </div>
          </div>
          <button className="btn" onClick={() => onGoNext(nextDay)}>
            Start today's work →
          </button>
        </div>
      ) : (
        <div className="card nextup">
          <div>
            <div className="np-tag">🎉 Internship complete</div>
            <h3>Every day is done — you shipped it.</h3>
            <div className="np-meta">Head to the Certificate tab to celebrate.</div>
          </div>
        </div>
      )}

      <section className="block">
        <div className="eyebrow">The path</div>
        <h2 className="section-title">Your 8 weeks at a glance</h2>
        <p className="lead">Java &amp; OOP → plan the product → database → backend + AI → React frontend → deploy &amp; pitch. Tap a week to jump in.</p>
        <div className="weekbars">
          {weeks.map((w) => {
            const p = byWeek[w.num] || { done: 0, total: w.days.length }
            const wpct = Math.round((p.done / p.total) * 100)
            const complete = p.done === p.total
            return (
              <div className={`card weekbar ${complete ? 'complete' : ''}`} key={w.num} onClick={() => onOpenWeek(w.num)}>
                <div className="weekbar-top">
                  <b>Week {w.num}{complete ? ' ✓' : ''}</b>
                  <span className="wk-code">{w.code.split('—')[0].trim()}</span>
                </div>
                <div className="wk-sub">{w.title}</div>
                <div className="bar">
                  <i style={{ width: `${wpct}%` }} />
                </div>
                <span className="wk-count">{p.done}/{p.total} days · {wpct}%</span>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
