// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import State from './components/state/State'; // Asegúrate de crear este componente
import Admin from './components/admin/Admin'
import Home from './components/home/Home';
import React from 'react';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  return (
    <Router>
       <Header/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postular" element={<Register />} />
          <Route path="/estado" element={<State />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer/> 
    </Router>
  );
}

export default App;
