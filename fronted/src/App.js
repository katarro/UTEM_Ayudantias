// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import State from "./components/state/State"; // Asegúrate de crear este componente
import Admin from "./components/admin/Admin";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AdminIn from "./components/adminIn/AdminIn";
import ProfesorIn from "./components/profesorin/ProfesorIn";
import LoginProfesor from "./components/profesor/LoginProfesor";
import PostulanteDetails from "./components/postulanteDetails/PostulanteDetails";
import PostulanteProfesor from "./components/postulanteDetailsProfesor/PostulanteProfesor";
import React from "react";
import "./App.css";

function App() {
  return (
    <body>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postular" element={<Register />} />
          <Route path="/estado" element={<State />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminin" element={<AdminIn />} />
          <Route path="/adminin/:rut" element={<PostulanteDetails />} />
          <Route path="/login-profesor" element={<LoginProfesor />} />
          <Route path="/profesorin" element={<ProfesorIn />} />
          <Route path="/profesorin/:rut" element={<PostulanteProfesor />} />
        </Routes>
        <Footer />
      </Router>
    </body>
  );
}

export default App;
