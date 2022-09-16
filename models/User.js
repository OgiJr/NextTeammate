import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  first_name: { type: Schema.Types.String, required: [true, "Please insert a first name!"], trim: true },
  last_name: { type: Schema.Types.String, required: [true, "Please insert a last name!"], trim: true },
  email: {
    type: Schema.Types.String,
    required: [true, "Please insert an email!"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please insert a valid email!"],
  },
  password_hash: { type: Schema.Types.String, default: "", trim: true, required: false },
  has_password: { type: Schema.Types.Boolean, default: false, required: true },
  password_generation_key: { type: Schema.Types.String, trim: true, required: false },
  is_admin: { type: Schema.Types.Boolean, default: false, required: true },
  work_data: { type: Schema.Types.ObjectId, ref: "WorkData", required: false },
  picture: { type: Schema.Types.String, default: "", trim: true, required: false },
  has_picture: { type: Schema.Types.Boolean, default: false, required: true },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
