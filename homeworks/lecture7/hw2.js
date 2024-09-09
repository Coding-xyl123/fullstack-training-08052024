/**
 * Implement a HTTP server that serves JSON data where user requests /api/parsetime and /api/unixtime.
 * For example, when the user requests /api/parsetime?iso=2023-05-22T12:34:56.789Z, the server should
 * respond with a JSON object containing only 'hour', 'minute' and 'second' properties.
 * {
 *  "hour": 12,
 *  "minute": 34,
 *  "second": 56
 * }
 * Similarly, when the user requests /api/unixtime?iso=2023-05-22T12:34:56.789Z, the server should
 * respond with a JSON object containing a 'unixtime' property.
 * {
 *  "unixtime": 1684758896789
 * }
 *
 * HINTS:
 * 1. Use url.parse() method to parse URL strings.
 * 2. response.writeHead(200, { contentType: 'application/json' })
 */

// your code here

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);
  const { pathname, query } = parseUrl;

  if (pathname === "/api/parsetime" && query.iso) {
    const isoDate = new Date(query.iso);

    if (isoDate.toString() === "Invalid Date") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid Date" }));
      return;
    }
    const jsonResponse = {
      hour: isoDate.getHours(),
      minute: isoDate.getMinutes(),
      second: isoDate.getSeconds(),
    };
    res.writeHead(200, { "Content-Type": "application/json" }); //Http 200 OK response status indicates that the request has succeeded
    res.end(JSON.stringify(jsonResponse));
  } else if (pathname === "/api/unixtime" && query.iso) {
    const isoDate = new Date(query.iso);

    if (isoDate.toString() === "Invalid Date") {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid Date" }));
      return;
    }
    const jsonResponse = {
      unixtime: isoDate.getTime(),
    };
    res.writeHead(200, { "Content-Type": "application/json" }); //Http 200 OK response status indicates that the request has succeeded
    res.end(JSON.stringify(jsonResponse));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid Route" }));
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
