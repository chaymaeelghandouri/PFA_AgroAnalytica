import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const navigate = useNavigate();

    const handleSend = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, message } = e.target.elements;
        const newFormData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            message: message.value
        };
        console.log('Form submitted', newFormData);

        axios.post("/createMessage", newFormData)
            .then((response) => {
                console.log('Response received', response.data);
                navigate('/');
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
        <section className='ContactForm'>
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./sprout.png" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Contactez-nous</h2>
                    <form onSubmit={handleSend}>
                        <div className="inputBox1">
                            <span>Prénom</span>
                            <input type="text" name="firstName" />
                        </div>

                        <div className="inputBox1">
                            <span>Nom de famille</span>
                            <input type="text" name="lastName" />
                        </div>

                        <div className="inputBox1">
                            <span>Email</span>
                            <input type="email" name="email" />
                        </div>

                        <div className="inputBox2">
                            <span>Ecrit ton message</span>
                            <input type="text" name="message" />
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
