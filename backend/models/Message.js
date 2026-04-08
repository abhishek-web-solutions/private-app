import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    groupId: String,
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Message", messageSchema);
