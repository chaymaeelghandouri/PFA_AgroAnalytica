import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Formulaire() {
    const [formData, setFormData] = useState({
        organisation: '',
        prenom: '',
        nom: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { organisation, prenom, nom, email, password } = e.target.elements;
        formData.organisation = organisation.value;
        formData.prenom = prenom.value;
        formData.nom = nom.value;
        formData.email = email.value;
        formData.password =  password.value;
        console.log('Form submitted', formData);

        axios.post("/createUser", formData)
            .then((response) => {
                console.log('Response received', response.data);
                sessionStorage.setItem('userEmail', formData.email);
                navigate('/Utilisateur'); 
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response);
                } else {
                    console.error('Error:', error.message);
                }
            });
    };

    return (
        <section className='Register'>
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./logo3.jpg" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Créer un compte</h2>
                    <form onSubmit={handleSubmit}> 
                        <div className="inputBox">
                            <span>Organisation</span>
                            <input type="text" name="organisation" />
                        </div>

                        <div className="inputBox">
                            <span>Prénom</span>
                            <input type="text" name="prenom" />
                        </div>

                        <div className="inputBox">
                            <span>Nom de famille</span>
                            <input type="text" name="nom" />
                        </div>

                        <div className="inputBox">
                            <span>Email</span>
                            <input type="email" name="email" />
                        </div>

                        <div className="inputBox">
                            <span>Mot de passe</span>
                            <input type="password" name="password" />
                        </div>

                        <div className="inputBox">
                            <input type="submit" value="Créer un compte" /> 
                        </div>

                        <div className="inputBox">
                            <p>Ou <a onClick={sessionStorage.removeItem('userEmail')} href="/">Retourner à la page principale</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Formulaire;
