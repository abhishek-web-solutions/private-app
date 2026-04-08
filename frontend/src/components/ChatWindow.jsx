import { useEffect, useState } from "react";
import API from "../api/axios";
import socket from "../socket";
import MessageBubble from "./MessageBubble";
import styles from "../styles/ChatWindow.module.css";

const ChatWindow = ({ selectedFriend }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user?._id;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 📥 Load old messages
  useEffect(() => {
    if (!selectedFriend) return;

    const loadMessages = async () => {
      console.log("select", selectedFriend);
      const res = await API.get(`/messages/${selectedFriend._id}`);
      console.log("Loaded messages:", res.data);
      setMessages(res.data);
    };

    loadMessages();
  }, [selectedFriend]);

  // 🔴 Socket receive
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.senderId === selectedFriend?._id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedFriend]);

  // 📤 Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg = {
      senderId,
      receiverId: selectedFriend._id,
      message: input,
    };

    await API.post("/messages", msg);

    socket.emit("sendMessage", msg);

    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  if (!selectedFriend) {
    return <div className={styles.chat}>Select a friend 💬</div>;
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>{selectedFriend.username}</div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            msg={{
              text: m.message,
              sender: m.senderId === senderId ? "me" : "other",
            }}
          />
        ))}
      </div>

      <div className={styles.inputBox}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
