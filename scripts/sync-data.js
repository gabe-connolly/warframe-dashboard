import Items from 'warframe-items';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'static', 'data');

// Categories that map directly to warframe-items category filter
const STANDARD_CATEGORIES = [
	'Arcanes',
	'Archwing',
	'Arch-Gun',
	'Arch-Melee',
	'Enemy',
	'Fish',
	'Gear',
	'Glyphs',
	'Melee',
	'Misc',
	'Mods',
	'Node',
	'Pets',
	'Primary',
	'Quests',
	'Relics',
	'Resources',
	'Secondary',
	'Sentinels',
	'Sigils',
	'Skins',
	'Warframes'
];

let failures = 0;
const summary = [];

function writeCategory(name, items) {
	const filePath = join(DATA_DIR, `${name}.json`);
	const count = items.length;

	// Staleness check: warn if new data has significantly fewer items
	if (existsSync(filePath)) {
		try {
			const existing = JSON.parse(readFileSync(filePath, 'utf-8'));
			const oldCount = existing.length;
			if (count < oldCount * 0.5) {
				console.warn(
					`  ⚠ WARNING: ${name} dropped from ${oldCount} to ${count} items (>50% decrease)`
				);
			}
		} catch {
			// Existing file unreadable — fine, just overwrite
		}
	}

	writeFileSync(filePath, JSON.stringify(items, null, 2));
	summary.push({ name, count });
	console.log(`  ✓ ${name}: ${count} items`);
}

console.log('Syncing Warframe data from warframe-items...\n');

// Load all items once for All.json and SentinelWeapons
let allItems;
try {
	allItems = new Items();
} catch (err) {
	console.error('FATAL: Failed to load warframe-items:', err.message);
	process.exit(1);
}

// Write standard categories
for (const category of STANDARD_CATEGORIES) {
	try {
		const items = new Items({ category: [category] });
		writeCategory(category, [...items]);
	} catch (err) {
		console.error(`  ✗ ${category}: ${err.message}`);
		failures++;
	}
}

// SentinelWeapons — filtered by productCategory, not category
try {
	const sentinelWeapons = [...allItems].filter(
		(item) => item.productCategory === 'SentinelWeapons'
	);
	writeCategory('SentinelWeapons', sentinelWeapons);
} catch (err) {
	console.error(`  ✗ SentinelWeapons: ${err.message}`);
	failures++;
}

// All.json — every item combined
try {
	writeCategory('All', [...allItems]);
} catch (err) {
	console.error(`  ✗ All: ${err.message}`);
	failures++;
}

// Summary
console.log(`\nDone. ${summary.length} categories written, ${failures} failed.`);
if (failures > 0) {
	process.exit(1);
}
