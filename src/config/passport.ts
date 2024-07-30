import passport from "passport";
import usersModel from "../models/users.model";
import GoogleStrategy from "passport-google-oauth20";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const googleStrategyConfig = new GoogleStrategy.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_PW || "",
    callbackURL: "https://sfserver.jratul.shop:9876/users/google/callback",
    // callbackURL: "https://localhost:3001",
    scope: ["email", "profile"],
  },
  (accessToken, refreshToken, profile, done) => {
    usersModel
      .findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const user = new usersModel();
          user.email = profile.emails?.[0]?.value || "";
          user.googleId = profile.id;
          user.username = profile.displayName;

          if (!user.email || !user.googleId || !user.username) {
            done(new Error("Invalid user info"));
          }

          user
            .save()
            .then(() => {
              done(null, user);
            })
            .catch((error) => {
              console.log(error);
              return done(error);
            });
        }
      })
      .catch((error) => {
        return done(error);
      });
  }
);

passport.use(googleStrategyConfig);
