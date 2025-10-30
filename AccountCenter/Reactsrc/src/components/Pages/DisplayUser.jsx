import React, { useEffect, useState } from "react";
import { getAllPatients } from "../../api/Crudapi"; // your API helper
import "../../styles/DisplayUser.css"

const DisplayUser = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getAllPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="page">
      <h2>All Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.age}</td>
                <td>{patient.mobile}</td>
                <td>{patient.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayUser;
