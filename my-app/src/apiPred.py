from flask import Flask, request, jsonify
import joblib
import pandas as pd
import logging
from logging import FileHandler
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
app.logger.addHandler(FileHandler('log.txt'))
app.secret_key = "@2024PFA"

# Charger le modèle pré-entraîné et l'encodeur de label
model = joblib.load('path_to_your_model.pkl')
encoder = joblib.load('path_to_your_encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    
    # Extraire les caractéristiques de la requête JSON
    N =  request.form.get('N')
    P =  request.form.get('P')
    K =  request.form.get('K')
    temperature =  request.form.get('temperature')
    humidity =  request.form.get('humidity')
    ph =  request.form.get('ph')
    rainfall =  request.form.get('rainfall')
    
    # Vérifier si toutes les caractéristiques sont présentes
    if None in [N, P, K, temperature, humidity, ph, rainfall]:
        return jsonify({'error': 'Missing required features'}), 400
    
    # Créer un DataFrame avec les caractéristiques
    features_df = pd.DataFrame({
        'N': [N],
        'P': [P],
        'K': [K],
        'temperature': [temperature],
        'humidity': [humidity],
        'ph': [ph],
        'rainfall': [rainfall]
    })
    
    # Faire la prédiction
    prediction = model.predict(features_df)
    predicted_label = encoder.inverse_transform(prediction)[0]
    
    return jsonify({'prediction': predicted_label}), 200



if __name__ == '__main__':
    app.run(debug=True)