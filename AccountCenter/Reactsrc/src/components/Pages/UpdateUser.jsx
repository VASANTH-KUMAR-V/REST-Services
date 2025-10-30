import React, { useState } from "react";
import "./Common.css";

const UpdateUser = () => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`User ${user.id} updated!`);
    setUser({ id: "", name: "", email: "" });
  };

  return (
    <div className="page-wrapper">
      <div className="page">
        <h2>Update User</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="User ID"
            value={user.id}
            onChange={(e) => setUser({ ...user, id: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="New Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="location"
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
