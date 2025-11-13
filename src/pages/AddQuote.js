import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddQuote = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a quote.");
      return;
    }

    try {
      await addDoc(collection(db, "quotes"), {
        text,
        author,
        userId: user.uid,
        dateAdded: new Date(),
      });
      toast.success("Quote added successfully");
      navigate("/");
    } catch (err) {
      console.error("Failed to add quote:", err);
      toast.error("Failed to add quote");
    }
  };

  return (
    <div className="auth-form-card">
      <h2>Add a Quote ✍️</h2>
      <p className="form-subtext">Share your favorite words with the world.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">ADD QUOTE</button>
      </form>
    </div>
  );
};

export default AddQuote;