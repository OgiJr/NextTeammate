import { codes } from "currency-codes";
import mongoose, { Schema } from "mongoose";

const workUnitSchema = Schema({
  start_time: { type: Schema.Types.Date, required: [true, "Please provide the start time of this work unit!"] },
  end_time: { type: Schema.Types.Date },
  worker: { type: Schema.Types.ObjectId, ref: "User", required: [true, "Please provide the id of the user!"] },
  price_per_hours: {
    type: Schema.Types.Number,
    required: [true, "Please provide the price of one hour of work for this work unit!"],
  },
  currency: {
    type: Schema.Types.String,
    uppercase: true,
    requred: [true, "Please provide the currency for the price as an ISO 4217 code!"],
    enum: { values: codes(), message: "{VALUE} is not a valid ISO 4217 currency code!" },
  },
});

module.exports = mongoose.models.WorkUnit || mongoose.model("WorkUnit", workUnitSchema);
