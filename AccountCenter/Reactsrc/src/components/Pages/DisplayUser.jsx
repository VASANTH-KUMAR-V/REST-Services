import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPatients, deletePatient, updatePatient } from "../../api/Crudapi";
import "../../styles/DisplayUser.css";
import { Plus, Pencil, X, Search } from "lucide-react";

const DisplayUser = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({
    id: "",
    name: "",
    age: "",
    location: "",
  });

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(id);
        setPatients(patients.filter((p) => p.id !== id));
      } catch (error) {
        alert("Failed to delete patient");
      }
    }
  };

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setShowPopup(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await updatePatient(selectedPatient.id, {
        name: selectedPatient.name,
        age: selectedPatient.age,
        location: selectedPatient.location,
      });
      alert(`Patient ${selectedPatient.id} updated successfully!`);
      console.log(updated);
      setShowPopup(false);
      fetchPatients(); // refresh table
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading patients...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", marginTop: "50px" }}>{error}</p>;

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
                      <button className="icon-btn edit" onClick={() => handleEditClick(patient)}>
                        <Pencil size={18} />
                      </button>
                      <button className="icon-btn delete" onClick={() => handleDelete(patient.id)}>
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== POPUP ===== */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Update Patient</h3>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="name"
                  value={selectedPatient.name}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })}
                  placeholder="Name"
                  required
                />
                <input
                  type="number"
                  name="age"
                  value={selectedPatient.age}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, age: e.target.value })}
                  placeholder="Age"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={selectedPatient.location}
                  onChange={(e) => setSelectedPatient({ ...selectedPatient, location: e.target.value })}
                  placeholder="Location"
                  required
                />
                <div className="popup-buttons">
                  <button type="submit" className="save-btn">Update</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowPopup(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayUser;
