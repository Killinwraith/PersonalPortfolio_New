# hetangmehta.ca

A personal site where code, travel, and a slow wardrobe live next to each other instead of being filed into separate folders.

The homepage is a chaotic sticker wall — every "sticker" is a thing you've made, gone to, worn, or thought. Click any sticker that links to a feature and the calmer magazine side of the site takes over.

## design philosophy in 30 seconds

- **Maximalist hero, minimalist body.** The wall arrests attention. The magazine delivers substance. Both are *you*; neither one is the whole truth.
- **Data drives the wall.** Every sticker is a row in `src/content/stickers.json`. Adding a sticker is editing JSON, not editing layout.
- **Content drives the magazine.** Every feature is an MDX file in `src/content/features/`. Adding a feature is creating a file, not building a page.
- **Real ephemera over clip art.** This site only fully works once you swap text-label stickers for real photographed scans of your trips, fits, tickets, and handwriting. The scaffold is functional with placeholders; the *soul* arrives with real material.

## stack

- [Astro 5](https://astro.build/) — content-first, ships almost no JS
- MDX for articles
- Google Fonts: **Fraunces** (display serif), **Bricolage Grotesque** (sans), **JetBrains Mono** (mono)
- No frameworks beyond Astro. No CSS-in-JS. No build complexity beyond `astro dev`.

## getting started

```bash
npm install
npm run dev
```

Visit http://localhost:4321. You'll see the wall + magazine homepage and four sample features.

```bash
npm run build      # static build to ./dist
npm run preview    # preview the production build locally
```

## project structure

```
src/
  components/
    StickerWall.astro     # the collage hero (the chaos)
    Sticker.astro         # one sticker primitive, data-driven
    Magazine.astro        # the calm body below the wall
  content/
    config.ts             # validation schemas
    stickers.json         # the wall data — edit this to change the wall
    features/             # MDX articles, each becomes a page at /features/<slug>
  layouts/
    BaseLayout.astro      # global HTML shell, fonts, transitions
  pages/
    index.astro           # /         → wall + magazine
    about.astro           # /about
    features/[...slug].astro  # /features/<slug>
  styles/
    global.css            # design tokens (colours, fonts, dark mode)
public/
  stickers/               # your real ephemera lives here
  handwriting/            # your real handwriting lives here
  features/               # hero images for articles
```

## the three things you need to do

### 1. swap the signature for your real handwriting

The single highest-impact change. See `public/handwriting/README.md` — takes 20 minutes with a Sharpie, a sheet of paper, and any image editor.

### 2. swap text-label stickers for real photographs

Photograph your fits, scan your tickets, crop tightly. Drop them in `public/stickers/`. Edit `src/content/stickers.json` to point at them. See `public/stickers/README.md` for the naming convention.

A reasonable opening target: replace 15–20 of the placeholder stickers with real images. The text-label stickers can stay as accents; they make the wall feel like a real wall (real walls have plenty of pure-text stickers).

### 3. write your own features

The four sample MDX files in `src/content/features/` are placeholder copy in roughly your voice. Delete them, write your own. Each new MDX file appears automatically:

- as a card in the magazine on the homepage
- as a standalone page at `/features/<filename-without-extension>`
- optionally linked from a sticker via the `href` field

## adding a feature

Create a new file: `src/content/features/my-piece.mdx`

```mdx
---
title: "A short title"
deck: "A one-sentence subtitle that explains the piece."
kicker: "FEATURE — GOING"
publishedAt: 2026-06-01
tags: ["going", "japan"]
image: "/features/my-piece-hero.jpg"
---

Your writing here. Standard markdown, plus you can drop in Astro components if you want.
```

Save it. The site picks it up on the next dev refresh.

## adding a sticker

Edit `src/content/stickers.json`, append:

```json
{
  "id": "unique-id",
  "text": "TEXT GOES HERE",
  "variant": "red",
  "font": "mono",
  "size": "md",
  "x": 45, "y": 30, "rotation": -5, "z": 5,
  "href": "/features/optional-link"
}
```

Or for a real image sticker:

```json
{
  "id": "tokyo-thrift",
  "src": "/stickers/tokyo-thrift.jpg",
  "alt": "A tiny shop in Shimokitazawa, May 2026",
  "x": 60, "y": 50, "rotation": 8, "z": 7
}
```

### sticker fields

| field      | values                                                                       | default  |
|------------|------------------------------------------------------------------------------|----------|
| `id`       | unique string                                                                | required |
| `text`     | string content (use `\n` for line breaks inside circle stickers)             | —        |
| `src`      | path under `/public/` to a real image                                        | —        |
| `alt`      | alt text for image stickers                                                  | `""`     |
| `variant`  | `paper` `ink` `cream` `red` `yellow` `pink` `blue` `green` `orange` `teal` `purple` | `paper`  |
| `shape`    | `rect` `circle` `tape` `peel`                                                | `rect`   |
| `font`     | `sans` `mono` `serif`                                                        | `sans`   |
| `size`     | `sm` `md` `lg` `xl`                                                          | `md`     |
| `x`        | horizontal position as % of wall width (0–100, can go negative for bleed)    | required |
| `y`        | vertical position as % of wall height                                        | required |
| `rotation` | degrees                                                                      | `0`      |
| `z`        | layering: 1 = back, 10 = front                                               | `5`      |
| `href`     | optional internal link, e.g. `/features/something`                           | —        |

Either `text` or `src` is required.

## deployment

The build output is fully static. Anywhere that serves static files works:

- **Vercel** — `vercel --prod` from the project root (zero config)
- **Netlify** — drag-and-drop `dist/` after `npm run build`, or connect the repo
- **Cloudflare Pages** — connect the repo, build command `npm run build`, output `dist`
- **GitHub Pages** — needs the `@astrojs/github-pages` setup, marginally more work

The current site lives at hetangmehta.ca — point the DNS at whichever host you pick.

## things to consider later

- **OpenGraph + Twitter cards.** Add a default OG image and per-feature OG generation. Astro has `@astrojs/og` for dynamic generation.
- **RSS feed.** Trivial to add for the features collection — `@astrojs/rss`.
- **Sticker filter on the homepage.** Quick wins: small filter chips (GOING / WEARING / WORK / WRITING) that fade non-matching stickers to 30% opacity. Mostly CSS.
- **A `/wall` page that lists all stickers as text + links.** For accessibility and for search engines that don't see them as such on the chaotic homepage.
- **A `/now` page.** What you're currently up to. Cheap and high-personality.

None of this is required to ship. The site you have already shipped is the version that matters.

## notes from the design

- The wall is exactly `min(92vh, 820px)` tall — sized so the magazine peeks underneath on most screens, prompting scroll.
- Stickers fade in staggered (14ms between each) on page load. It's subtle but reads as "the wall got built sticker by sticker."
- A faint parallax on the front-layer stickers as you scroll. Reduce-motion users get nothing of it.
- The dark mode is automatic via `prefers-color-scheme` and tested on both. Don't worry about a toggle.

If you want to change the wall colour, the only token that matters is `--wall` in `src/styles/global.css`. Same for the page background (`--bg-page`).

---

Built in May 2026.
