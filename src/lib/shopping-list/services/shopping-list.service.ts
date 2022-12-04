import { ShoppingProduct } from "../queries/get-optimal-shopping-list.query";

export class ShoppingListService {
  public getOptimalShoppingList(
    amountOfPurchases: number,
    products: ShoppingProduct[]
  ): ShoppingProduct[] {
    const matrix = new Array<number[]>(products.length + 1)
      .fill([])
      .map(() => new Array<number>(amountOfPurchases + 1).fill(0));

    for (let productIndex = 0; productIndex < products.length; productIndex++) {
      const product = products[productIndex];

      for (
        let currentShoppingListAmount = 1;
        currentShoppingListAmount <= amountOfPurchases;
        currentShoppingListAmount++
      ) {
        const previousProductRating = matrix[productIndex][currentShoppingListAmount];

        if (currentShoppingListAmount >= product.price) {
          const currentRating =
            matrix[productIndex][currentShoppingListAmount - product.price] + product.reviewRating;
          matrix[productIndex + 1][currentShoppingListAmount] = Math.max(
            currentRating,
            previousProductRating
          );
        } else {
          matrix[productIndex + 1][currentShoppingListAmount] = previousProductRating;
        }
      }
    }

    const optimalProducts: ShoppingProduct[] = [];
    for (let i = products.length; i > 0; i--) {
      if (matrix[i - 1][amountOfPurchases] !== matrix[i][amountOfPurchases]) {
        optimalProducts.push(products[i - 1]);
        amountOfPurchases -= products[i - 1].price;
      }
    }

    return optimalProducts;
  }
}
