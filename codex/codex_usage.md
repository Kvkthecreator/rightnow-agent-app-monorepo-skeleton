# 🧠 Codex CLI Usage Cheatsheet

## 🤖 What This Folder Is For
This `/codex` directory stores all Codex-related workflows and artifacts:

| Folder | Purpose |
|--------|---------|
| `tasks/` | Modular improvement prompts with context and instructions |
| `sessions/` | Terminal transcripts or Codex CLI interactions (optional) |
| `drafts/` | Codex-generated alt code versions, scratch files |
| `usage.md` | (This file) CLI command references and usage patterns |

---

## 🧪 Example Codex Commands

```bash
codex
> Refactor this FastAPI route to return JSON
> Help me debug this error message
> Suggest unit tests for this Python function
```

You can also use standard input piping:
```bash
cat somefile.py | codex
```

---

## 🔧 Common Codex CLI Use Patterns

### 🎯 Create a task:
```bash
cd codex/tasks
cp task_template.md add-new-feature.md
```

### 🧠 Prompt structure:
```md
# Task: Clear goal

## Prompt to Codex
```
Help me refactor X to do Y, and avoid Z.
```
```

---

## 🧩 Optional Workflows

- Use Git branches to pair with each task file
- Store session logs in `/codex/sessions/`
- Keep Codex-suggested draft files in `/codex/drafts/`

---

## 🔐 API Key Setup
Use this in your terminal or `.zshrc`:
```bash
export OPENAI_API_KEY=sk-...
```

---

Happy reasoning. Let Codex be your coding partner.

🛠
