import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid email or password");
    }
  };

  // 🐙 GitHub Login
  const loginWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
      navigate("/");
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("GitHub login failed");
    }
  };

  return (
    <div className="auth-form-card">
      <h2>Welcome back! 👋</h2>
      <p className="form-subtext">Please enter your credentials to access your account.</p>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">LOGIN</button>
      </form>

      <hr />

      <button onClick={loginWithGitHub} className="github-login-btn">
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;