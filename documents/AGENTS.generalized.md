# AGENTS.md — Next.js + Supabase + n8n Orchestrator Template

Primary configuration for Copilot agents and contributors working on projects that use this stack.
Read this before writing any code.

---

## Mission

Build secure, typed, production-grade orchestration apps with:
- Next.js App Router + TypeScript strict mode
- Supabase (Auth + Postgres + RLS)
- External n8n workflows via webhooks

Priorities in order:
1. Correctness and safety
2. Clear contracts between app and workflows
3. Performance and maintainability
4. Distinctive, intentional UX

---

## Skills

Load the relevant skill BEFORE starting the task. Use read_file on the skill SKILL.md path.

| Task type | Skill to load |
|---|---|
| Next.js routing, RSC boundaries, async APIs | `.agents/skills/next-best-practices/SKILL.md` |
| React/Next performance review or optimization | `.agents/skills/vercel-react-best-practices/SKILL.md` |
| React component API design and composition | `.agents/skills/vercel-composition-patterns/SKILL.md` |
| UI components, pages, dashboard, empty states | `.agents/skills/frontend-design/SKILL.md` |
| UI audit, accessibility, and UX compliance review | `.agents/skills/web-design-guidelines/SKILL.md` |
| Complex artifact-style web deliverables | `.agents/skills/web-artifacts-builder/SKILL.md` |
| Unit testing with Vitest | `.agents/skills/vitest/SKILL.md` |
| Verifying deployed URL before submission | `.agents/skills/webapp-testing/SKILL.md` |
| n8n architecture and workflow patterns | `.agents/skills/n8n-workflow-patterns/SKILL.md` |
| n8n MCP tool strategy and operations | `.agents/skills/n8n-mcp-tools-expert/SKILL.md` |
| n8n node setup and field dependencies | `.agents/skills/n8n-node-configuration/SKILL.md` |
| n8n expression authoring and troubleshooting | `.agents/skills/n8n-expression-syntax/SKILL.md` |
| n8n validation error interpretation and fixes | `.agents/skills/n8n-validation-expert/SKILL.md` |
| n8n Code node implementation in JavaScript | `.agents/skills/n8n-code-javascript/SKILL.md` |
| n8n Code node implementation in Python | `.agents/skills/n8n-code-python/SKILL.md` |
| Missing/uncertain external API docs | Use Context7 per `.github/instructions/context7.instructions.md` |

### Skill Review Notes (applies across projects)

- Next.js work should follow App Router conventions, RSC boundaries, and async request API patterns.
- Performance work should prioritize waterfall removal, bundle control, and server/client boundary clarity.
- Frontend work should avoid generic defaults and follow a deliberate design direction.
- Vitest usage should be Vite-native with scoped, purposeful unit tests.
- n8n work should be iterative: discover nodes, configure, validate, build, then validate again.
- n8n expression and validation skills should be used together to reduce fix cycles.

---

## Standard Build Flow

1. Clarify request and constraints.
2. Load the relevant skill(s).
3. Inspect existing code before editing.
4. Implement minimal, focused changes.
5. Validate changes (types/tests/lint as applicable).
6. Summarize what changed, risks, and follow-up actions.

For n8n-related tasks:
1. Discover nodes and operations.
2. Configure node fields with operation awareness.
3. Validate nodes early.
4. Build workflow JSON or integration payload.
5. Validate workflow structure and expressions.
6. Deploy only after validation passes.

---

## Stack (Default)

| Layer | Choice |
|---|---|
| Framework | Next.js 16+, App Router, TypeScript strict mode |
| Styling | Tailwind CSS v4 + shadcn/ui + lucide-react |
| Auth + Database | Supabase Auth + Postgres (no ORM) |
| Row-level security | RLS enabled on every table from day one |
| Response validation | Zod parse before persistence |
| Search | Postgres full-text search (`tsvector` + GIN) |
| Workflow orchestration | n8n external instance via webhooks |
| Unit testing | Vitest + @testing-library/react |
| Dev bundler | Turbopack default |
| Deployment | Vercel (or equivalent), env vars in deployment settings |

---

## Project Structure (Template)

Replace with your actual structure. Suggested baseline:

- `app/` routes and route handlers
- `components/` UI and composables
- `lib/server/` server-only clients and integrations
- `lib/contracts/` input/output schema glue code
- `contracts/` request/response JSON schemas and examples
- `n8n/workflows/` workflow snapshots/placeholders
- `supabase/migrations/` SQL migrations
- `specifications/` product and architecture specs
- `documents/` reusable docs and templates

---

## Security Rules (Non-negotiable)

- Keep secrets in `.env.local` (local) and deployment secret store (hosted).
- Never commit secret values or production credentials.
- Use anon/public keys only where intended by platform design.
- Keep service-role keys server-only.
- Sanitize all external inputs and validate with schema parsing.
- Do not return raw internal errors from route handlers.

---

## API Error Contract (Default)

- 400: validation/input error, return `{ error: string }`
- 401: unauthenticated, return `{ error: "unauthorized" }`
- 403: forbidden, return `{ error: "forbidden" }` when applicable
- 500: internal error, return `{ error: "internal" }`

Never leak stack traces, SQL errors, provider response bodies, or secrets.

---

## TypeScript Rules

- Use `strict: true`.
- Avoid `any`; use `unknown` + narrowing/type guards.
- Keep shared contracts typed at boundaries.
- Generate and use typed database shapes where applicable.

---

## Supabase Rules

- Do not use browser Supabase client in Server Components.
- Prefer explicit column selection over `select('*')` for production queries.
- Enable and test RLS policies for all app-facing tables.
- Keep privileged operations in server-only code paths.

---

## n8n Integration Rules

- Prefer standard nodes over Code node unless logic truly requires code.
- Use operation-aware configuration for node fields.
- Validate early and often: node-level first, then workflow-level.
- Keep webhook contracts explicit and versioned.
- Include error and retry strategy for external calls.
- Preserve deterministic behavior for idempotent operations where possible.

---

## Testing Rules (Template)

Adjust to your project scope, then keep this section explicit.

Default guidance:
- Unit test domain logic and schema validation.
- Avoid over-testing pure UI presentation unless behavior is critical.
- Avoid shallow tests for route plumbing; test meaningful behavior.
- Keep tests fast, deterministic, and isolated.

Pre-merge checks:
- `npm run test`
- `npm run lint` (if configured)
- `npm run build` for release-sensitive changes

---

## Design Rules

- Commit to a strong, intentional visual direction.
- Avoid generic typography and default-looking layouts.
- Use CSS variables for theme tokens and spacing.
- Design meaningful empty states for list and dashboard screens.
- Use motion purposefully, not decoratively.

---

## Dependency Rules

- Do not add packages without approval.
- Prefer existing approved stack packages first.
- When requesting a new package, include:
  - Why current stack is insufficient
  - Security/performance implications
  - Long-term maintenance impact

---

## Definition of Done

A task is complete only when:
1. Requirements are implemented end-to-end.
2. Type safety and contracts are preserved.
3. Validation and tests (as scoped) pass or are explicitly documented if blocked.
4. Security and error-handling rules are respected.
5. Changes are summarized with clear follow-up items.

---

## Project-Specific Overrides

Use this section to override defaults for a specific repository.

- Product scope:
- Supported environments:
- Test scope details:
- Approved package list:
- API contract deviations:
- Deployment constraints:
