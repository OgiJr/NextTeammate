import mongoose, { Schema } from "mongoose";

const chatLatestPingSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please insert an accessor!"],
    trim: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    required: [true, "Please insert a timestamp!"],
  },
});

module.exports = mongoose.models.ChatLatestPing || mongoose.model("ChatLatestPing", chatLatestPingSchema);
