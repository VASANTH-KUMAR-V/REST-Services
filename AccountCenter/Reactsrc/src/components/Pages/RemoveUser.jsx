// src/components/RemoveUser.jsx
import React, { useState } from "react";
import { deletePatient } from "../../api/Crudapi";
import "../../styles/DisplayUser.css";

const RemoveUser = ({ patientId, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await deletePatient(patientId);
      setMessage("✅ Patient removed successfully!");
      setTimeout(() => {
        setMessage("");
        onSuccess();
      }, 1500);
    } catch (err) {
      setMessage(`❌ Failed to delete patient: ${err.message}`);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Confirm Delete</h3>
        {message && <p className="success-message">{message}</p>}
        {!message && (
          <>
            <p>Are you sure you want to remove this patient?</p>
            <div className="popup-buttons">
              <button
                onClick={handleConfirm}
                className="save-btn"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
              <button onClick={onCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RemoveUser;
