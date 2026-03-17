# Warframe Dashboard

Static SvelteKit site displaying Warframe game item data, deployed to GitHub Pages.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production static build
- `npm run sync` — refresh game data from `warframe-items` npm package
- `npm run deploy` — sync + build + deploy to GitHub Pages

## Architecture

- **Framework**: SvelteKit with `adapter-static`, Svelte 5 (runes syntax: `$state`, `$derived`, `$props`, `@render`)
- **Build**: Vite 6, deployed to GitHub Pages at `/warframe-dashboard` base path
- **Data**: 24 static JSON files in `static/data/`, synced from `warframe-items` npm package via `scripts/sync-data.js`
- **Images**: CDN at `https://cdn.warframestat.us/img/{imageName}`

## Project Structure

- `src/routes/` — SvelteKit routes. Dynamic `[category]` handles most categories; specialized routes exist for `arcanes`, `archwing`, `mods`, `primary`, `secondary`, `sentinels`
- `src/lib/components/` — 13 reusable Svelte components (ItemCard, ModCard, ItemFigure, FilterBar, RangedWeapons, etc.)
- `src/lib/data.js` — `fetchItems(fetch, category)` loads and cleans JSON data; exports `CDNBase`
- `src/lib/categories.js` — `itemCategories` array (19 categories used in nav)
- `src/lib/filters.js` — `filterItemsByProp`, `filterItemsByKeyword`, `getFilterProps`
- `static/data/` — generated JSON files (do not edit manually, use `npm run sync`)
- `scripts/sync-data.js` — data sync script

## Data Pipeline

`warframe-items` npm package → `scripts/sync-data.js` → `static/data/*.json` → fetched at runtime by `src/lib/data.js`

- Do not use the HTTP API (`api.warframestat.us`) — it's unreliable and returns different schemas
- `SentinelWeapons` is filtered by `productCategory`, not `category`
- `All.json` contains every item combined

## Style

- No linter/formatter configured
- ES modules (`"type": "module"`)
- No TypeScript, no tests
