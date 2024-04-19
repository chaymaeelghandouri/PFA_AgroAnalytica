import React from 'react';
import './styles.css'; 

function MainPage() {
    return (
        <div>
            <header>
                <div className='logo'>
                    <img src="./logo3.jpg" alt="logo" className="logoImg" />
                </div>
                <a href="#" className="logoname">AgroAnalytica</a>
                <ul className="navbar">
                    <li><a href="#">Acceuil</a></li>
                    <li><a href="#">A propos</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Connexion</a></li>
                </ul>
                <a href="#" className="btn-pour-créer">Créer un compte</a>
            </header>
            <div className="paragraph">
                <div>
                    AgroAnalytica est une application web innovante conçue pour répondre aux besoins des agriculteurs 
                    et des agronomes en matière d'analyse des caractéristiques du sol et de prédictions de cultures 
                    adaptées. Avec son interface intuitive et conviviale, AgroAnalytica offre un ensemble de fonctionnalités
                    puissantes pour optimiser les décisions agricoles et maximiser les rendements.
                </div>
                <div className="commence">
                    <span>Commencer</span>
                </div>
            </div>
            <div className="video-background">
                <div className="video-wrap">
                    <video autoPlay loop muted className="video">
                        <source src="./video5.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
