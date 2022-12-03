import * as awilix from "awilix";
import { AwilixContainer, Lifetime, Resolver } from "awilix";
import { Config } from "../config/config";
import { CommandBus, CommandHandler } from "./shared/command-bus";
import { QueryBus } from "./shared/query-bus";

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
    commandBus: awilix.asClass(CommandBus).classic().singleton(),
    commandHandlers: asArray<CommandHandler>([]),
    // commands
  });

  return container;
}

export default createDependencyContainer;
