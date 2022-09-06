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
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please insert a valid email!"],
  },
  password_hash: { type: Schema.Types.String, required: [true, "Pleae insert a password!"], trim: true },
  is_admin: { type: Schema.Types.Boolean, required: [true, "Please input admin info!"] },
  work_data: { type: Schema.Types.ObjectId, ref: "WorkData", required: false },
  employees: { type: [Schema.Types.ObjectId], ref: "User", required: false },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
