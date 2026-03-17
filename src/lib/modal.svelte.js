let current = $state(null);

export const modal = {
	get item() { return current; },
	get isOpen() { return current !== null; },
	open(item) { current = item; },
	close() { current = null; }
};
