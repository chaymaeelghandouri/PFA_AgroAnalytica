import React from 'react';
import './styles.css'; 

function Formulaire() {
    return (
        <section className='Register'>
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./sprout.png" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Créer un compte</h2>
                    <form action="#">
                        <div className="inputBox">
                            <span>Organisation</span>
                            <input type="text" />
                        </div>

                        <div className="inputBox">
                            <span>Prénom</span>
                            <input type="text" />
                        </div>

                        <div className="inputBox">
                            <span>Nom de famille</span>
                            <input type="text" />
                        </div>

                        <div className="inputBox">
                            <span>Email</span>
                            <input type="email" />
                        </div>

                        <div className="inputBox">
                            <span>Mot de passe</span>
                            <input type="password" />
                        </div>

                        <div className="inputBox">
                            <a type="submit" href="/Utilisateur">Créer un compte</a>
                        </div>

                        <div className="inputBox">
                            <p>Ou <a href="/Connexion">Connectez-vous à votre compte</a></p>
                        </div>
                    </form>
                    <div className="back"> 
                        <a href="/">Retourner à la page principale</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Formulaire;
