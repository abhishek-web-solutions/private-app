import styles from "../styles/MessageBubble.module.css";

const MessageBubble = ({ msg }) => {
  return (
    <div
      className={msg.sender === "me" ? styles.myMessage : styles.otherMessage}
    >
      {msg.text}
    </div>
  );
};

export default MessageBubble;
