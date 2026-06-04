self.addEventListener("install", function(event){
self.skipWaiting();
});

self.addEventListener("fetch", function(event){
event.respondWith(fetch(event.request).catch(()=> {
return new Response("Offline mode");
}));
});
