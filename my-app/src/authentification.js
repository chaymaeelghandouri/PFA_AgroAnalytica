import React from 'react';
import './styles.css';

function Authentification() {
    return (
        <section className="Authentification">
            <div className="imgBox">
                <img src="./img.jpg" alt="image" />
            </div>
            <div className='logo'>
                <img src="./logo3.jpg" alt="logo" className="logoImg" />
            </div>
            <div className="contentBox">
                <div className="formBox">
                    <h2>Welcome</h2>
                    <form action="#">
                        <div className="inputBox">
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="text" required /><br />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" type="text" required /><br />
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Connect" />
                        </div>
                        <div className="inputBox">
                            <p>Don't have an account? <a href="/Créeruncompte">Register here</a>.</p>
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

export default Authentification;
