import mongoose, { Schema } from "mongoose";

const companySchema = Schema({
  name: {
    type: Schema.Types.String,
    required: [true, "Please insert a name!"],
    unique: [true, "Company already exists!"],
    trim: true,
  },
  picture: {
    type: Schema.Types.String,
    required: [true, "Please insert a picture!"],
    trim: true,
  },
});

module.exports = mongoose.models.Company || mongoose.model("Company", companySchema);
