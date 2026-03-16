export const CDNBase = 'https://cdn.warframestat.us/img/';

export function stripDamageTypeTags(data) {
	const regex = /<DT_([a-z]*)>/gi;
	return data.replace(regex, '');
}

export function stripLineSeparatorTags(data) {
	const regex = /<LINE_SEPARATOR>/gi;
	return data.replace(regex, '');
}

export function stripPhTag(data) {
	return data.replace(/\[Ph\]/gi, '');
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
	text = stripDamageTypeTags(text);
	text = stripLineSeparatorTags(text);
	text = stripPhTag(text);
	let items = JSON.parse(text);
	items = deDupeItems(items);
	items = scrubItemData(items);
	return items;
}
