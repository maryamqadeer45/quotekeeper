import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="auth-form-card">
      <h2>Create your account ✨</h2>
      <p className="form-subtext">Start your journey by signing up below.</p>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">REGISTER</button>
      </form>
    </div>
  );
};

export default Register;