const http = require("http");

const PORT = process.env.PORT || 3000;

function handleHealth(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }));
}

function requestHandler(req, res) {
  if (req.method === "GET" && req.url === "/health") {
    return handleHealth(req, res);
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = { requestHandler };
