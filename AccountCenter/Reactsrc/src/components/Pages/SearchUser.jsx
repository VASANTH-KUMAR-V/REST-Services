import React, { useState } from "react";
import "./Common.css";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Dummy example
    setResult({ name: "Alice", email: "alice@example.com" });
  };

  return (
    <div className="page-wrapper">
      <div className="page">
        <h2>Search User</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Name or Email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>

        {result && (
          <ul>
            <li>
              <strong>{result.name}</strong> — {result.email}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
