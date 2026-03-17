export function formatCountdown(expiryISO) {
	const diff = new Date(expiryISO) - Date.now();
	if (diff <= 0) return 'Expired';

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days}d ${hours % 24}h`;
	if (hours > 0) return `${hours}h ${minutes % 60}m`;
	if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
	return `${seconds}s`;
}

export function formatRelativeTime(dateISO) {
	const diff = Date.now() - new Date(dateISO);
	if (diff < 0) return 'just now';

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return days === 1 ? '1 day ago' : `${days} days ago`;
	if (hours > 0) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
	if (minutes > 0) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
	return 'just now';
}

export function isExpired(expiryISO) {
	return new Date(expiryISO) <= Date.now();
}
