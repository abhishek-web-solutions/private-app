let users = {};

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      users[userId] = socket.id;
    });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const receiverSocket = users[receiverId];

      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", {
          senderId,
          message,
        });
      }
    });
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
    });

    socket.on("sendGroupMessage", ({ groupId, senderId, message }) => {
      io.to(groupId).emit("receiveGroupMessage", {
        senderId,
        message,
        groupId,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
