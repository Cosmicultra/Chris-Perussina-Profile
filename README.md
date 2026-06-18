# Chris Perussina — Professional Fintech Profile

A config-driven, mobile-first link-in-bio page built for financial services and fintech professionals. Server-rendered with Next.js for fast load times, SEO, and a premium institutional aesthetic.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing Your Content

All content is managed in a single file: [`config/profile.json`](config/profile.json).

### Profile fields

| Field | Description |
|-------|-------------|
| `name` | Your full name |
| `title` | Professional headline (shown below name in serif italic) |
| `bio` | 2–3 sentence value proposition |
| `profileImage` | Path to hero cutout PNG in `public/` (e.g. `/images/chris-cutout.png`) |
| `siteUrl` | Your primary website URL (used for SEO metadata and QR "page" mode) |
| `featuredCTA` | Primary call-to-action button (label, url, description) |
| `stats` | Career highlight stats (`value`, `label`, `description`) — tap any stat for a detail popup |
| `credentials` | Optional; not shown on page (legacy/SEO if needed) |
| `testimonial` | Optional quote block between link sections (`quote`, `author`, `title`) |
| `compliance` | Disclaimer footer text (required for financial services) |
| `meetingMode.qrTarget` | `"page"` (site URL) or `"calendly"` (featured CTA URL) for QR code |
| `social` | Social platform links |
| `linkSections` | Grouped link cards (see section fields below) |
| `theme.accent` | Default accent: `"steel-blue"` or `"muted-gold"` |

### Link section fields

| Field | Description |
|-------|-------------|
| `title` | Section heading |
| `brand` | `"awa"` or `"advisorpilot"` — drives scroll narrative and accent |
| `logo` | Optional logo path shown beside section title |
| `accent` | Optional per-section accent override |
| `links` | Array of link cards |

### Link card fields

| Field | Description |
|-------|-------------|
| `title` | Link title |
| `url` | Destination URL |
| `icon` | Lucide icon key |
| `description` | Optional subtitle (shown up to 2 lines) |
| `image` | Optional logo/thumbnail path |
| `featured` | `true` for accent left border + emphasis |
| `badge` | Optional pill label (e.g. `"Free tool"`) |

### Replacing your hero photo (cutout style)

The header uses a **transparent PNG cutout** (Linktree-style) — you on the page background with a soft fade at the waist.

1. Add a new source photo to `public/` (e.g. `Chris Solo Balcony.jpg`)
2. Regenerate the cutout:
   ```bash
   npm run generate-cutout
   ```
3. Ensure `config/profile.json` points to the cutout:
   ```json
   "profileImage": "/images/chris-cutout.png"
   ```

To use a different source image, edit the input path in [`scripts/generate-cutout.mjs`](scripts/generate-cutout.mjs).

Recommended: professional portrait from the waist up, facing the camera, with good lighting.

### Available link icons

Use any of these values for the `icon` field on links:

`globe`, `file-text`, `calendar`, `mail`, `phone`, `briefcase`, `book-open`, `newspaper`, `mic`, `video`, `podcast`, `chart-line`, `building`, `users`, `link`, `external-link`

### Social platforms

`linkedin`, `x`, `github`, `youtube`, `instagram`, `email`, `sms`, `website`

## Deploy to Vercel

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial fintech profile page"
   git remote add origin https://github.com/YOUR_USERNAME/chris-perussina-profile.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo.

3. Vercel auto-detects Next.js. Click **Deploy**.

4. **Custom domain** (optional):
   - Vercel project → **Settings** → **Domains**
   - Add your domain (e.g. `bio.chrisperussina.com`)
   - Update DNS with the CNAME record Vercel provides

Future edits: change `config/profile.json` → `git push` → Vercel redeploys automatically (~30 seconds).

## Build & Lint

```bash
npm run build   # Production build (validates config via Zod)
npm run start   # Serve production build locally
npm run lint    # ESLint
```

If `npm run build` fails with a Zod error, check `config/profile.json` for invalid URLs or missing required fields.

## Project Structure

```
app/              # Next.js pages and global styles
components/       # UI components
config/           # profile.json — your editable content
lib/              # Config validation, schema.org, icons
public/images/    # Headshot and static assets
```

## Tech Stack

- Next.js 15 (App Router, server-rendered)
- TypeScript + Zod config validation
- Tailwind CSS v4
- Lucide React icons
- Deployed on Vercel
