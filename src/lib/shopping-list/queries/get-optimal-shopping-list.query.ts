import { Query } from "../../shared/query-bus";

export const GET_OPTIMAL_SHOPPING_LIST_QUERY_TYPE = "get/optimal-shopping-list";

export interface ShoppingProduct {
  name: string;
  reviewRating: number;
  price: number;
}

export interface GetOptimalShoppingListQueryPayload {
  shoppingList: ShoppingProduct[];
  amountOfPurchases: number;
}

export class GetOptimalShoppingListQuery implements Query<GetOptimalShoppingListQueryPayload> {
  public type: string = GET_OPTIMAL_SHOPPING_LIST_QUERY_TYPE;

  constructor(public payload: GetOptimalShoppingListQueryPayload) {}
}
