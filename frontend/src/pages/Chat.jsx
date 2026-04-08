import { useState } from "react";
import FriendsList from "../components/FriendsList";
import ChatWindow from "../components/ChatWindow";
import styles from "../styles/Chat.module.css";

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className={styles.container}>
      <FriendsList onSelect={setSelectedFriend} />
      <ChatWindow selectedFriend={selectedFriend} />
    </div>
  );
};

export default Chat;
