// Vercel Serverless Function — sends a daily WhatsApp progress report.
//
// Triggered automatically by the Vercel Cron defined in vercel.json (once a day),
// and can also be called manually for testing. It reads Sravya's progress from
// Supabase and sends a short summary to a WhatsApp number via CallMeBot (free).
//
// Required environment variables (set in Vercel → Settings → Environment Variables):
//   VITE_SUPABASE_URL        (already set) — Supabase project URL
//   VITE_SUPABASE_ANON_KEY   (already set) — Supabase anon key
//   CALLMEBOT_PHONE          — your WhatsApp number incl. country code, e.g. +9199XXXXXXXX
//   CALLMEBOT_APIKEY         — the API key CallMeBot gives you
// Optional:
//   LEARNER_KEY              — profile key to report on (default "sravya")
//   CRON_SECRET              — if set, callers must send "Authorization: Bearer <secret>"

import { allDays } from '../src/data/curriculum.js'

const DAY_MS = 24 * 60 * 60 * 1000
const iso = (d) => d.toISOString().slice(0, 10)

function buildSummary(state) {
  const days = state?.days || {}
  const total = allDays.length
  const doneList = allDays.filter((d) => days[d.id]?.done)
  const completed = doneList.length
  const pct = total ? Math.round((completed / total) * 100) : 0

  const today = iso(new Date())
  const doneToday = allDays.filter((d) => days[d.id]?.doneAt === today)

  // Streak: consecutive days (ending today or yesterday) with a completed lab.
  const dates = new Set(
    Object.values(days).filter((r) => r?.done && r?.doneAt).map((r) => r.doneAt)
  )
  let streak = 0
  const cur = new Date()
  const has = (dt) => dates.has(iso(dt))
  if (!has(cur)) cur.setTime(cur.getTime() - DAY_MS)
  while (has(cur)) {
    streak += 1
    cur.setTime(cur.getTime() - DAY_MS)
  }

  const nextDay = allDays.find((d) => !days[d.id]?.done)
  const dateLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata',
  })

  const todayLine = doneToday.length
    ? `✅ Today: ${doneToday.length} lab${doneToday.length > 1 ? 's' : ''} done — ${doneToday.map((d) => d.id).join(', ')}`
    : `⚠️ Today: no lab completed yet`

  const lines = [
    `🌱 *Sravya — Daily Update*`,
    `${dateLabel}`,
    ``,
    todayLine,
    `🔥 Streak: ${streak} day${streak === 1 ? '' : 's'}`,
    `📊 Progress: ${completed}/${total} days (${pct}%)`,
  ]
  if (nextDay) {
    lines.push(`👉 Next up: Day ${nextDay.id} — ${nextDay.focus}`)
  } else {
    lines.push(`🎉 All ${total} days complete — she shipped it!`)
  }
  lines.push(``, `Open the app: https://sravya-internship.vercel.app/`)
  return { text: lines.join('\n'), completed, total, streak, doneToday: doneToday.length }
}

export default async function handler(req, res) {
  try {
    // Optional shared-secret protection (Vercel Cron sends this header automatically
    // when CRON_SECRET is configured).
    const secret = process.env.CRON_SECRET
    if (secret) {
      const auth = req.headers.authorization || ''
      const qKey = req.query?.key
      if (auth !== `Bearer ${secret}` && qKey !== secret) {
        return res.status(401).json({ ok: false, error: 'unauthorized' })
      }
    }

    const supaUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
    const supaKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
    const phone = process.env.CALLMEBOT_PHONE
    const apiKey = process.env.CALLMEBOT_APIKEY
    const learnerKey = process.env.LEARNER_KEY || 'sravya'

    if (!supaUrl || !supaKey) {
      return res.status(500).json({ ok: false, error: 'Supabase env vars missing' })
    }
    if (!phone || !apiKey) {
      return res.status(500).json({ ok: false, error: 'CALLMEBOT_PHONE / CALLMEBOT_APIKEY not set yet' })
    }

    // 1. Read progress from Supabase.
    const url = `${supaUrl}/rest/v1/progress?learner_key=eq.${encodeURIComponent(learnerKey)}&select=state,updated_at`
    const r = await fetch(url, { headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` } })
    if (!r.ok) {
      return res.status(502).json({ ok: false, error: `Supabase read failed (${r.status})` })
    }
    const rows = await r.json()
    const state = rows[0]?.state || { days: {} }

    // 2. Build the summary text.
    const summary = buildSummary(state)

    // 3. Send via CallMeBot WhatsApp API.
    const sendUrl =
      `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
      `&text=${encodeURIComponent(summary.text)}&apikey=${encodeURIComponent(apiKey)}`
    const send = await fetch(sendUrl)
    const body = await send.text()

    return res.status(send.ok ? 200 : 502).json({
      ok: send.ok,
      sent: summary.text,
      stats: { completed: summary.completed, total: summary.total, streak: summary.streak, doneToday: summary.doneToday },
      callmebot: body.slice(0, 300),
    })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}
