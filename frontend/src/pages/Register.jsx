import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import styles from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      await API.post("/auth/register", data);
      alert("Signup successful 🎉");
      navigate("/login");
    } catch (err) {
      alert("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account ✨</h2>

        <input
          className={styles.input}
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          className={styles.input}
          placeholder="Email"
          type="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          className={styles.button}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up 🚀"}
        </button>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
