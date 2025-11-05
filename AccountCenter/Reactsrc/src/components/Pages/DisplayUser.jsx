// src/components/Pages/DisplayUser.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPatients } from "../../api/Crudapi";
import "../../styles/DisplayUser.css";
import { Plus, Pencil, X, Search } from "lucide-react";
import UpdateUser from "./UpdateUser";
import RemoveUser from "./RemoveUser";

const DisplayUser = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deletePatientId, setDeletePatientId] = useState(null);

  const navigate = useNavigate();

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

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setShowPopup(true);
  };

  const handleDeleteClick = (id) => {
    setDeletePatientId(id);
  };

  const closeDeletePopup = () => setDeletePatientId(null);

  if (loading) return <p className="center-text">Loading patients...</p>;
  if (error) return <p className="error-text center-text">{error}</p>;

  return (
    <div className="display-wrapper">
      <div className="display-container">
        {/* ===== HEADER ===== */}
        <div className="display-header">
          <h2>All Patients</h2>
          <div className="icon-group">
            <button className="icon-btn add" onClick={() => navigate("/add")}>
              <Plus size={20} />
            </button>
            <button className="icon-btn search" onClick={() => navigate("/search")}>
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="table-container">
            <table className="display-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Mobile</th>
                  <th>Location</th>
                  <th>Actions</th>
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
                    <td className="actions">
                      <button
                        className="icon-btn edit"
                        onClick={() => handleEditClick(patient)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => handleDeleteClick(patient.id)}
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== UPDATE POPUP ===== */}
        {showPopup && selectedPatient && (
          <UpdateUser
            patient={selectedPatient}
            onClose={() => setShowPopup(false)}
            onSuccess={fetchPatients}
          />
        )}

        {/* ===== DELETE POPUP ===== */}
        {deletePatientId && (
          <RemoveUser
            patientId={deletePatientId}
            onCancel={closeDeletePopup}
            onSuccess={() => {
              closeDeletePopup();
              fetchPatients();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DisplayUser;
