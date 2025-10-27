import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";
import "./styles/auth.css"; // common css for both

function App() {
  return (
    <Router>
      <div className="auth-wrapper">
        <nav className="auth-nav">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>

        <div className="auth-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
