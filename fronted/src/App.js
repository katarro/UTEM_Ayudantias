// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import State from './components/state/State'; // Asegúrate de crear este componente
import Admin from './components/admin/Admin'
import Home from './components/home/Home';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AdminIn from './components/adminIn/AdminIn';
import PostulanteDetails from './components/postulanteDetails/PostulanteDetails';
import React from 'react';

function App() {
  return (
    <Router>
       <Header/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postular" element={<Register />} />
          <Route path="/estado" element={<State />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminin" element={<AdminIn/>}/>
          <Route path="/adminin/:rut" element={<PostulanteDetails />} />

        </Routes>
        <Footer/> 
    </Router>
  );
}

export default App;
