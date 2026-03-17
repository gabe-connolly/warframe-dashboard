export const CDNBase = 'https://cdn.warframestat.us/img/';

export function stripNonDamageTags(data) {
	return data
		.replace(/<LINE_SEPARATOR>/gi, '')
		.replace(/\[Ph\]/gi, '')
		.replace(/<(?!DT_)[A-Z_]{3,}>/g, '');
}

function deDupeItems(items) {
	const seen = {};
	items.forEach((item) => {
		if (!seen.hasOwnProperty(item.name)) {
			seen[item.name] = item;
		}
	});
	return Object.values(seen);
}

function scrubItemData(items) {
	const scrubbed = {};
	items.forEach((item) => {
		if (!item.name.match(/\/Lotus\/Language\//gi)) {
			scrubbed[item.name] = item;
		}
	});
	return Object.values(scrubbed);
}

export async function fetchItems(fetch, category) {
	const response = await fetch(`/warframe-dashboard/data/${category}.json`);
	let text = await response.text();
	text = stripNonDamageTags(text);
	let items = JSON.parse(text);
	items = deDupeItems(items);
	items = scrubItemData(items);
	return items;
}
