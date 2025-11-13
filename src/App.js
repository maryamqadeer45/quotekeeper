import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // optional placeholder
import AddQuote from "./pages/AddQuote";
import Navbar from "./components/Navbar";
import EditQuote from "./pages/EditQuote";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-quote" element={<AddQuote />} />
          <Route path="/edit-quote" element={<EditQuote />} />
          <Route path="/add-quote" element={<AddQuote />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;