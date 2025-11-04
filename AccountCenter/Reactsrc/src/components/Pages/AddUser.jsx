// AddPatient.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../../api/Crudapi";
import "../../styles/UserForms.css";

const AddPatient = () => {
  const [patient, setPatient] = useState({ name: "", email: "", age: "", mobile: "", location: "" });
  const [message, setMessage] = useState(""); // <-- message state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient(patient);
      setMessage("Patient added successfully! Redirecting...");

      setPatient({ name: "", email: "", age: "", mobile: "", location: "" });

      // Wait 2 seconds, then navigate
      setTimeout(() => {
        navigate("/display");
      }, 2000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="user-form-wrapper">
      <div className="user-form-container">
        <h2>Add Patient</h2>

        {/* Show message if exists */}
        {message && <p className="success-message">{message}</p>}

        <form className="user-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={patient.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={patient.email} onChange={handleChange} required />
          <input type="number" name="mobile" placeholder="Mobile" value={patient.mobile} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={patient.age} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={patient.location} onChange={handleChange} required />
          <button type="submit">Add Patient</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
