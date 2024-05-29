import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Authentification() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = e.target.elements;
        formData.email = email.value;
        formData.password = password.value;
        console.log('Form submitted', formData);

        axios.post("/checkUser", formData)
            .then((response) => {
                console.log('Response received', response.data);
                sessionStorage.setItem('userEmail', formData.email);
                navigate(`/Utilisateur`);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setError('Email or password is incorrect. Please try again or register.');
                } else {
                    console.error('Error:', error.message);
                    setError('Failed to authenticate. Please try again later.');
                }
            });
    };

    return (
        <section className="Authentification">
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./sprout.png" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Bienvenue</h2>
                    <form onSubmit={handleLogin}>
                        <div className="inputBox">
                            <span>Email</span>
                            <input type="email" name="email" />
                        </div>
                        <div className="inputBox">
                            <span>Mot de passe</span>
                            <input type="password" name="password" />
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Se connecter" />
                        </div>
                        <div className="inputBox">
                            <p>Vous n'avez pas de compte? <a href="/creeruncompte">Créer un compte</a>.</p>
                        </div>
                    </form>
                    <div className="back"> 
                        <a onClick={sessionStorage.removeItem('userEmail')} href="/">Retourner à la page principale</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Authentification;
