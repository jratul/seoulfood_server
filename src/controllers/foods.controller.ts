import foodModel from "../models/foods.model";
import { Request, Response, NextFunction } from "express";

export const getFoods = (req: Request, res: Response, next: NextFunction) => {
  foodModel
    .find({})
    .then((foods) => {
      res.status(200).json(foods);
    })
    .catch((error) => next(error));
};
