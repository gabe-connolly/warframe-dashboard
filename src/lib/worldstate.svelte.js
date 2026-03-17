// warframestat.us hosts warframe-worldstate-parser as a service.
// Trailing slash is required — without it the 301 redirect returns empty bodies.
const API_URL = 'https://api.warframestat.us/pc/?language=en';
const REFRESH_INTERVAL = 60_000;

let data = $state(null);
let loading = $state(false);
let error = $state(null);
let intervalId = null;
let firstFetch = true;

async function fetchData() {
	if (firstFetch) loading = true;
	error = null;

	try {
		const res = await fetch(API_URL);
		if (!res.ok) throw new Error(`API returned ${res.status}`);
		const text = await res.text();
		if (!text) throw new Error('API returned empty response');
		const parsed = JSON.parse(text);
		if (!parsed || typeof parsed !== 'object') throw new Error('API returned invalid data');
		data = parsed;
	} catch (e) {
		if (!data) error = e.message || 'Failed to fetch WorldState data';
	} finally {
		loading = false;
		firstFetch = false;
	}
}

export const worldstate = {
	get data() { return data; },
	get loading() { return loading; },
	get error() { return error; },

	start() {
		firstFetch = !data;
		fetchData();
		intervalId = setInterval(fetchData, REFRESH_INTERVAL);
	},

	stop() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}
};
