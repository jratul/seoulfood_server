import express from "express";
import passport from "passport";
import { getUser } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/google", passport.authenticate("google"));
usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/",
  })
);

usersRouter.get("/:id", getUser);

export default usersRouter;
