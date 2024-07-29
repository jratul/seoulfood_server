import mongoose, { Document, Schema } from "mongoose";

export type UserDocument = Document & {
  username: string;
  email: string;
  googleId: string;
};

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  googleId: String,
});

const usersModel = mongoose.model("User", userSchema);

export default usersModel;
