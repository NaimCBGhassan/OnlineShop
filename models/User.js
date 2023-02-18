import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Username `{VALUE}` already exist"],
      required: [true, "Username is required"],
      minLength: [6, "Minimum length is 6"],
    },
    email: {
      type: String,
      unique: [true, "Email `{VALUE}` already exist"],
      required: [true, "Email is required"],
      match: [
        /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
        "Invalid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Minimum length is 6"],
    },
    role: {
      type: String,
      required: true,
      enum: { values: ["User", "Admin"], message: "The role `{VALUE}` doesn't exist" },
    },
  },
  { versionKey: false }
);

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async function (password, receivedPassword) {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
