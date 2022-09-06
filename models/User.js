import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  first_name: { type: Schema.Types.String, required: [true, "Please insert a first name!"], trim: true },
  last_name: { type: Schema.Types.String, required: [true, "Please insert a last name!"], trim: true },
  email: {
    type: Schema.Types.String,
    required: [true, "Please insert an email!"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please insert a valid email!"],
  },
  password_hash: { type: Schema.Types.String, required: [true, "Pleae insert a password!"], trim: true },
  is_admin: { type: Schema.Types.Boolean, required: false },
  work_data: { type: Schema.Types.ObjectId, ref: "WorkData" },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
