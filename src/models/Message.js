import mongoose from "mongoose";
const { Schema, model } = mongoose; // Importing `model` along with `Schema`

const MessageSchema = new Schema(
  {
    senderId: { type: String, required: true, unique: true },
    recipientId: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MessageModel = model("Message", MessageSchema);
export default MessageModel; // Changed from `module.exports` to ES6 export
