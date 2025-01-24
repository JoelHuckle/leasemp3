// models/User.js
import mongoose from "mongoose";

//create schema for user
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  accessToken: String,
  token: [String],
});

let User;

try {
  User = mongoose.model("users");
} catch (err) {
  //create model if not already defined
  User = mongoose.model("users", UserSchema);
}

export default User;
