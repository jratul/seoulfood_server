import mongoose, { Document, Schema } from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//   },
//   name: {
//     type: String,
//   },
//   googleId: {
//     type: String,
//     unique: true,
//   },
// });

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
