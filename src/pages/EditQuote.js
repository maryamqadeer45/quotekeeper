import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const EditQuote = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState(state.text);
  const [author, setAuthor] = useState(state.author);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const quoteRef = doc(db, "quotes", state.id);
      await updateDoc(quoteRef, { text, author });
      toast.success("Quote updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update quote");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="form-card">
      <h2>Edit Quote</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Quote text"
        required
        style={{ marginBottom: "1rem", width: "100%" }}
      />
      <br />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        style={{ marginBottom: "1rem", width: "100%" }}
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Update Quote
      </button>
    </form>
  );
};

export default EditQuote;