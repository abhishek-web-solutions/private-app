import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>ChatSphere 💬</h1>

        <p className={styles.subtitle}>
          Connect instantly with friends and groups in real-time.
        </p>

        <button className={styles.button} onClick={() => navigate("/signup")}>
          Get Started 🚀
        </button>
      </div>
    </div>
  );
};

export default Landing;
