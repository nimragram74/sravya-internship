# Sravya · AI Product Builder Internship

A daily learning companion for the **8-week AI Product Builder Internship**. It turns
the workbook into an interactive app: every day's *Learn* steps (with the exact
links) and *Do* lab (with a "Done when" check), plus checkboxes, personal notes,
a live progress ring, week-by-week bars, a day streak, and a completion certificate.

Built with **React + Vite**. Deploys to **Vercel** in one click. Progress saves to
the browser automatically, and optionally **syncs across devices via Supabase**.

**Live app:** _add your Vercel URL here after deploying_

---

## Features

- **Dashboard** — overall % complete, days done, day streak, weeks shipped, and a "Next up" card that drops you straight into today's work.
- **The Path** — all 8 weeks × 7 days. Expand any day for Learn steps + resource links and the Do lab with its "Done when" check. Tick it off; jot notes.
- **Reference** — one-time tool setup, the 6 ground rules, syllabus map, prompt library, and product-idea starters.
- **Certificate** — unlocks when all 56 days are complete.
- **Settings** — start date, cloud-sync status, profile key, and reset.
- **Auto-save** — always to `localStorage`; also to Supabase when configured.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173). The app works fully with **no
setup** — progress saves in your browser.

## Optional: cloud sync across devices (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql).
3. In **Project Settings → API**, copy the **Project URL** and the **anon public** key.
4. Copy `.env.example` to `.env` and paste them in:

   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Restart `npm run dev`. The top-bar pill now reads **Synced**.

> The app stores only checkmarks and study notes, keyed by a **profile key** (default
> `sravya`, editable in Settings). Keep the same key on each device to sync.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com): **Add New → Project → Import** this repo.
3. Framework preset **Vite** is auto-detected (build: `npm run build`, output: `dist`).
4. (Optional) Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under
   **Settings → Environment Variables**, then redeploy.
5. Click **Deploy**. Done — share the URL.

## Tech stack

| Layer      | Choice                              |
| ---------- | ----------------------------------- |
| UI         | React 18 + Vite                     |
| Styling    | Hand-written CSS design system      |
| Storage    | localStorage (+ optional Supabase)  |
| Hosting    | Vercel (SPA)                        |

## Project structure

```
src/
  data/curriculum.js     # all 8 weeks of content
  lib/supabaseClient.js  # Supabase client (optional)
  lib/store.js           # load/save progress (cloud + local)
  hooks/useProgress.js   # state, stats, streak
  components/            # Dashboard, WeeksView, DayCard, Reference, Certificate, Settings
supabase/schema.sql      # run once in Supabase
```

---

Made for Sravya's Semester III internship. One hour a day — keep the streak. 🌱
