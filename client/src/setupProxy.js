/*
This file makes it so any request to localhost:8000 goes to localhost:5000
if React server doesn't know the route. This is useful for proxying /api/*
*/

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      ws: true,
    })
  );
};
