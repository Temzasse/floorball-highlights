"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/floorball-highlights/index.html","808943c0ce274bb652f055c18a65aa98"],["/floorball-highlights/static/css/main.234724d1.css","5d122ab7c32c7d42a90083ff4928785f"],["/floorball-highlights/static/js/main.162d8bea.js","771400ad54475b96d1b83394319ac249"],["/floorball-highlights/static/media/classic.b6b3a41b.png","b6b3a41be93395620b75e5bfc95bb859"],["/floorball-highlights/static/media/eraviikingit.685eb2d0.png","685eb2d0d740e843900a95f947a4ae1c"],["/floorball-highlights/static/media/goal.575a791f.svg","575a791fe57bfcaf2278ec50eca7af39"],["/floorball-highlights/static/media/happee.fba281a7.png","fba281a74838ac14fa1e88c6caab6f10"],["/floorball-highlights/static/media/indians.3c05b14c.png","3c05b14c5fc14b7b6c5b0790e82f94ce"],["/floorball-highlights/static/media/koovee.dda81a73.png","dda81a73e61385737b48473c36573ecf"],["/floorball-highlights/static/media/nokiankrp.01ee1c42.png","01ee1c429cc06b5436e804c90687a926"],["/floorball-highlights/static/media/oilers.81f0eb18.png","81f0eb18b0f1a562f25395e9e9ae62c2"],["/floorball-highlights/static/media/ols.ec784d1f.png","ec784d1fcf2d7817457a60f4796219ed"],["/floorball-highlights/static/media/play.2ee802c8.svg","2ee802c8f7a64dd88338b5e21c7367b9"],["/floorball-highlights/static/media/salba.9f332e06.png","9f332e064e942caafd387d938c2d71fa"],["/floorball-highlights/static/media/sbwelhot.c334d98d.png","c334d98d343299f5ca9ffa3526687c60"],["/floorball-highlights/static/media/spv.b99096c7.png","b99096c7eefe3bb4a430d8ef10f12f6e"],["/floorball-highlights/static/media/steelers.2ca619e1.png","2ca619e1ace6b503e7d42426973ad66a"],["/floorball-highlights/static/media/tps.fc5b17b7.png","fc5b17b7de176d71041bfbe79c404be9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/floorball-highlights/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});