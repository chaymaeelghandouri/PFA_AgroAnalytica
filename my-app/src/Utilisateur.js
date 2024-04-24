import React, { useState } from 'react';
import './styles1.css';

function Utilisateur() {
    const [activeSection, setActiveSection] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleButtonClick = (sectionId) => {
        setActiveSection(sectionId);
    };

    function toggleProfileButton() {
        var button = document.getElementById("profileButton");
    
        if (button.style.display === "block" || button.style.display === "") {
            button.style.display = "none";
        } else {
            button.style.display = "block";
        }
    }

    const handleSendMessage = () => {
        const inputElement = document.querySelector('#ChatBot input');
        const message = inputElement.value;
    
        const chatMessages = document.querySelector('.chat-messages');
        const newMessageElement = document.createElement('div');
        newMessageElement.textContent = `You: ${message}`;
        chatMessages.appendChild(newMessageElement);
    
        inputElement.value = '';
    };

    return (
        <div onLoad={() => handleButtonClick('Presentation')} className='Utilisateur'>
            <section className='Navigation'>
                <div className='logo'>
                    <img src="./sprout.png" alt="logo" className="logoImg" />
                </div>
                <div className='navbox'>
                    <div className="username">
                        <img onClick={() => handleButtonClick('Profile')} src="./edit.png" alt="Profile" className="icon" />
                        <span>User</span>
                    </div>
                    <div className="logoname">
                        <button onClick={() => handleButtonClick('Presentation')} data-text="AgroAnalytica">
                            AgroAnalytica
                        </button>
                    </div>
                    <div className="navbar">
                        <button onClick={() => window.location.href="/"} data-text="Accueil">
                            <img src="./home.png" alt="Accueil" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('Analyses')} data-text="Analyses">
                            <img src="./field.png" alt="Analyses" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('Dashboard')} data-text="Dashboard">
                            <img src="./dashboard.png" alt="Dashboard" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('SIG')} data-text="Système d'information géographique">
                            <img src="./land.png" alt="SIG" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('ChatBot')} data-text="ChatBot">
                            <img src="./chatbot.png" alt="ChatBot" className="icon" />
                        </button>
                    </div>
                </div>
            </section>
            <section className='Content'>
                <section  id='Presentation'  className={`Presentation ${activeSection !== 'Presentation' ? 'section-hidden' : 'section-visible'}`}>
                    <div className="flex-panel">
                        <article className="card">
                            <h1>Bienvenue sur AgroAnalytica !</h1>
                            <p>🌱 Effectuez une Analyse pour Optimiser Vos Rendements Agricoles !
                                Cher agriculteur,Pour maximiser vos rendements et améliorer la santé de vos cultures, il est crucial d'avoir
                                une compréhension claire et détaillée de votre sol et de ses caractéristiques.
                                Une analyse précise vous permettra de :</p>
                            <p>🌾 Comprendre Votre Sol : Découvrez la composition de votre sol, son pH, sa teneur en nutriments et bien plus encore.</p>
                            <p> 💧 Gérer l'Irrigation : Optimisez l'utilisation de l'eau en comprenant les besoins spécifiques de votre sol.</p>
                            <p>🌡️ Adapter Vos Pratiques : Recevez des recommandations personnalisées sur le choix des cultures, l'utilisation des engrais et des pesticides.</p>
                            <p>
                                AgroAnalytica est là pour vous aider dans ce processus. Notre plateforme vous offre des analyses détaillées et des recommandations précises pour
                                vous guider dans la prise de décisions éclairées pour votre exploitation agricole.
                                Commencez dès aujourd'hui votre analyse avec AgroAnalytica et donnez à vos cultures le meilleur environnement pour prospérer !
                                Vous n'avez pas encore de champs !
                                Ajoutez un nouveau champ pour commencer.
                            </p>
                            <div className="commence">
                                <a onClick={() => handleButtonClick('Analyses')}>Faire une analyse</a>
                            </div>
                        </article>
                    </div>
                </section>
                <section id='Analyses' className={`Analyses ${activeSection === 'Analyses' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Analyses 📊</div>
                    <div className='flexbox'>
                        <div className='left'>
                            <div className='message'>Débutez votre analyse en insérant des caractéristiques sur votre analyse !</div>
                            <button onClick={() => window.location.href="/Insert"} className='bouton'>➕</button>
                        </div>
                        <div className='rigth'>
                            <div className='message'>Voici l'historique d'analyses! Si vous souhaitez revoire une ancienne analyse télécharger le rapport!</div>
                            <button onClick={toggleProfileButton} className='bouton'>📜</button>
                            <article id='profileButton' className="card">
                                <div>Nom de l'analyse 1</div>
                                <a href="./test.pdf" download>
                                    <button className='bouton'>Télécharger le rapport 📥</button>
                                </a>
                                <div>Nom de l'analyse 2</div>
                                <a href="/path_to_your_file2.pdf" download>
                                    <button className='bouton'>Télécharger le rapport 📥</button>
                                </a>
                            </article>
                        </div>
                    </div>
                    {prediction && <div>Prédiction: {prediction}</div>} {/* Afficher la prédiction ici */}
                </section>
                <section id='Dashboard' className={`Dashboard ${activeSection === 'Dashboard' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Dashboard 📈</div>

                </section>
                <section id='SIG' className={`SIG ${activeSection === 'SIG' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Système d'information géographique 🌎</div>
                </section>
                <section id='ChatBot' className={`ChatBot ${activeSection === 'ChatBot' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">ChatBot 💬</div>
                    <div className="chat-messages">
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Type your message..." />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </section>
                <section id='Profile' className={`Profile ${activeSection === 'Profile' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Profile 👱‍♂️</div>
                </section>
            </section>
        </div>
    );
}

export default Utilisateur;
