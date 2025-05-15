# ✅ FILE: README.md (top-level - append to existing or replace dev section)
## 🛠 Development Setup

This repo is configured to:
- Use the **hosted backend** on Render (always-on)
- Use **Supabase (hosted)** for DB/Auth
- Run only the **frontend locally** during most development

### ✅ To Start Local Frontend Only
```bash
cd ~/rightnow-agent-app-fullstack/web
npm install  # first time only
npm run dev
```

Make sure your `/web/.env.local` is set:
```
NEXT_PUBLIC_API_URL=https://rightnow-agent-app-fullstack.onrender.com
```

### 🧪 To Run Backend (only if modifying Python code)
```bash
cd ~/rightnow-agent-app-fullstack/api
source $(poetry env info --path)/bin/activate
export PYTHONPATH=src
uvicorn app.agent_server:app --reload
```

### 🤖 To Use Codex CLI
```bash
codex
> Explain this error
> Help me refactor this route
```
See [codex_workflow_guide.md](./codex/codex_workflow_guide.md) for the full Codex workflow playbook.

## 🛠 Development Setup

This app uses a hosted architecture for backend and database, simplifying local development.

### ✅ Local + Hosted Setup
| Component     | Run Locally? | Hosted?                              |
|---------------|--------------|---------------------------------------|
| Frontend (Next.js) | ✅ Yes       | Vercel                              |
| Backend (FastAPI)  | ❌ Default  | [Render](https://rightnow-agent-app-fullstack.onrender.com) |
| Database (Supabase) | ❌         | Supabase                            |

---

### ▶️ Start Development

```bash
./start-dev.sh

# rightnow-agent-app-monorepo-skeleton

This repo is a **cleaned mirror backup** of the `rightnow-agent-app-fullstack` monorepo as of May 2025.

---

## 📌 Purpose

This backup exists as a:
- ✅ Safety net in case the main production repo breaks
- 🔁 Launchpad for future product pivots or verticals
- 💡 Starter template for future AI-agent-based monorepo apps

---

## 🧱 What's Included

- `/api`: FastAPI backend with OpenAI Agent SDK integration
- `/web`: Next.js frontend (App Router) with Tailwind + shadcn/ui
- Supabase integration (optional, not stripped down)
- Working example of multi-agent orchestration
- Codex-compatible task structure

---

## 🔜 If Returning to This Later...

Here’s what you should do if you want to **strip it down** for reuse:

### 1. Delete or archive old agent types:
- `profilebuilder`, `profile_analyzer`, `strategy`, `repurpose`, etc.

### 2. Clean up frontend routes:
- Remove specific routes like `/profile-create`, `/profile-report`
- Keep basic layout + shadcn component setup

### 3. Clean Supabase usage:
- Remove task/profile session logic if not reusing it

### 4. Reset Codex tasks:
- Delete or move existing Codex `.md` task logs if starting fresh

---

## 🗓 Last Synced From

- Source: [`rightnow-agent-app-fullstack`](https://github.com/Kvkthecreator/rightnow-agent-app-fullstack)
- Synced on: **May 15, 2025**
- Cleaned with: `git-filter-repo` to remove `.env.sample` (OpenAI secret)

---

## 🛠 Next Steps (when ready)

When revisiting:
```bash
git checkout -b new-project-name
Then start trimming files + renaming agents and routes.

🧠 Notes

This repo uses:

Monorepo structure (/api + /web)
Vercel + Render compatible deploy flow
Supabase + OpenAI Agents SDK
Codex integration for automation

