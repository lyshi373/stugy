// 学习打卡中心 - Service Worker
// 实现离线访问和APP化

const CACHE_NAME = "study-checkin-center-v12";
const CACHE_FILES = [
  "./",
  "./index.html",
  "./template.html",
  "./manifest.json",
  "./modules/ug-nx12.js",
  "./modules/digital-basics.js",
  "./modules/dji-action4.js",
  "./modules/solidworks.js",
  "./modules/excel.js",
  "./modules/swimming.js",
];

// 安装：缓存核心文件
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES).catch((err) => {
        // 部分文件缓存失败不阻塞安装
        console.log("[SW] 部分文件缓存失败:", err);
      });
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求：缓存优先，网络回退
self.addEventListener("fetch", (event) => {
  // 只处理 GET 请求
  if (event.request.method !== "GET") return;

  // B站视频和外部资源不走缓存，直接网络请求
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 缓存命中：返回缓存
      if (cachedResponse) {
        return cachedResponse;
      }
      // 缓存未命中：网络请求
      return fetch(event.request)
        .then((response) => {
          // 只缓存有效的响应
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          // 复制响应并缓存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // 网络失败：如果是导航请求，返回主页
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
    })
  );
});
