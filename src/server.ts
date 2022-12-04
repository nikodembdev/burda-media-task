import express from "express";
import { AwilixContainer } from "awilix";
import { Config } from "./config/config";

import bodyParser from "body-parser";
import { getOptimalShoppingListValidation } from "./lib/shopping-list/actions/get-optimal-shopping-list.action";
import { errors } from "celebrate";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger";

function serverFactory(deps: AwilixContainer) {
  const swaggerEp = "/api-docs";
  const config: Config = deps.resolve("config");

  const app = express();

  app.use(bodyParser.json());

  const port = config.HTTP.port;

  const getOptimalShoppingListAction: express.RequestHandler = deps.resolve(
    "getOptimalShoppingListAction"
  );

  app.post(
    "/get-optimal-shopping-list",
    [getOptimalShoppingListValidation],
    getOptimalShoppingListAction
  );

  app.use(errors());

  app.use(swaggerEp, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
    console.log(`Api docs: localhost:${port}${swaggerEp}`);
  });
}

export default serverFactory;
