import { use, useEffect, useState, useRef } from "react";
import API from "../api/axios";
import socket from "../socket";
import MessageBubble from "./MessageBubble";
import styles from "../styles/ChatWindow.module.css";

const ChatWindow = ({ selectedFriend }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user?._id;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const handleIconClick = () => {
    fileRef.current.click();
  };

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
    if (!input.trim() && !file) return;
    const formData = new FormData();
    formData.append("senderId", senderId);
    formData.append("receiverId", selectedFriend._id);
    formData.append("message", input);
    if (file) {
      formData.append("image", file);
    }

    // const msg = {
    //   senderId,
    //   receiverId: selectedFriend._id,
    //   message: input,
    // };

    const res = await API.post("/messages", formData);

    socket.emit("sendMessage", res.data);

    setMessages((prev) => [...prev, res.data]);
    setInput("");
    setFile(null);
  };

  if (!selectedFriend) {
    return <div className={styles.chat}>Select a friend 💬</div>;
  }

  return (
    <div className={styles.chat}>
      <div className={styles.header}>{selectedFriend.username}</div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} senderId={senderId} />
        ))}
      </div>

      {file && (
        <div className={styles.preview}>
          <img src={URL.createObjectURL(file)} alt="Preview" />
        </div>
      )}

      <div className={styles.inputBox}>
        <input
          className={styles.files}
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleIconClick}>+</button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
