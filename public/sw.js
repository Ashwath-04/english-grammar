// Service worker: lets the site install as an app and open pages offline.
// Pages are fetched from the network first, so new lessons show up as soon
// as they are published. If there is no network, the saved copy is used.
// Bump VERSION to clear old saved copies after a big change.
const VERSION = 'v2';
const CACHE = `english-grammar-${VERSION}`;
const PRECACHE = ['/', '/start-here/', '/manifest.webmanifest', '/favicon.svg'];

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

	if (request.mode === 'navigate') {
		// Pages: network first, then saved copy, then the home page.
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE).then((cache) => cache.put(request, copy));
					return response;
				})
				.catch(() => caches.match(request).then((hit) => hit || caches.match('/')))
		);
		return;
	}

	// Styles, scripts, icons and search files: use the saved copy if there is one,
	// and refresh it in the background.
	event.respondWith(
		caches.match(request).then((hit) => {
			const network = fetch(request)
				.then((response) => {
					if (response.ok) {
						const copy = response.clone();
						caches.open(CACHE).then((cache) => cache.put(request, copy));
					}
					return response;
				})
				.catch(() => hit);
			return hit || network;
		})
	);
});
