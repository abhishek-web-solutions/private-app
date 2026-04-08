import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <h3 className={styles.logo}>Chat App</h3>

      <div className={styles.rightSection}>
        <button onClick={() => navigate("/chat")}>💬 Chat</button>
        <button>🔔</button>
        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
