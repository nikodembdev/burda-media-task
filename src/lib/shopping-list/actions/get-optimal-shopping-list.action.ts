import { Request, Response, NextFunction } from "express";
import { QueryBus } from "../../shared/query-bus";
import { GetOptimalShoppingListQuery } from "../queries/get-optimal-shopping-list.query";
import { celebrate, Joi } from "celebrate";

const shoppingItemSchema = Joi.object().keys({
  name: Joi.string().required(),
  reviewRating: Joi.number().required(),
  price: Joi.number().required(),
});

export const getOptimalShoppingListValidation = celebrate(
  {
    body: Joi.object().keys({
      amountOfPurchases: Joi.number().min(1).required(),
      shoppingList: Joi.array().items(shoppingItemSchema),
    }),
  },
  { abortEarly: false, presence: "required" }
);

export interface GetOptimalShoppingListActionProps {
  queryBus: QueryBus;
}

export const getOptimalShoppingListAction =
  ({ queryBus }: GetOptimalShoppingListActionProps) =>
  (req: Request, res: Response, next: NextFunction) => {
    queryBus
      .execute(
        new GetOptimalShoppingListQuery({
          shoppingList: req.body.shoppingList,
          amountOfPurchases: req.body.amountOfPurchases,
        })
      )
      .then(queryResult => {
        res.json(queryResult.result);
      })
      .catch(next);
  };
