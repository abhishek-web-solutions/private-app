import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  console.log("Received message:", req.body);

  const newMsg = await Message.create({
    senderId,
    receiverId,
    message,
  });

  res.json(newMsg);
};

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  });

  res.json(messages);
};
  // ✅ GET messages using only selectedFriendId
 export const getMessagesByFriend = async (req, res) => {
  try {
    const currentUserId = req.user.id; // token se
    const friendId = req.params.friendId;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: friendId },
        { senderId: friendId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
    console.log("Messages for friendId", friendId, ":", messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


