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
  }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.cookie("sfGoogleJwt", token).redirect("https://localhost:3001");
  }
);

usersRouter.get("/:id", getUser);

export default usersRouter;
