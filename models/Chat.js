import mongoose, { Schema } from "mongoose";

const chatSchema = Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please insert a sender!"],
    trim: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please insert a receiver!"],
    trim: true,
  },
  type: {
    type: Schema.Types.String,
    enum: ["TEXT", "FILE"],
    required: [true, "Please insert a message type!"],
    trim: true,
  },
  text: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  file: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  og_filename: {
    type: Schema.Types.String,
    required: false,
    trim: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    required: [true, "Please insert a timestamp!"],
  },
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
