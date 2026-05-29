# AGENTS.md — Wharehouse Inventory Orchestrator

Primary configuration for Copilot agents and contributors working on this project.
Read this before writing any code.

---

## Skills

Load the relevant skill BEFORE starting any task. Use `read_file` on the SKILL.md path.

| Task type | Skill to load |
|---|---|
| Next.js routing, RSC boundaries, async APIs | `.agents/skills/next-best-practices/SKILL.md` |
| General React/Next performance review or optimization | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| React component API design and composition patterns | `.agents/skills/vercel-composition-patterns/SKILL.md` |
| UI components, design, pages, dashboard, empty states | `.agents/skills/frontend-design/SKILL.md` |
| UI audit, accessibility, and UX guideline compliance review | `.agents/skills/web-design-guidelines/SKILL.md` |
| Complex artifact-style web deliverables (multi-component single output) | `.agents/skills/web-artifacts-builder/SKILL.md` |
| Writing or configuring unit tests | `.agents/skills/vitest/SKILL.md` |
| Verifying deployed URL before submission | `.agents/skills/webapp-testing/SKILL.md` |
| n8n workflow architecture and end-to-end pattern selection | `.agents/skills/n8n-workflow-patterns/SKILL.md` |
| n8n MCP tool strategy, node discovery, and workflow operations | `.agents/skills/n8n-mcp-tools-expert/SKILL.md` |
| n8n node setup (operation-aware field and dependency configuration) | `.agents/skills/n8n-node-configuration/SKILL.md` |
| n8n expression authoring and troubleshooting (`{{ }}`, `$json`, `$node`) | `.agents/skills/n8n-expression-syntax/SKILL.md` |
| n8n workflow and node validation error interpretation/fixes | `.agents/skills/n8n-validation-expert/SKILL.md` |
| n8n Code node implementation in JavaScript | `.agents/skills/n8n-code-javascript/SKILL.md` |
| n8n Code node implementation in Python | `.agents/skills/n8n-code-python/SKILL.md` |
| Missing library docs (Supabase, OpenRouter, etc.) | Use Context7 — see `.github/instructions/context7.instructions.md` |

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16+, App Router, TypeScript strict mode |
| Styling | Tailwind CSS v4 + shadcn/ui + lucide-react |
| Auth + Database | Supabase — Auth, Postgres, JS client (no ORM) |
| Row-level security | Supabase RLS enabled on every table from day one |
| Response validation | Zod — parse every AI response before saving |
| Search | Postgres full-text search via `tsvector` + GIN index |
| Workflow orchestration | n8n runs externally; this repo integrates via webhooks only |
| Application orchestrator | This repo validates requests and forwards them to n8n webhooks |
| Unit testing | Vitest + @testing-library/react |
| Dev bundler | Turbopack (default in Next.js 16+, no config needed) |
| Deployment | Vercel — `next build`, env vars set in Vercel dashboard |

---

## Project Structure

TBD
---

## Security Rules (Non-negotiable)

- **`NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_SUPABASE_URL`** are safe to expose — by design.
- Store all secrets in `.env.local` locally. Never commit `.env.local` to version control.

Note: `proxy.ts` in Next.js 16+ uses the Node.js runtime. If a future requirement depends on Edge runtime specifically, revisit this convention before implementing it.

---

## Testing Rules

**Override:** The general Next.js instruction (`nextjs.instructions.md`) says "write tests for all critical logic and components." That rule does **not** apply here. Follow only the scoped rules below.

Unit tests are **scoped** — do not test UI components or API route plumbing.

Test Scope:
TBD
---

## Design Rules

- Commit to a bold, specific aesthetic — see `frontend-design` skill for direction.
- No Inter font. No purple gradients. No generic layouts.
- Use CSS variables for all theme colors and spacing tokens.
- Every list screen must have a **designed empty state** — not a blank page.
- Animations: only for meaningful moments

---

## TypeScript Rules

- `strict: true` in `tsconfig.json` — no exceptions.
- No `any` types. Use `unknown` + type guards where the shape is uncertain.
- All Supabase table shapes typed via generated types (`supabase gen types typescript`).

---

## Dependency Rules

- Do not add packages without approval. If you need a new package ask before isntall.
- Pre-approved packages for this project: `@supabase/supabase-js`, `tailwindcss`, `zod`, `shadcn/ui`, `motion`, `vitest`, `@testing-library/react`, `@vitejs/plugin-react` , `lucide-react`.

---

## Supabase Rules
- Never use the browser client in a Server Component — it leaks session handling
- Always use explicit column selection — never `select('*')` in production queries
- Never use the service role key outside of server-only contexts

---

## Route Handler Error Contract
- 400 → bad input (Zod parse failure), return `{ error: string }`
- 401 → unauthenticated, return `{ error: "unauthorized" }`
- 500 → unexpected server error, return `{ error: "internal" }` — never expose raw messages

## Orchestrator Contract Rules
TBD
---

## Vitest Config
- Use `@vitejs/plugin-react` in `vitest.config.ts`
- Set `environment: 'jsdom'`
- Never import from `next/` in unit test files — mock at the module level
- Path alias `@/` must be mirrored in `vitest.config.ts` resolve.alias

---

## Key Constraints from Spec
TBD