import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { getUser, getUsers } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/google", passport.authenticate("google"));
usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://localhost:3001",
    failureMessage: true,
  }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    console.log("req:", req);
    console.log("req.user : ", req.user);

    res.appendHeader("Access-Control-Allow-Credentials", "true");

    res.cookie("sfGoogleJwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("https://localhost:3001");
  }
);

usersRouter.get("/:id", getUser);

export default usersRouter;
