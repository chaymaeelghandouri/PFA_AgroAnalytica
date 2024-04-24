import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Contact from './Contact';
import Register from './Register'
import Authentification from './authentification'
import Insert from './Insert';
import Utilisateur from './Utilisateur';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Créeruncompte" element={<Register />} />
        <Route path="/Connexion" element={<Authentification />} />
        <Route path="/Insert" element={<Insert />} />
        <Route path="/Utilisateur" element={<Utilisateur />} />
      </Routes>
    </Router>
  );
}

export default App;
