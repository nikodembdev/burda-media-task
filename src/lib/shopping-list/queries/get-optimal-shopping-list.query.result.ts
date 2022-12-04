import { QueryResult } from "../../shared/query-bus";
import { ShoppingProduct } from "./get-optimal-shopping-list.query";

export class GetOptimalShoppingListQueryResult implements QueryResult<ShoppingProduct[]> {
  constructor(public result: ShoppingProduct[]) {}
}
