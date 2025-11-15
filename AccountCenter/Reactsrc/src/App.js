import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddUser from "./components/Pages/AddUser";
import RemoveUser from "./components/Pages/RemoveUser";
import DisplayUser from "./components/Pages/DisplayUser";
import UpdateUser from "./components/Pages/UpdateUser";
import SearchUser from "./components/Pages/SearchUser";
import Login from "./components/UserAuth/Login";
import Signup from "./components/UserAuth/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Navbar />
                <div className="page-wrapper">
                  <Routes>
                    <Route path="/" element={<Navigate to="/display" replace />} />
                    <Route path="/add" element={<AddUser />} />
                    <Route path="/remove" element={<RemoveUser />} />
                    <Route path="/display" element={<DisplayUser />} />
                    <Route path="/update" element={<UpdateUser />} />
                    <Route path="/search" element={<SearchUser />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
