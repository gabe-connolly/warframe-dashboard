export function filterItemsByProp(items, propName, targetValue) {
	return items.filter((item) => {
		switch (typeof item[propName]) {
			case 'string':
				return item[propName].toLowerCase() === String(targetValue).toLowerCase();
			case 'number':
				return item[propName] === Number(targetValue);
			default:
				return false;
		}
	});
}

export function filterItemsByKeyword(items, keyword) {
	return items.filter((item) => {
		return item.name.toLowerCase().includes(keyword.toLowerCase());
	});
}

export function getFilterProps(items, propName) {
	if (!items || !items.length) {
		return [];
	}

	const propsList = new Set();

	items.forEach((item) => {
		switch (typeof item[propName]) {
			case 'string':
				if (item[propName].length) {
					propsList.add(item[propName]);
				}
				break;
			default:
				propsList.add(item[propName]);
				break;
		}
	});

	return [...propsList].sort();
}
