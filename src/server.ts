import express from "express";
import { AwilixContainer } from "awilix";
import { Config } from "./config/config";

import bodyParser from "body-parser";
function serverFactory(deps: AwilixContainer) {
  const config: Config = deps.resolve("config");

  const app = express();

  app.use(bodyParser.json());

  const port = config.HTTP.port;

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
}

export default serverFactory;
