import { codes } from "currency-codes";
import mongoose, { Schema } from "mongoose";

const workDataSchema = Schema({
  expected_hours_weekly: { type: Schema.Types.Number, required: [true, "Please provide the expected hours per week!"] },
  current_price_per_hour: { type: Schema.Types.Number, required: [true, "Please provide the price for hourly work!"] },
  worker: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the id of the user!"],
    unique: true,
  },
  currency: {
    type: Schema.Types.String,
    uppercase: true,
    requred: [true, "Please provide the currency for the price as an ISO 4217 code!"],
    enum: { values: codes(), message: "{VALUE} is not a valid ISO 4217 currency code!" },
  },
  autoClockOutHours: {
    type: Schema.Types.Number,
    required: [true, "Please rovide an auto-clock-out time in hours!"],
    default: 8,
  },
  work: { type: [Schema.Types.ObjectId], ref: "WorkUnit" },
});

module.exports = mongoose.models.WorkData || mongoose.model("WorkData", workDataSchema);
