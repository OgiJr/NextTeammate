import mongoose, { Schema } from "mongoose";

const chatTimestampSchema = Schema({
  accessor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please insert an accessor!"],
    trim: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please insert a target!"],
    trim: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    required: [true, "Please insert a timestamp!"],
  },
});

module.exports = mongoose.models.ChatTimestamp || mongoose.model("ChatTimestamp", chatTimestampSchema);
