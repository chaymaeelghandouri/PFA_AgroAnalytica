import React, { useState } from 'react';
import './styles.css';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";

function Insert() {
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
    const [polygonCoords, setPolygonCoords] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidInput()) {
            alert('Veuillez entrer des valeurs numériques valides.');
            return;
        }
        
        const data = {
            ...formData,
            N: parseFloat(formData.N),
            P: parseFloat(formData.P),
            K: parseFloat(formData.K),
            temperature: parseFloat(formData.temperature),
            humidity: parseFloat(formData.humidity),
            ph: parseFloat(formData.ph),
            rainfall: parseFloat(formData.rainfall)
        };

        try {
            const response = await axios.post('http://localhost:3000/predict', data);
            const { prediction } = response.data;
            setFormData({ ...formData, label: prediction[7] }); 
        } catch (error) {
            alert('Erreur lors de la prédiction. Veuillez réessayer.');
        }
    };

    const isValidInput = () => {
        const { N, P, K, temperature, humidity, ph, rainfall } = formData;
        return !isNaN(N) && !isNaN(P) && !isNaN(K) && !isNaN(temperature) && !isNaN(humidity) && !isNaN(ph) && !isNaN(rainfall);
    };

    const handleMapClick = (event) => {
        const { latlng } = event;
        const { lat, lng } = latlng;
        setPolygonCoords([...polygonCoords, [lat, lng]]);
    };

    return (
        <div className="insert">
            <div className="form-container">
                <header>Insert Data</header>
                <form onSubmit={handleSubmit}>
                    <label>
                        Azote (N):
                        <input type="text" name="N" value={formData.N} onChange={handleChange} />
                    </label>
                    <label>
                        Phosphore (P):
                        <input type="text" name="P" value={formData.P} onChange={handleChange} />
                    </label>
                    <label>
                        Potassium (K):
                        <input type="text" name="K" value={formData.K} onChange={handleChange} />
                    </label>
                    <label>
                        Temperature:
                        <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} />
                    </label>
                    <label>
                        Humidity:
                        <input type="text" name="humidity" value={formData.humidity} onChange={handleChange} />
                    </label>
                    <label>
                        pH:
                        <input type="text" name="ph" value={formData.ph} onChange={handleChange} />
                    </label>
                    <label>
                        Rainfall:
                        <input type="text" name="rainfall" value={formData.rainfall} onChange={handleChange} />
                    </label>
                    <label>
                        Culture:
                        <input type="text" name="label" value={formData.label} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="map-container">
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }} onClick={handleMapClick}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Polygon positions={polygonCoords} />
                </MapContainer>
            </div>
        </div>
    );
}

export default Insert;
