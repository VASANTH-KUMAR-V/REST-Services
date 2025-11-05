// src/components/UpdateUser.jsx
import React, { useState } from "react";
import { updatePatient } from "../../api/Crudapi";
import "../../styles/DisplayUser.css"; // reuse existing styles

const UpdateUser = ({ patient, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: patient.id,
    name: patient.name,
    age: patient.age,
    location: patient.location,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatient(formData.id, {
        name: formData.name,
        age: formData.age,
        location: formData.location,
      });
      setMessage("✅ Patient updated successfully!");
      setTimeout(() => {
        setMessage("");
        onSuccess(); // Refresh data in parent
        onClose();   // Close popup
      }, 1500);
    } catch (err) {
      setMessage(`❌ Update failed: ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Update Patient</h3>

        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <div className="popup-buttons">
            <button type="submit" className="save-btn">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
