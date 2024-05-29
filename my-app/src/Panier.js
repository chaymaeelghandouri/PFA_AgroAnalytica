import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './styles.css';

function Panier() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        Adresse: '',
        produits: []
    });

    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (location && location.state) {
            setItems(location.state);
            setFormData((prevData) => ({
                ...prevData,
                produits: location.state
            }));
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.Adresse) {
            setError('All fields are required.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            console.log("formdata",formData)
            const response = await axios.post("/createCommande", formData);
            console.log('Response received', response.data);
            navigate('/Utilisateur');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                setError('Error submitting form. Please try again.');
            } else {
                console.error('Error:', error.message);
                setError('Error submitting form. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="Panier">
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./sprout.png" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Panier</h2>
                    {items.length ? (
                        <ul>
                            {items.map((item) => (
                                <li key={item.id}>
                                    {item.name} - {item.price}$
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Votre panier est vide.</p>
                    )}
                    <p>Veuillez remplir ces informations pour compléter votre commande!</p>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSend}>
                        <div className="inputBox1">
                            <span>Prénom</span>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>

                        <div className="inputBox1">
                            <span>Nom de famille</span>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>

                        <div className="inputBox1">
                            <span>Email</span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="inputBox2">
                            <span>Adresse</span>
                            <input type="text" name="Adresse" value={formData.Adresse} onChange={handleChange} />
                        </div>

                        <div className="inputBox1">
                            <input type="submit" value="Envoyer" disabled={isSubmitting} />
                        </div>
                    </form>
                    <div className="back">
                        <Link to="/Categorie">Retour aux produits</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Panier;
