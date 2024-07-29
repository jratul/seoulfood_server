import userModel from "../models/users.model";
import { Request, Response, NextFunction } from "express";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  userModel
    .findOne({
      googleId: req.params.id,
    })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => next(error));
};
