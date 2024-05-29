import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Importer la bibliothèque xlsx

function Prediction() {
  const [prediction, setPrediction] = useState('');

  const predictUsingRF = async () => {
    try {
      // Lire le fichier Excel
      const file = 'Crop_recommendation2.csv';
      const workbook = XLSX.readFile(file);
      
      // Obtenir les données de la première feuille
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convertir les données en format JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Traiter les données comme vous le souhaitez, par exemple, envoyer à l'API pour la prédiction
      // Ici, jsonData contient les données de votre fichier Excel sous forme d'objet JSON
      
      // Effectuer la prédiction en utilisant votre modèle RF, en utilisant les données extraites du fichier Excel
      
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  };

  return (
    <div>
      <h1>Prediction using Random Forest</h1>
      <button onClick={predictUsingRF}>Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default Prediction;
