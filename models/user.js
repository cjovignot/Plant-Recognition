import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    pseudo: String,
    password: String,
    inscription: Date,
    role: String,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
