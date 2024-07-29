import express from "express";
import passport from "passport";
import { getUser, getUsers } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/google", passport.authenticate("google"));
usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "https://localhost:3001",
    failureRedirect: "/",
  })
);

usersRouter.get("/:id", getUser);

export default usersRouter;
