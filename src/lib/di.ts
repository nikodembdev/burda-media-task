import * as awilix from "awilix";
import { AwilixContainer, Lifetime, Resolver } from "awilix";
import { Config } from "../config/config";

import { CommandBus, CommandHandler } from "./shared/command-bus";
import { QueryBus } from "./shared/query-bus";
import { getOptimalShoppingListAction } from "./shopping-list/actions/get-optimal-shopping-list.action";
import GetOptimalShoppingListQueryHandler from "./shopping-list/query-handlers/get-optimal-shopping-list.query.handler";
import { ShoppingListService } from "./shopping-list/services/shopping-list.service";

function asArray<T>(resolvers: Resolver<T>[]): Resolver<T[]> {
  return {
    resolve: (container: AwilixContainer) => resolvers.map((r: Resolver<T>) => container.build(r)),
  };
}

function createDependencyContainer(config: Config): AwilixContainer {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  container.register({
    config: awilix.asValue(config),
  });

  container.register({
    getOptimalShoppingListAction: awilix.asFunction(getOptimalShoppingListAction, {
      lifetime: Lifetime.SCOPED,
    }),
    // actions
  });

  container.register({
    shoppingListService: awilix.asClass(ShoppingListService),
    // services
  });

  container.register({
    commandBus: awilix.asClass(CommandBus).classic().singleton(),
    commandHandlers: asArray<CommandHandler>([]),
    // commands
  });

  container.register({
    queryBus: awilix.asClass(QueryBus).classic().singleton(),
    queryHandlers: asArray<Object>([awilix.asClass(GetOptimalShoppingListQueryHandler)]),
    // queries
  });

  return container;
}

export default createDependencyContainer;
