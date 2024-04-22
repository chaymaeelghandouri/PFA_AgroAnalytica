import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function Contact() {
    //HAD LA PARTIE DLCODE ZDTHA BACH N9DROU NSTOCKEW FWZHED LFICHIER TEXTE DAKCHI LIGHADI Y3MR LUTILISATEUR FLFORMULAIRE
    //KHESNA NDIROU BHALHA T9RIBAN FAUTHENTIFICATION OU FREGISTER BACH N9DROU NSTOCKEW WAHD LUTILISATEUR FUNE BASE DE DONNEES
    const navigate = useNavigate();

    const handleSend = (event) => {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const data = `Prénom: ${firstName}\nNom: ${lastName}\nEmail: ${email}\nMessage: ${message}`;
        const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'message.txt';
        a.click();

        navigate('/');
    };

    return (
        <section className='ContactForm'>
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./sprout.png" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSend}>
                        <div className="inputBox1">
                            <span>Prénom</span>
                            <input type="text" id="firstName" />
                        </div>

                        <div className="inputBox1">
                            <span>Nom de famille</span>
                            <input type="text" id="lastName" />
                        </div>

                        <div className="inputBox1">
                            <span>Email</span>
                            <input type="email" id="email" />
                        </div>

                        <div className="inputBox2">
                            <span>Ecrit ton message</span>
                            <input type="text" id="message" />
                        </div>

                        <div className="inputBox1">
                            <input type="submit" value="Envoyer" />
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

export default Contact;
