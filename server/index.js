import express from "express";
import "express-async-errors";
import { createServer } from "http";

import { arts } from "#src/routes/_index";
import "#src/services/mongodb";
import "#src/services/redis";

import { PORT_EXPRESS } from "./config.js";

const app = express();
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/arts", arts);
server.listen(PORT_EXPRESS);
console.log(`Server now listening on port ${PORT_EXPRESS}`);

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

// Generic error handler for uncaught exceptions, from express-async-errors
app.use(async (err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ error: err.stack });
});

await import("./sample-data.js");
