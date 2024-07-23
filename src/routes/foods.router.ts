import express from "express";
import { getFoods } from "../controllers/foods.controller";

const foodsRouter = express.Router();

foodsRouter.get("/", getFoods);

export default foodsRouter;
