import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import State from "./components/state/State";
import Admin from "./components/admin/Admin";
import AdminIn from "./components/adminIn/AdminIn";
import Register from "./components/register/Register";
import Profesor from "./components/profesorin/Profesor";
import Requisitos from "./components/requisitos/Requisitos";
import LoginProfesor from "./components/profesor/LoginProfesor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequisitosAdmin from "./components/requisitosAdmin/RequisitosAdmin";
import PostulanteDetails from "./components/postulanteDetails/PostulanteDetails";
import RegistarProfesor from "./components/registrar-profesor/RegistrarProfesor";
import PostulanteProfesor from "./components/postulanteDetailsProfesor/PostulanteProfesor";
import RutaProtegida from "./RutaProtegida";
import RutaProtegidaAdmin from "./RutaProtegidaAdmin";
import RutaProtegidaAmbos from "./RutaProtegidaAmbos";
import CambiarPassword from "./components/cambiarPassword/CambiarPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requisitos" element={<Requisitos />} />
          <Route path="/postular" element={<Register />} />
          <Route path="/estado" element={<State />} />
          <Route path="/login" element={<Admin />} />

          <Route
            path="/cambiar-contrasena"
            element={
              <RutaProtegidaAmbos>
                <CambiarPassword />
              </RutaProtegidaAmbos>
            }
          />

          <Route path="/requisitos-admin" element={<RequisitosAdmin />} />

          <Route
            path="/admin"
            element={
              <RutaProtegidaAdmin>
                <AdminIn />
              </RutaProtegidaAdmin>
            }
          />

          <Route
            path="/admin/registrar-profesor"
            element={
              <RutaProtegidaAdmin>
                <RegistarProfesor />
              </RutaProtegidaAdmin>
            }
          />

          <Route
            path="/adminin/:rut"
            element={
                <PostulanteDetails />
            }
          />
          <Route
            path="/adminin/:rut"
            element={
              <RutaProtegidaAdmin>
                <PostulanteDetails />
              </RutaProtegidaAdmin>
            }
          />

          <Route path="/login-profesor" element={<LoginProfesor />} />

          <Route
            path="/profesor"
            element={
              <RutaProtegida>
                <Profesor />
              </RutaProtegida>
            }
          />

          <Route
            path="/profesor/:rut"
            element={
              <RutaProtegida>
                <PostulanteProfesor />
              </RutaProtegida>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
