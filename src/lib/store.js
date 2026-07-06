import { supabase, isSupabaseConfigured } from './supabaseClient'

// ---------------------------------------------------------------------------
// Progress store.
//
// The whole of Sravya's progress is one JSON object:
//   {
//     days: { "1.1": { done: true, doneAt: "2026-07-06", notes: "..." }, ... },
//     startDate: "2026-07-01",
//     updatedAt: "2026-07-06T10:00:00.000Z"
//   }
//
// It's always mirrored to localStorage (instant, offline). When Supabase is
// configured, it's ALSO saved to a `progress` row keyed by `learnerKey`, so it
// syncs across devices. Reads prefer the cloud copy when it's newer.
// ---------------------------------------------------------------------------

const LS_STATE = 'sravya:progress'
const LS_KEY = 'sravya:learnerKey'

export const emptyState = () => ({ days: {}, startDate: null, updatedAt: null })

// A stable per-learner key so the cloud row can be found again. Defaults to
// "sravya" but the user can change it (Settings) to share/isolate a profile.
export function getLearnerKey() {
  try {
    return localStorage.getItem(LS_KEY) || 'sravya'
  } catch {
    return 'sravya'
  }
}

export function setLearnerKey(key) {
  try {
    localStorage.setItem(LS_KEY, key.trim() || 'sravya')
  } catch {
    /* ignore */
  }
}

function readLocal() {
  try {
    const raw = localStorage.getItem(LS_STATE)
    return raw ? JSON.parse(raw) : emptyState()
  } catch {
    return emptyState()
  }
}

function writeLocal(state) {
  try {
    localStorage.setItem(LS_STATE, JSON.stringify(state))
  } catch {
    /* ignore quota / private mode */
  }
}

// Load progress: merge local + cloud, preferring whichever was updated later.
export async function loadProgress() {
  const local = readLocal()
  if (!isSupabaseConfigured) return local

  try {
    const key = getLearnerKey()
    const { data, error } = await supabase
      .from('progress')
      .select('state, updated_at')
      .eq('learner_key', key)
      .maybeSingle()

    if (error) throw error
    if (!data?.state) return local

    const cloud = data.state
    const cloudTime = new Date(data.updated_at || cloud.updatedAt || 0).getTime()
    const localTime = new Date(local.updatedAt || 0).getTime()
    const winner = cloudTime >= localTime ? cloud : local
    writeLocal(winner)
    return winner
  } catch (err) {
    console.warn('[store] cloud load failed, using local copy:', err.message)
    return local
  }
}

// Save progress: always local; push to cloud when configured (fire-and-report).
export async function saveProgress(state) {
  const stamped = { ...state, updatedAt: new Date().toISOString() }
  writeLocal(stamped)

  if (!isSupabaseConfigured) return { synced: false, state: stamped }

  try {
    const key = getLearnerKey()
    const { error } = await supabase
      .from('progress')
      .upsert(
        { learner_key: key, state: stamped, updated_at: stamped.updatedAt },
        { onConflict: 'learner_key' }
      )
    if (error) throw error
    return { synced: true, state: stamped }
  } catch (err) {
    console.warn('[store] cloud save failed, kept local copy:', err.message)
    return { synced: false, state: stamped, error: err.message }
  }
}

export { isSupabaseConfigured }
