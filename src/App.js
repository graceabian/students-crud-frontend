import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import AddStudent from "./components/AddStudent";
import Student from "./components/Student";
import StudentsList from "./components/StudentsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/students" className="navbar-brand">
          Students App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/students"} className="nav-link">
              Students
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/create"} className="nav-link">
              Create
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<StudentsList />} />
          <Route exact path="/students" element={<StudentsList />} />
          <Route exact path="/create" element={<AddStudent />} />
          <Route path="/students/:id" element={<Student />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
