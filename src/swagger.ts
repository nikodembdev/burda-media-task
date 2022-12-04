export const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Burda Media task",
    description: "Optimal shoping list",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Shopping list",
    },
  ],
  definitions: {
    ShoppingProduct: {
      required: ["name", "price", "reviewRating"],
      properties: {
        name: {
          type: "string",
          default: "Product",
        },
        price: {
          type: "integer",
          default: 3,
        },
        reviewRating: {
          type: "integer",
          default: 2,
        },
      },
    },
    OptimalShoppingList: {
      type: "array",
      items: {
        $ref: "#/definitions/ShoppingProduct",
      },
    },
    ShoppingListBody: {
      required: ["amountOfPurchases", "shoppingList"],
      properties: {
        amountOfPurchases: {
          type: "integer",
          default: 10,
        },
        shoppingList: {
          type: "array",
          items: {
            $ref: "#/definitions/ShoppingProduct",
          },
        },
      },
    },
  },
  paths: {
    "/get-optimal-shopping-list": {
      post: {
        tags: ["Shopping list"],
        description: "Get optimal shoping list for products and ammount of purchase",
        parameters: [
          {
            name: "shoppingList",
            in: "body",
            description: "Shopping list with maximal amount of purchases",
            schema: {
              $ref: "#/definitions/ShoppingListBody",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          "200": {
            schema: {
              $ref: "#/definitions/OptimalShoppingList",
            },
          },
        },
      },
    },
  },
};
