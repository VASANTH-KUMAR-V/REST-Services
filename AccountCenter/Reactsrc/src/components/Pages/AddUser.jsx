import React, { useState } from "react";
import { addPatient } from "../../api/Crudapi"; // import your API helper
import "../../styles/auth.css"; // isolated CSS

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
      alert(`Patient added successfully!`);
      setPatient({ name: "", email: "", age: "", mobile: "", location: "" });
      console.log(result);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2>Add Patient</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={patient.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="number"
            name="mobile"
            value={patient.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
          />
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
          <input
            type="text"
            name="location"
            value={patient.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <button type="submit">Add Patient</button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
