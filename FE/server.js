const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port: 3000 });
const handle = app.getRequestHandler();

try {
  const httpsOptions = {
    key: fs.readFileSync("./localhost+2-key.pem"),
    cert: fs.readFileSync("./localhost+2.pem"),
  };

  app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
      const url = req.url || "/"; // Fallback to "/" nếu req.url là undefined
      const parsedUrl = parse(url, true);

      handle(req, res, parsedUrl);
    }).listen(3000, () => {
      console.log("> Ready on https://localhost:3000");
    });
  }).catch((err) => {
    console.error("Error during app preparation:", err);
  });
} catch (err) {
  console.error("Error loading HTTPS options:", err);
}