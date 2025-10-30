// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/signup";
// import "./styles/auth.css"; // common css for both

// function App() {
//   return (
//     <Router>
//       <div className="auth-wrapper">
//         <nav className="auth-nav">
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Signup</Link>
//         </nav>

//         <div className="auth-container">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="*" element={<Login />} /> {/* Default route */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddUser from "./components/Pages/AddUser";
import RemoveUser from "./components/Pages/RemoveUser";
import DisplayUser from "./components/Pages/DisplayUser";
import UpdateUser from "./components/Pages/UpdateUser";
import SearchUser from "./components/Pages/SearchUser";
import "./App.css"; // global app-level CSS

function App() {
  return (
    <Router>
      <Navbar />
      {/* Page content wrapper to isolate page styles from navbar */}
      <div className="page-wrapper">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/add" />} />
          
          {/* CRUD routes */}
          <Route path="/add" element={<AddUser />} />
          <Route path="/remove" element={<RemoveUser />} />
          <Route path="/display" element={<DisplayUser />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/search" element={<SearchUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
