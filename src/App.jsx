import { useState } from 'react'
import { useProgress } from './hooks/useProgress'
import Dashboard from './components/Dashboard'
import WeeksView from './components/WeeksView'
import Reference from './components/Reference'
import Certificate from './components/Certificate'
import Settings from './components/Settings'
import MentorView from './components/MentorView'

const TABS = [
  { id: 'home', label: 'Dashboard' },
  { id: 'weeks', label: 'The Path' },
  { id: 'reference', label: 'Reference' },
  { id: 'certificate', label: 'Certificate' },
  { id: 'mentor', label: 'Mentor' },
  { id: 'settings', label: 'Settings' },
]

function SyncPill({ sync }) {
  const map = {
    cloud: { cls: '', text: 'Synced' },
    local: { cls: 'local', text: 'Saved locally' },
    saving: { cls: 'saving', text: 'Saving…' },
    error: { cls: 'error', text: 'Offline — saved locally' },
  }
  const s = map[sync.status] || map.local
  return (
    <span className={`sync-pill ${s.cls}`} title="Your progress is saved automatically">
      <span className="sync-dot" />
      {s.text}
    </span>
  )
}

export default function App() {
  const { state, loading, sync, stats, toggleDay, setNote, setStartDate, resetAll, refresh } = useProgress()
  const [tab, setTab] = useState('home')
  const [focusWeek, setFocusWeek] = useState(null)
  const [focusDayId, setFocusDayId] = useState(null)

  const openWeek = (num) => {
    setFocusDayId(null)
    setFocusWeek(num)
    setTab('weeks')
  }
  const goToDay = (day) => {
    setFocusWeek(null)
    setFocusDayId(day.id)
    setTab('weeks')
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#7fd3ac" strokeWidth="2" />
                <path d="M8 12.5l2.5 2.5L16 9" stroke="#0f7a52" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <b>AI Product Builder</b>
              <span>Sravya's Internship</span>
            </div>
          </div>
          <SyncPill sync={sync} />
          <nav className="nav">
            {TABS.map((t) => (
              <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="wrap">
        {loading ? (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '60px 0' }}>Loading your progress…</p>
        ) : (
          <>
            {tab === 'home' && <Dashboard stats={stats} onOpenWeek={openWeek} onGoNext={goToDay} />}
            {tab === 'weeks' && (
              <WeeksView
                state={state}
                stats={stats}
                toggleDay={toggleDay}
                setNote={setNote}
                focusWeek={focusWeek}
                focusDayId={focusDayId}
              />
            )}
            {tab === 'reference' && <Reference />}
            {tab === 'certificate' && <Certificate stats={stats} />}
            {tab === 'mentor' && <MentorView state={state} stats={stats} sync={sync} refresh={refresh} />}
            {tab === 'settings' && <Settings state={state} setStartDate={setStartDate} resetAll={resetAll} />}
          </>
        )}

        <footer className="foot">
          Step-by-step follow-as-is workbook · One hour a day · Keep the streak, keep the habits.
        </footer>
      </main>
    </div>
  )
}
