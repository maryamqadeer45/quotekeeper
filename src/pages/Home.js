import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "quotes"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuotes(data);
      } catch (err) {
        toast.error("Failed to fetch quotes");
        console.error("Error fetching quotes:", err);
      }
    };

    fetchQuotes();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "quotes", id));
      setQuotes((prev) => prev.filter((quote) => quote.id !== id));
      toast.success("Quote deleted successfully");
    } catch (err) {
      console.error("Error deleting quote:", err);
      toast.error("Failed to delete quote");
    }
  };

  const handleEdit = (quote) => {
    toast.info("Redirecting to edit...");
    navigate("/edit-quote", { state: quote });
  };

  return (
    <div className="home-container">
      <h2 className="home-heading">Welcome, {user?.email}</h2>
      <h3 className="home-subheading">Your Quotes:</h3>
      {quotes.length === 0 ? (
        <p className="no-quotes">No quotes found.</p>
      ) : (
        <div className="quote-list">
          {quotes.map((quote) => (
            <div key={quote.id} className="quote-card">
              <div className="quote-content">
                <div className="quote-author">{quote.author}</div>
                <div className="quote-text">"{quote.text}"</div>
              </div>
              <div className="quote-actions">
                <button
                  onClick={() => handleEdit(quote)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(quote.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;