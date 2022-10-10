import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  first_name: {
    type: Schema.Types.String,
    required: [true, "Please insert a first name!"],
    trim: true,
  },
  last_name: {
    type: Schema.Types.String,
    required: [true, "Please insert a last name!"],
    trim: true,
  },
  email: {
    type: Schema.Types.String,
    required: [true, "Please insert an email!"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please insert a valid email!",
    ],
  },
  is_admin: { type: Schema.Types.Boolean, default: false, required: true },
  gender: { type: Schema.Types.String, enum: ["m", "f"], required: false },
  password_hash: {
    type: Schema.Types.String,
    default: "",
    trim: true,
    required: false,
  },
  password_generation_key: {
    type: Schema.Types.String,
    trim: true,
    required: false,
  },
  work_data: { type: Schema.Types.ObjectId, ref: "WorkData", required: false },
  picture: {
    type: Schema.Types.String,
    default: "/assets/images/no-user.png",
    trim: true,
    required: false,
  },
  bio: { type: Schema.Types.String, default: "", required: false },
  birthdate: {
    type: Schema.Types.Date,
    default: "01-01-0001",
    required: false,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
