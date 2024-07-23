import express, { Express } from "express";
import "dotenv/config";

const app: Express = express();

app.get("/", (req, res) => {
  res.send("Seoul Food Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Seoul Food Server is running on ${process.env.PORT}`);
});
