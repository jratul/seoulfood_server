import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Seoul Food Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Seoul Food Server is running on ${process.env.PORT}`);
});
