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

  // Compose a short WhatsApp-ready message and open the share sheet.
  const shareToWhatsApp = () => {
    const today = todayISO()
    const doneToday = info.completions.filter((c) => c.doneAt === today)
    const nextDay = allDays.find((d) => !state.days[d.id]?.done)
    const dateLabel = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    const lines = [
      `🌱 *Sravya — Daily Update*`,
      `${dateLabel}`,
      ``,
      doneToday.length ? `✅ Today: ${doneToday.length} lab(s) done — ${doneToday.map((c) => c.id).join(', ')}` : `⚠️ Today: no lab completed yet`,
      `🔥 Streak: ${stats.streak} day${stats.streak === 1 ? '' : 's'}`,
      `📊 Progress: ${stats.completed}/${stats.total} days (${stats.pct}%)`,
      nextDay ? `👉 Next up: Day ${nextDay.id} — ${nextDay.focus}` : `🎉 All ${stats.total} days complete!`,
      ``,
      `Open: https://sravya-internship.vercel.app/`,
    ]
    const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener')
  }

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
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn ghost sm" onClick={refresh} title="Fetch the latest from the cloud">
            ↻ Refresh
          </button>
          <button className="btn sm wa-btn" onClick={shareToWhatsApp} title="Send today's summary on WhatsApp">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" style={{ marginRight: 6, verticalAlign: '-2px' }}>
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 2.1.55 4.15 1.6 5.96L2 22l4.28-1.12a9.9 9.9 0 0 0 5.76 1.84h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.73c0 4.47-3.64 8.1-8.1 8.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.54.67.68-2.48-.2-.32a8.07 8.07 0 0 1-1.24-4.3c0-4.46 3.63-8.1 8.08-8.1Zm4.66 10.2c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.13.17 1.78 2.72 4.3 3.81.6.26 1.07.42 1.44.53.6.2 1.15.17 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.11-.23-.17-.48-.29Z" />
            </svg>
            WhatsApp
          </button>
        </div>
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
