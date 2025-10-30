import React, { useState } from "react";
import "./Common.css";

const RemoveUser = () => {
  const [userId, setUserId] = useState("");

  const handleRemove = (e) => {
    e.preventDefault();
    alert(`User with ID ${userId} removed.`);
    setUserId("");
  };

  return (
    <div className="page-wrapper">
      <div className="page">
        <h2>Remove User</h2>
        <form onSubmit={handleRemove}>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <button type="submit">Remove</button>
        </form>
      </div>
    </div>
  );
};

export default RemoveUser;
