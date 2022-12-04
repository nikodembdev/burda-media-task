import "mocha";
import { expect } from "chai";

import { QueryBus } from "../lib/shared/query-bus";

import {
  GetOptimalShoppingListQuery,
  ShoppingProduct,
} from "../lib/shopping-list/queries/get-optimal-shopping-list.query";

import createDependencyContainer from "../lib/di";
import config from "../config/config";

let queryBus: QueryBus;

async function executeQuery(amountOfPurchases: number, shoppingList: ShoppingProduct[]) {
  const query = new GetOptimalShoppingListQuery({ amountOfPurchases, shoppingList });

  return queryBus.execute(query);
}

describe("GetOptimalShoppingListQuery", () => {
  before(async () => {
    const container = createDependencyContainer(config);
    queryBus = container.resolve("queryBus");
  });

  it("should return correct data", async () => {
    const queryResult = await executeQuery(15, [
      {
        name: "11",
        reviewRating: 12,
        price: 4,
      },
      {
        name: "22",
        reviewRating: 2,
        price: 2,
      },
      {
        name: "33",
        reviewRating: 1,
        price: 1,
      },
      {
        name: "44",
        reviewRating: 4,
        price: 10,
      },
      {
        name: "55",
        reviewRating: 1,
        price: 2,
      },
    ]);

    const expectedArray = [
      {
        name: "44",
        reviewRating: 4,
        price: 10,
      },
      {
        name: "33",
        reviewRating: 1,
        price: 1,
      },
      {
        name: "11",
        reviewRating: 12,
        price: 4,
      },
    ];

    expect(queryResult.result).to.not.equal(null);
    expect(queryResult.result).to.have.deep.members(expectedArray);
  });

  it("should return empty array for too expensive products", async () => {
    const queryResult = await executeQuery(10, [
      {
        name: "11",
        reviewRating: 12,
        price: 40,
      },
      {
        name: "22",
        reviewRating: 2,
        price: 22,
      },
      {
        name: "33",
        reviewRating: 1,
        price: 123,
      },
      {
        name: "44",
        reviewRating: 4,
        price: 102,
      },
      {
        name: "55",
        reviewRating: 1,
        price: 221,
      },
    ]);

    expect(queryResult.result).to.deep.equal([]);
  });
});
