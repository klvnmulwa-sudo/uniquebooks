const CACHE_NAME = 'unique-books-v1';
const BASE_PATH = '/uniquebooks/';

self.addEventListener('install', function(e) { 
    self.skipWaiting(); 
});

self.addEventListener('activate', function(e) { 
    e.waitUntil(caches.keys().then(function(names) { 
        return Promise.all(names.filter(function(n) { 
            return n !== CACHE_NAME; 
        }).map(function(n) { 
            return caches.delete(n); 
        })); 
    })); 
});

self.addEventListener('fetch', function(e) { 
    // If someone visits the root URL, redirect to the project
    if (e.request.url === 'https://klvnmulwa-sudo.github.io/' || 
        e.request.url === 'https://klvnmulwa-sudo.github.io') {
        e.respondWith(Response.redirect('/uniquebooks/', 301));
        return;
    }
    
    e.respondWith(caches.match(e.request).then(function(r) { 
        return r || fetch(e.request).then(function(res) { 
            var clone = res.clone(); 
            caches.open(CACHE_NAME).then(function(c) { 
                c.put(e.request, clone); 
            }); 
            return res; 
        }); 
    })); 
});