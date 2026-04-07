const http = require("http");
const assert = require("assert");
const { requestHandler } = require("./server");

const server = http.createServer(requestHandler);

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${server.address().port}${path}`, (res) => {
      let body = "";
      res.on("data", (chunk) => { body += chunk; });
      res.on("end", () => resolve({ statusCode: res.statusCode, body: JSON.parse(body) }));
    });
    req.on("error", reject);
  });
}

async function runTests() {
  await new Promise((resolve) => server.listen(0, resolve));

  try {
    // Test: GET /health returns 200 with status and timestamp
    const res = await request("/health");
    assert.strictEqual(res.statusCode, 200, "Expected HTTP 200");
    assert.strictEqual(res.body.status, "ok", 'Expected status "ok"');
    assert.ok(res.body.timestamp, "Expected timestamp field");
    // Verify timestamp is valid ISO8601
    assert.ok(!isNaN(Date.parse(res.body.timestamp)), "Expected valid ISO8601 timestamp");

    // Test: Unknown route returns 404
    const notFound = await request("/unknown");
    assert.strictEqual(notFound.statusCode, 404, "Expected HTTP 404 for unknown route");

    console.log("All tests passed");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("Test failed:", err.message);
  process.exit(1);
});
