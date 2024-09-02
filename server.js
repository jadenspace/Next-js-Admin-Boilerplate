const fs = require("fs");
const http = require("http");
const https = require("https");
const { parse } = require("url");

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 442;

const httpsOptions = {
  key: fs.readFileSync("./local-key.pem"),
  cert: fs.readFileSync("./local-cert.pem"),
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });

  // https 서버 추가
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT + 1, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${PORT + 1}`);
    });
});
