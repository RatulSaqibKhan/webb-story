import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";
import { logger } from "./src/lib/utils/logger";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  logger.info(
    `${
      (dev ? "development" : process.env.NODE_ENV).substring(0, 1).toUpperCase() +
      (dev ? "development" : process.env.NODE_ENV).substring(1)
    } Server listening at http://localhost:${port}`,
  );
});