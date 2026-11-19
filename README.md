# Mark Anthony Hipe — Portfolio

Next.js 15 (App Router) + Tailwind. **All content lives in one file: `content/portfolio.json`.**
Edit the JSON, not the code. The build validates it and fails with a readable message if something is wrong.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Editing content (`content/portfolio.json`)

| Section | What it controls |
| --- | --- |
| `site`, `profile` | Page title/description, name, role, summary, links, availability badge |
| `about`, `skills` | About text, skill tiles (name + category) |
| `tech` | Icon + color for every technology name used in `tags` and `skills` |
| `experience.items` | Jobs (accordion). `defaultOpen: true` expands one on load |
| `projects.items` | Every project (see below) |
| `contact`, `footer` | Contact block and footer text |

### Replace the placeholder screenshots
Three projects ship with placeholder images. Overwrite these files, keeping the same names:

| File in `public/images/projects/` | Project |
| --- | --- |
| `dms.webp` | Document Management System |
| `qms-document-control.webp` | QMS Document Control |
| `facial-attendance.webp` | Facial Recognition Attendance |

Use a 16:10 image (the placeholders are 1600x1000). If you use a different size or a different file name,
update that project's `image` (`src`, `width`, `height`) in `content/portfolio.json`.

### Add a project
Add an object to `projects.items`. Put its screenshot in `public/images/projects/` and reference it as `/images/projects/<file>`.
Give it a `description` (shown under **Read more**) — that's all a basic project needs.

### Give a project its own page (optional)
Add a `details` object. Only projects that have one get a **View details** button and a page at `/projects/<slug>`:

```json
"details": {
  "overview": "A paragraph about the project.",
  "features": ["Feature one", "Feature two"],
  "flow": [{ "title": "Step", "text": "Optional 'How it works' steps" }],
  "links": [{ "label": "Live site", "url": "https://example.com" }]
}
```
Remove `details` and the page disappears (the URL returns 404). `flow` and `links` are optional too.

### Add a technology
Add it to `tech` with a [Simple Icons](https://simpleicons.org) slug: `"Redis": { "icon": "redis" }`.
Optional `"color": "#RRGGBB"` overrides the brand color. Names with no icon still render as plain tags.

## Resume

Put your PDF at `private/resume.pdf` and rebuild. The **Download resume** button appears only when that file exists.
It is served by `/api/resume` from that one fixed path (no filename in the URL), rate limited, as an attachment.

## Security

- **Headers** (`next.config.ts`): CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP. `X-Powered-By` removed.
  `script-src` keeps `'unsafe-inline'` because Next injects inline hydration scripts; moving to nonces would make every page dynamic.
- **Rate limiting** (`middleware.ts`, `lib/rate-limit.ts`): per IP, per minute. Resume 5, other `/api/*` 30, pages 120. Returns `429` with `Retry-After`. Tune the `RULES` table.
  Without Redis the counters are per server instance. For serverless/multi-instance, set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to share them. If Redis is unreachable it falls back to memory.
- **Client IP**: set `TRUST_PROXY=true` only behind a trusted proxy/CDN. The *last* `X-Forwarded-For` entry is used because the first can be forged.
- **Methods**: anything except GET/HEAD/OPTIONS gets `405`.
- **Content validation** (`lib/schema.ts`): links must be `http(s)`, `mailto:` or a `/path` (no `javascript:`), images must live under `/images`, slugs are unique.
- **Removed**: the unused auth/JWT/OAuth/Mongo code and packages (bcryptjs, jsonwebtoken, multer, formidable, mongoose, axios, ...), and the old `api/uploads/[filename]` route, which built a file path from user input.

Run `npm audit` periodically. One known finding remains (PostCSS bundled inside Next 15, build-time only); clearing it means moving to Next 16.

## Structure

```
content/portfolio.json     all site content
lib/                       schema (zod), content loader, rate limiter, resume helper
middleware.ts              rate limiting + method guard
components/ui/             TechTag, Accordion, CopyEmail, SafeLink
components/layout/         Sidebar, SidebarNav, ThemeToggle, ProgressBar
components/sections/       About, Experience, Projects, Contact
components/projects/       ProjectCard, ProjectRow, ProjectsBrowser, ProjectDetail
app/(site)/                home, /projects, /projects/[slug]
app/api/resume/            secure resume download
```
