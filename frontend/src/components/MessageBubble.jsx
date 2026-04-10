import styles from "../styles/MessageBubble.module.css";

const MessageBubble = ({ msg, senderId }) => {
  const isMe = msg.senderId === senderId;

  return (
    <div className={isMe ? styles.myMessage : styles.otherMessage}>
      {/* TEXT */}
      {msg.message && <p>{msg.message}</p>}

      {/* IMAGE */}
      {msg.image && (
        <img
          src={`https://private-app-a0l2.onrender.com/uploads/${msg.image}  `}
          alt="chat"
          className={styles.image}
        />
      )}
    </div>
  );
};

export default MessageBubble;
