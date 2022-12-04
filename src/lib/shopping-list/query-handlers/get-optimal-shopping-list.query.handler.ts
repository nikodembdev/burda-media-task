import { ShoppingListService } from "../services/shopping-list.service";
import { QueryHandler } from "../../shared/query-bus";
import {
  GetOptimalShoppingListQuery,
  GET_OPTIMAL_SHOPPING_LIST_QUERY_TYPE,
} from "../queries/get-optimal-shopping-list.query";
import { GetOptimalShoppingListQueryResult } from "../queries/get-optimal-shopping-list.query.result";

interface GetOptimalShoppingListDependencies {
  shoppingListService: ShoppingListService;
}

export default class GetOptimalShoppingListQueryHandler
  implements QueryHandler<GetOptimalShoppingListQuery, GetOptimalShoppingListQueryResult>
{
  public queryType: string = GET_OPTIMAL_SHOPPING_LIST_QUERY_TYPE;

  constructor(public dependencies: GetOptimalShoppingListDependencies) {}

  async execute(query: GetOptimalShoppingListQuery): Promise<GetOptimalShoppingListQueryResult> {
    const list = query.payload.shoppingList;

    const optimalList = this.dependencies.shoppingListService.getOptimalShoppingList(
      query.payload.amountOfPurchases,
      list
    );

    return new GetOptimalShoppingListQueryResult(optimalList);
  }
}
