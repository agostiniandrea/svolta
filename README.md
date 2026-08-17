# Svolta

**Concept project.** Svolta is a fictional restaurant — the brief, the brand, the menu and the copy are all invented. Nothing here is a real business, and no part of the site should be read as one.

What it is: a self-directed design and engineering piece — a plant-based Italian-fusion restaurant, set in Bangkok's Ari neighbourhood, built with Next.js and Sanity CMS with full Thai/English/Italian support.

**Live site:** [svolta-bkk.vercel.app](https://svolta-bkk.vercel.app/)

---

## Stack

- **Next.js 16** — App Router, server components, dynamic metadata
- **Sanity** — headless CMS for menu, dishes, and site settings
- **next-intl** — URL-based i18n across Thai (`/th`), English (`/en`), and Italian (`/it`)
- **Tailwind CSS + styled-components**
- **Vercel** — hosting with Analytics and Speed Insights
- **Lighthouse CI** — desktop and mobile performance checks on every PR

## Features

- Seasonal menu management via Sanity (one active menu at a time, others archived)
- Per-dish localised names, descriptions, allergens, and pricing in THB
- Real-time open/closed badge based on configured opening hours
- JSON-LD structured data for SEO
- Sanity webhook-triggered ISR revalidation

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=
```

`SANITY_API_TOKEN` is only needed for draft/preview functionality. `SANITY_WEBHOOK_SECRET` is only needed for the revalidation webhook.

## Sanity schema

The CMS has four document types:

| Type | Purpose |
|---|---|
| `dish` | Individual menu items — name, description, category, allergens, price, image |
| `menu` | Seasonal menus that group dishes — one can be marked active at a time |
| `settings` | Site-wide config — address, opening hours, delivery info |
| `page` | CMS-managed pages (concept, delivery, contact) |

All user-facing text fields are localised across `th`, `en`, and `it`.
