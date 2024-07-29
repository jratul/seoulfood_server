import User from "../models/users.model";
import GoogleStrategy from "passport-google-oauth20";

const googleStrategyConfig = new GoogleStrategy.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_PW || "",
    callbackURL: "https://localhost:3001",
    scope: ["email", "profile"],
  },
  (_accessToken, _refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const user = new User();
          user.email = profile.emails?.[0]?.value;
          user.googleId = profile.id;

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

export default googleStrategyConfig;
