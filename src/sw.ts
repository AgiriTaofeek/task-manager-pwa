import { BackgroundSyncPlugin } from "workbox-background-sync";
import { clientsClaim } from "workbox-core";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute, Route } from "workbox-routing";
import { CacheFirst, NetworkFirst, NetworkOnly } from "workbox-strategies";
// This means that you are informing TypeScript about a global variable named self which is of type ServiceWorkerGlobalScope. This helps TypeScript understand the types and properties associated with self, which is essential for type checking and IntelliSense.
// ServiceWorkerGlobalScope is the global execution context for the service worker. It represents the scope of a service worker's environment and provides the methods, properties, and event handlers that are available for service worker operations.
declare let self: ServiceWorkerGlobalScope;

//NOTE - Steps (1) and (2) are very essential when we use the injectManifest strategy
// (1) Clean up outdated browser cache that would be replaced when new ones have been generated
cleanupOutdatedCaches();

// (2) Precache assets for offline support
// The precache manifest automatically generated it accessed below via self.__WB_MANIFEST. This is where we actually inject the generated cache manifest
precacheAndRoute(self.__WB_MANIFEST);

// (3) self.skipWaiting() forces the newly installed service worker to activate immediately, without waiting for the old service worker to be discarded. clientsClaim() ensures that the new service worker takes control of all currently open clients (pages/tabs) immediately after activation.
self.skipWaiting();
clientsClaim();

// (4) Cache Image assets
const imageRoute = new Route(
  ({ request, sameOrigin }) => {
    return sameOrigin && request.destination === "image";
  },
  new CacheFirst({
    cacheName: "images",
  })
);
registerRoute(imageRoute);

// (5) Cache API calls
const fetchTaskRoute = new Route(
  ({ request }) => {
    return request.url === import.meta.env.VITE_API_BASE_URL + "/tasks";
  },
  //Just like the CacheFirst, the service worker tries to fetch the resource from the server first but if there is no network, it falls back to the cached resource
  new NetworkFirst({
    cacheName: "api/fetch-tasks",
  })
);
registerRoute(fetchTaskRoute);

// (6) Cache Navigation - caching strategy for navigation requests, which are typically requests for HTML pages
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigation",
    networkTimeoutSeconds: 3, //This sets a timeout of 3 seconds for the network request. If the network response isn't received within 3 seconds, it will fallback to the cache.
  })
);
registerRoute(navigationRoute);

// (7) Background sync
const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
  maxRetentionTime: 24 * 60, //The maximum time (in minutes) that a request will be retried. Here, it's set to 24 hours.
});

// POST request background Sync.
// This is necessary because when you are offline, the POST request will not work but as soon as you back online, the request is sent in the background
const taskSubmitRoute = new Route(
  ({ request }) => {
    return request.url === import.meta.env.VITE_API_BASE_URL + "/task/create";
  },
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

registerRoute(taskSubmitRoute);

// // PATCH request background Sync
const editTaskRoute = new Route(
  ({ request }) => {
    return request.url.includes(import.meta.env.VITE_API_BASE_URL + "/task");
  },
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PATCH"
);

registerRoute(editTaskRoute);

// // DELETE request background Sync
const deleteTaskRoute = new Route(
  ({ request }) => {
    return request.url.includes(import.meta.env.VITE_API_BASE_URL + "/task");
  },
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "DELETE"
);

registerRoute(deleteTaskRoute);
