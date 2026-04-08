import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <h2>Welcome to Dashboard 🎉</h2>

        <div className={styles.cardContainer}>
          <div className={styles.card} onClick={() => navigate("/chat")}>
            💬 Chat
          </div>

          <div className={styles.card}>🔔 Notifications</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
