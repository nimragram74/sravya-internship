import { useState } from 'react'

function Check({ on, onClick }) {
  return (
    <button className={`check ${on ? 'on' : ''}`} onClick={onClick} aria-pressed={on} aria-label={on ? 'Mark not done' : 'Mark done'}>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </button>
  )
}

// Renders a single day: header (checkbox, focus, expand) + expandable detail.
export default function DayCard({ day, record, onToggle, onNote, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const done = Boolean(record?.done)

  return (
    <article className={`day ${done ? 'is-done' : ''}`}>
      <div className="day-rail">
        <span className="day-no">{day.id}</span>
        <Check on={done} onClick={() => onToggle(day.id)} />
      </div>
      <div className="day-body">
        <div className="day-top">
          <span className="dow">{day.dow}</span>
          <span className="mins">{day.mins} min</span>
          <h4 className="focus">{day.focus}</h4>
          <button className={`expander ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Toggle details">
            ⌄
          </button>
        </div>

        {open && (
          <div className="day-detail">
            <div className="seg">
              <span className="seg-tag learn">Learn</span>
              <div className="seg-body">
                <ol className="steps">
                  {day.learn.map((s, i) => (
                    <li key={i}>
                      {s.text}
                      {s.link && (
                        <>
                          {' '}
                          <a href={s.link} target="_blank" rel="noopener noreferrer">
                            {s.linkLabel || s.link} ↗
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="seg">
              <span className="seg-tag build">Do</span>
              <div className="seg-body">
                <div className="labbox">
                  <div className="lab-h">Lab · {day.lab.title}</div>
                  <ol className="steps lab-steps">
                    {day.lab.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                  <div className="done-when">
                    <b>Done when</b>
                    {day.lab.doneWhen}
                  </div>
                </div>
              </div>
            </div>

            {day.tools?.length > 0 && (
              <div className="chips">
                {day.tools.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="notes">
              <label htmlFor={`note-${day.id}`}>My notes · what I learned / where I got stuck</label>
              <textarea
                id={`note-${day.id}`}
                value={record?.notes || ''}
                onChange={(e) => onNote(day.id, e.target.value)}
                placeholder="Jot your own answer first, then compare with the AI. What did you learn today?"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
