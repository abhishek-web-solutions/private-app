import { useEffect, useState } from "react";
import API from "../api/axios";
import styles from "../styles/FriendsList.module.css";

const FriendsList = ({ onSelect }) => {
  const [friends, setFriends] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
 

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await API.get("auth/users");

        // ❌ exclude self
        const filtered = res.data.filter(
          (user) => user._id !== currentUser._id,
        );

        setFriends(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Friends</h3>

      {friends.map((f) => (
        <div
          key={f._id}
          className={styles.friendCard}
          onClick={() => onSelect(f)}
        >
          <div className={styles.avatar}>
            {f.username.charAt(0).toUpperCase()}
          </div>

          <div className={styles.info}>
            <p className={styles.name}>{f.username}</p>
            <span className={styles.status}>Offline</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
