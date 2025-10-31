import React, { useState } from "react";
import { deletePatient } from "../../api/Crudapi";
import "../../styles/UserForms.css";

const RemoveUser = () => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemove = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please enter a valid ID.");
    if (!window.confirm(`Remove user with ID ${userId}?`)) return;

    setLoading(true);
    try {
      const result = await deletePatient(userId);
      alert(`User with ID ${userId} removed successfully!`);
      console.log(result);
      setUserId("");
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-page-wrapper">
      <div className="user-form-container">
        <h2>Remove Patient</h2>
        <form className="user-form" onSubmit={handleRemove}>
          <input
            type="number"
            placeholder="Enter Patient ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Removing..." : "Remove"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemoveUser;
