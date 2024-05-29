import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Contact from './Contact';
import Register from './Register'
import Authentification from './authentification'
import Insert from './Insert';
import Utilisateur from './Utilisateur';
import Prediction from './Prediction'; 
import UserProfile from './Profile';
import Categorie from './Categorie';
import Panier from './Panier';

function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/creeruncompte" element={<Register/>} />
        <Route path="/Connexion" element={<Authentification />} />
        <Route path="/Insert" element={<Insert />} />
        <Route path="/Utilisateur" element={<Utilisateur />} />
        <Route path="/Prediction" element={<Prediction />} /> 
        <Route path="/UserProfile/:userId" element={<UserProfile />} />
        <Route path="/Categorie" element={<Categorie />} />
        <Route path="/Panier" element={<Panier />} />
      </Routes>
    </Router>
  );
}

export default App;
