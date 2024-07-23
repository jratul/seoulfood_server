import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import foodsRouter from "./routes/foods.router";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.MONGODB_URI && process.env.DB_NAME) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
} else {
  console.log("Failed to connect mongo db. Invalid URI");
}

app.use("/foods", foodsRouter);

app.get("/", (req, res) => {
  res.send("Seoul Food Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Seoul Food Server is running on ${process.env.PORT}`);
});
