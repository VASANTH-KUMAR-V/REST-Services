import React, { useState } from "react";
import {
  searchPatientByName,
  searchPatientByEmail,
  searchPatientByLocation,
} from "../../api/Crudapi";
import "../../styles/SearchUser.css";

const SearchUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      if (!name && !email && !location) {
        setError("Please enter at least one search criteria.");
        setLoading(false);
        return;
      }

      // Fetch data for each field individually
      const promises = [];
      if (name) promises.push(searchPatientByName(name));
      if (email) promises.push(searchPatientByEmail(email));
      if (location) promises.push(searchPatientByLocation(location));

      const responses = await Promise.all(promises);

      // Flatten results
      let combinedResults = responses.flat();

      // Remove duplicates using patient ID or email as key
      const uniqueMap = new Map();
      combinedResults.forEach((patient) => {
        const key = patient.id || patient.email; // unique key
        if (!uniqueMap.has(key)) uniqueMap.set(key, patient);
      });
      combinedResults = Array.from(uniqueMap.values());

      // Filter results to match all entered criteria
      combinedResults = combinedResults.filter((patient) => {
        return (
          (!name || patient.name.toLowerCase().includes(name.toLowerCase())) &&
          (!email || patient.email.toLowerCase().includes(email.toLowerCase())) &&
          (!location || patient.location.toLowerCase().includes(location.toLowerCase()))
        );
      });

      if (combinedResults.length === 0) {
        setError("No patients found.");
      } else {
        setResults(combinedResults);
      }
    } catch (err) {
      setError(`Search failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <h2>Search Patients</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        {results.length > 0 && (
          <div className="table-container">
            <h3>Search Results</h3>
            <table className="results-table">
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
                {results.map((patient, index) => (
                  <tr key={patient.id || index}>
                    <td>{patient.id || "-"}</td>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.age}</td>
                    <td>{patient.mobile || "-"}</td>
                    <td>{patient.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
