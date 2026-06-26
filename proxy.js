// proxy.js
// รัน: node proxy.js
// ต้องการ Node.js เท่านั้น ไม่ต้อง install อะไรเพิ่ม

const http = require("http");
const url  = require("url");

const UPSTREAM_HOST = "43.229.132.25";
const UPSTREAM_PORT = 80;
const PROXY_PORT    = 8080;

http.createServer((req, res) => {
  // Allow any origin (GitHub Pages, file://, localhost)
  res.setHeader("Access-Control-Allow-Origin",  "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Expose-Headers","*");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  const targetPath = req.url; // เช่น /play/xxx/m3u8

  const options = {
    hostname : UPSTREAM_HOST,
    port     : UPSTREAM_PORT,
    path     : targetPath,
    method   : req.method,
    headers  : {
      ...req.headers,
      host: UPSTREAM_HOST + ":" + UPSTREAM_PORT,
    },
  };

  // ลบ header ที่ทำให้ปัญหา
  delete options.headers["origin"];
  delete options.headers["referer"];

  const proxy = http.request(options, (upstream) => {
    const headers = { ...upstream.headers };
    // เพิ่ม CORS ใน response ด้วย
    headers["access-control-allow-origin"] = "*";

    res.writeHead(upstream.statusCode, headers);
    upstream.pipe(res, { end: true });
  });

  proxy.on("error", (err) => {
    console.error("[Proxy Error]", err.message);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "text/plain" });
    }
    res.end("Proxy error: " + err.message);
  });

  req.pipe(proxy, { end: true });

}).listen(PROXY_PORT, () => {
  console.log("✅ Proxy running → http://localhost:" + PROXY_PORT);
  console.log("   Stream URL  → http://localhost:" + PROXY_PORT + "/play/bQ-fFu7dMOtIPDjoXbK1w5H53SITSMYtRd-Oqf6wLL0/m3u8");
});
