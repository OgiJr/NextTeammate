import { codes } from "currency-codes";
import mongoose, { Schema } from "mongoose";

const workDataSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  expected_hours_weekly: { type: Schema.Types.Number, required: [true, "Please provide the expected hours per week!"] },
  current_price_per_hours: { type: Schema.Types.Number, required: [true, "Please provide the price for hourly work!"] },
  currency: {
    type: Schema.Types.String,
    uppercase: true,
    requred: [true, "Please provide the currency for the price as an ISO 4217 code!"],
    enum: { values: codes(), message: "{VALUE} is not a valid ISO 4217 currency code!" },
  },
  work: { type: [Schema.Types.ObjectId], ref: "WorkUnit" },
});

module.exports = mongoose.models.WorkData || mongoose.model("WorkData", workDataSchema);
