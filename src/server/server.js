const fastify = require("fastify");
const server = fastify({ logger: true });
server.listen(3001).catch(console.error);
server.get("/", (req, res) => {
  res.send("Hello Stas");
});
server.post("/", (req, res) => {
  res.send("hi");
});
