import React, { useState } from "react";
import { updatePatient } from "../../api/Crudapi";
import "../../styles/UserForms.css";

const UpdateUser = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    age: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await updatePatient(user.id, {
        name: user.name,
        age: user.age,
        location: user.location,
      });
      alert(`Patient ID ${user.id} updated successfully!`);
      console.log(updated);
      setUser({ id: "", name: "", age: "", location: "" });
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="user-page-wrapper">
      <div className="user-form-container">
        <h2>Update Patient</h2>
        <form className="user-form" onSubmit={handleUpdate}>
          <input type="number" name="id" value={user.id} onChange={handleChange} placeholder="Patient ID" required />
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="New Name" required />
          <input type="number" name="age" value={user.age} onChange={handleChange} placeholder="Age" required />
          <input type="text" name="location" value={user.location} onChange={handleChange} placeholder="Location" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
