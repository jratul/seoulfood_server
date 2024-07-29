import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";
import morgan from "morgan";
import path from "path";
import "dotenv/config";
import foodsRouter from "./routes/foods.router";
import usersRouter from "./routes/users.router";
import "./config/passport";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    name: process.env.COOKIE_SESSION_NAME,
    keys: [process.env.COOKIE_ENCRYPTION_KEY ?? ""],
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use((req, _res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: any) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb: any) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

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

app.use(express.static(path.join(__dirname, "public")));

app.use("/foods", foodsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.status(200).send("Seoul Food Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Seoul Food Server is running on ${process.env.PORT}`);
});
