import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import "../App.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">📜 Quotes</span>
        <Link to="/" className="nav-link">Home</Link>
        {user && <Link to="/add-quote" className="nav-link">Add Quote</Link>}
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;