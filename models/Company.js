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
  dropbox: {
    type: Schema.Types.String,
    trim: true,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      "Please insert a valid URL!",
    ],
  },
});

module.exports = mongoose.models.Company || mongoose.model("Company", companySchema);
