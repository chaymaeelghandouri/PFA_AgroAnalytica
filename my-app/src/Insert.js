import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

function Insert({ navigateToDashboard }) {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
        label: ''
    });

    const [predictionMessageStyle, setPredictionMessageStyle] = useState({
        display: 'none', 
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightgray',
        color: 'green',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: '999',
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { N, P, K, temperature, humidity, ph, rainfall } = e.target.elements;
        const newFormData = {
            N: N.value,
            P: P.value,
            K: K.value,
            temperature: temperature.value,
            humidity: humidity.value,
            ph: ph.value,
            rainfall: rainfall.value
        };
        console.log('Form submitted', newFormData);
    
        setPredictionMessageStyle({ ...predictionMessageStyle, display: 'block' });
    
        axios.post("/predict", newFormData)
            .then((response) => {
                console.log('Response received', response.data);
                navigateToDashboard(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response);
                } else {
                    console.error('Error:', error.message);
                }
            })
            .finally(() => {
                // Effacez le message après un certain délai
                setTimeout(() => {
                    setPredictionMessageStyle({ ...predictionMessageStyle, display: 'none' });
                }, 3000); // 3000 millisecondes = 3 secondes (ajustez selon vos besoins)
            });
    };

    return (
        <div className="insert">
            <div className="form-container">
                <div id="prediction-message" style={predictionMessageStyle}>
                    Prediction en cours d'exécution...
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Azote (N):
                        <input type="text" name="N"/>
                    </label>
                    <label>
                        Phosphore (P):
                        <input type="text" name="P"/>
                    </label>
                    <label>
                        Potassium (K):
                        <input type="text" name="K"/>
                    </label>
                    <label>
                        Temperature:
                        <input type="text" name="temperature"/>
                    </label>
                    <label>
                        Humidity:
                        <input type="text" name="humidity"/>
                    </label>
                    <label>
                        pH:
                        <input type="text" name="ph"/>
                    </label>
                    <label>
                        Rainfall:
                        <input type="text" name="rainfall"/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Insert;
