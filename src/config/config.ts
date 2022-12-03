export type Config = {
  HTTP: {
    port: number;
  };
  APP: {
    environment: "LOCAL" | "DEV" | "PROD";
  };
};

// eslint-disable-next-line
const defaultTo = <T>(value: any, defaultValue: T, possibleValues: T[] = []): T => {
  if (possibleValues.length > 0 && possibleValues.includes(value)) {
    return value;
  }
  return (value as T) || defaultValue;
};

const { env } = process;

const config: Config = {
  HTTP: {
    port: defaultTo(env.APP_PORT, 3000),
  },
  APP: {
    environment: defaultTo(env.ENVIRONMENT, "LOCAL"),
  },
};

export default config;
