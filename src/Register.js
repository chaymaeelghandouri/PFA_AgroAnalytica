import React from 'react';
import './styles.css'; 

function Formulaire() {
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
                            <input type="submit" value="Créer un compte" />
                        </div>

                        <div className="inputBox">
                            <p>Ou <a href="#">Connectez-vous à votre compte</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Formulaire;
