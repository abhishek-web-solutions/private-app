import express from "express";
import { sendMessage, getMessages,getMessagesByFriend } from "../controllers/messageController.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware,upload.single("image"), sendMessage);
router.get("/:senderId/:receiverId", authMiddleware, getMessages);
router.get("/:friendId", authMiddleware, getMessagesByFriend);
 // ✅ GET messages using only selectedFriendId

export default router;
