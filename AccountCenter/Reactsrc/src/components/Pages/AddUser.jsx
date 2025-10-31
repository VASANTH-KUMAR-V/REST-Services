// AddPatient.jsx
import React, { useState } from "react";
import { addPatient } from "../../api/Crudapi";
import "../../styles/UserForms.css";

const AddPatient = () => {
  const [patient, setPatient] = useState({ name: "", email: "", age: "", mobile: "", location: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addPatient(patient);
      alert("Patient added successfully!");
      setPatient({ name: "", email: "", age: "", mobile: "", location: "" });
      console.log(result);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="user-form-wrapper">
      <div className="user-form-container">
        <h2>Add Patient</h2>
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
