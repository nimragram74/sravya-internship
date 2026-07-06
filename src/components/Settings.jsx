import { useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabaseClient'
import { getLearnerKey, setLearnerKey } from '../lib/store'

export default function Settings({ state, setStartDate, resetAll }) {
  const [key, setKey] = useState(getLearnerKey())
  const [saved, setSaved] = useState(false)

  const saveKey = () => {
    setLearnerKey(key)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <>
      <div className="eyebrow">Settings</div>
      <h2 className="section-title">Your profile &amp; sync</h2>
      <p className="lead">Set your start date, manage cloud sync, and reset progress if you ever want a clean slate.</p>

      <section className="block" style={{ marginTop: 24 }}>
        <h3 className="section-title" style={{ fontSize: 19 }}>Start date</h3>
        <div className="field">
          <label htmlFor="start">When did (or will) you begin?</label>
          <input id="start" type="date" value={state.startDate || ''} onChange={(e) => setStartDate(e.target.value)} />
          <div className="hint">Used to frame your journey. Your streak is based on the days you actually tick off.</div>
        </div>
      </section>

      <section className="block" style={{ marginTop: 30 }}>
        <h3 className="section-title" style={{ fontSize: 19 }}>Cloud sync</h3>
        {isSupabaseConfigured ? (
          <div className="banner info">
            ✓ Supabase is connected. Your progress syncs across devices under the profile key below.
          </div>
        ) : (
          <div className="banner warn">
            Cloud sync is off. Progress is saved safely in this browser (localStorage). To sync across devices, add
            {' '}<code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (see the README), then redeploy.
          </div>
        )}
        <div className="field" style={{ marginTop: 16 }}>
          <label htmlFor="lkey">Profile key</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input id="lkey" value={key} onChange={(e) => setKey(e.target.value)} />
            <button className="btn sm" onClick={saveKey}>{saved ? 'Saved ✓' : 'Save'}</button>
          </div>
          <div className="hint">A name that identifies your progress row in the cloud. Keep it the same on every device to sync.</div>
        </div>
      </section>

      <section className="block" style={{ marginTop: 30 }}>
        <h3 className="section-title" style={{ fontSize: 19 }}>Danger zone</h3>
        <button
          className="btn ghost danger"
          onClick={() => {
            if (window.confirm('Reset ALL progress and notes? This cannot be undone.')) resetAll()
          }}
        >
          Reset all progress
        </button>
      </section>
    </>
  )
}
