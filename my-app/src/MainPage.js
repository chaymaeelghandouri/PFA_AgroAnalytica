import React, { useRef, useEffect, useState } from 'react';
import './styles.css';

function MainPage() {
    //HADCHI ZDTOU BACH TKHDMNA LVIDEO FLWL PLUS BACH I9DR LWAHED YACTVER WLA YDESACTIVER SOT
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const handleVideoPlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(error => {
                console.error("La lecture automatique de la vidéo a échoué :", error);
            });
        }
    };
    
    const toggleVideoSound = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !video.muted;
            setIsMuted(video.muted);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleVideoPlay);

        return () => {
            document.removeEventListener('click', handleVideoPlay);
        };
    }, []);
    
    return (
        <div className='MainPage'>
            <section className='Navigation'>
                <div className='logo'>
                    <img src="./logo3.jpg" alt="logo" className="logoImg" />
                </div>

                <div className="logoname">AgroAnalytica</div>
                    <div className="navbar">
                        <a href="#Acceuil">Acceuil</a>
                        <a href="#Apropos">A propos</a>
                        <a href="#Contact">Contact</a>
                        <a href="Connexion">Connexion</a>
                        <a href="Créeruncompte">Créer un compte</a>
                    </div>
                    
            </section>

            <section id='Acceuil' className='Acceuil'>
                <div className="video-background">
                    <div className="video-wrap">
                        <video ref={videoRef} autoPlay className="video">
                            <source src="./video6.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div className="paragraph video-paragraph">
                    <div>
                        AgroAnalytica est une application web innovante conçue pour répondre aux besoins des agriculteurs 
                        et des agronomes en matière d'analyse des caractéristiques du sol et de prédictions de cultures 
                        adaptées. Avec son interface intuitive et conviviale, AgroAnalytica offre un ensemble de fonctionnalités
                        puissantes pour optimiser les décisions agricoles et maximiser les rendements.
                    </div>
                    <div className="commence">
                        <a href="Insert">Commencer</a>
                    </div>
                </div>
                <button onClick={() => toggleVideoSound()} className="sound-button">
                    {isMuted ? '🎵' : '🔇'}
                </button>
            </section>

            <section id='Apropos' className='Apropos'>
                <div className="titre">
                    <h1>Qu'elles sont nos services?</h1>
                </div> 
                <div className="flex-panel">
                    <article className="card">
                        <img src="./prop.webp" alt="image libghitiw hihi " />
                        <p>Une des principales contributions d'AgroAnalytica réside dans son aptitude à ameliorer les rendements agricoles.
                            Grace à des analyses détaillées des caractéristiques du sol, des conditions métérologiques et d'autres facteurs 
                            pertinents, notre application fournit des recommandations précises pour le choix des cultures, l'utilisation des 
                            engrais et des pesticides et la gestion de l'irrigation. En utilisant ces informations, les agriculteurs peuvent 
                            optimiser leur pratiques agricoles pour obtenir des rendementsplus élevés et plus cohérents, tout en réduisant les 
                            pertes de récolte.</p>
                    </article>
                    <article className="card">
                        <img src="./prop2.webp" alt="hhhhhhhh" />
                        <p>
                        Grâce à cette fonctionnalité, les agriculteurs peuvent cartographier et visualiser leurs champs, identifier les zones à haut rendement et les zones à risque, et prendre des décisions éclairées pour l'optimisation de leurs pratiques agricoles. De plus, notre système SIG facilite la planification stratégique en permettant aux utilisateurs de tracer des itinéraires d'irrigation efficaces, d'appliquer des techniques de gestion des cultures adaptées à des zones spécifiques et même de prévoir 
                        les risques potentiels liés aux catastrophes naturelles
                        </p>
                    </article>
                    <article className="card">
                        <img src="./prop3.webp" alt="hhhhhhhh" />
                        <p>
                        Notre chatbot en agriculture est votre assistant virtuel dédié, toujours prêt à répondre à vos questions et à vous fournir des conseils personnalisés pour améliorer vos pratiques agricoles. Que vous ayez besoin de recommandations sur les cultures à planter, des conseils sur la gestion des maladies des plantes, ou même des informations météorologiques pour prendre des décisions éclairées, notre chatbot est là pour vous aider, 24 heures sur 24, 7 jours sur 7
                        </p>
                    </article>
                </div>
            </section>

            <section id='Contact' className='Contact'>
                <div className='imgBox'>
                    <img src="./img.jpg" alt="image libghitiw hihi " />
                </div>
                <article className="card">
                    <h1>Tu as une question ?</h1>
                    <p>
                        Envoie nous un message et nous te répondrions dans les deux jours ouvrables. 
                        Ou envoie un courriel directement à 
                    </p>
                    <p className='mail'>support@AgroAnalytica.com.</p>
                    <p>
                        N'hésite pas à utiliser notre formulaire de contact sur cette page pour toute demande 
                        de renseignements.
                    </p> 
                    <a href="/Contact">Envoyer un message</a>
                </article>
            </section>

        </div>
    );
}

export default MainPage;
