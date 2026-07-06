-- Sravya Internship — Supabase schema for cloud progress sync.
-- Run this once in the Supabase SQL Editor (SQL Editor -> New query -> paste -> Run).
--
-- One row per learner profile. `state` holds the whole progress JSON:
--   { "days": { "1.1": { "done": true, "doneAt": "2026-07-06", "notes": "..." } },
--     "startDate": "2026-07-01", "updatedAt": "..." }

create table if not exists public.progress (
  learner_key text primary key,
  state       jsonb       not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Row Level Security. This is a personal single-user app that talks to Supabase
-- with the public anon key from the browser, so we allow the anon role to read
-- and write the progress table. (No sensitive data lives here — just checkmarks
-- and study notes.) If you later add real auth, tighten these policies.
alter table public.progress enable row level security;

drop policy if exists "anon can read progress"   on public.progress;
drop policy if exists "anon can write progress"  on public.progress;
drop policy if exists "anon can update progress" on public.progress;
drop policy if exists "anon can delete progress" on public.progress;

create policy "anon can read progress"
  on public.progress for select
  to anon
  using (true);

create policy "anon can write progress"
  on public.progress for insert
  to anon
  with check (true);

create policy "anon can update progress"
  on public.progress for update
  to anon
  using (true)
  with check (true);

create policy "anon can delete progress"
  on public.progress for delete
  to anon
  using (true);
