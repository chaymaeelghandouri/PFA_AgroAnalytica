import React, { useState, useEffect } from 'react';
import './styles1.css';
import Insert from './Insert';
import axios from "axios";

function Utilisateur() {
    const [activeSection, setActiveSection] = useState('Presentation');
    const [messages, setMessages] = useState([]);
    const [plotFiles, setPlotFiles] = useState([]);
    const [predictionResult, setPredictionResult] = useState(null);
    const [modalImage, setModalImage] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

  
    const [user, setUser] = useState(null);
    const [userExists, setUserExists] = useState(null);
    
    useEffect(() => {
        const userEmail = sessionStorage.getItem('userEmail');
        const [username, domain] = userEmail.split('@');
        const [firstName] = username.split(' ');
        setUser(firstName);

        axios.get(`/getuser/${userEmail}`)
            .then(response => {
                if (response.data) {
                    setUserExists(response.data);
                } else {
                    setUserExists(null);
                }
            })
            .catch(error => {
                console.error('Error checking user:', error);
                setUserExists(null);
            });
    }, [user]);


    const handleButtonClick = (sectionId) => {
        setActiveSection(sectionId);
        if (sectionId === 'Dashboard') {
            fetch('/getdashboard')
                .then(response => response.json())
                .then(data => setPlotFiles(data))
                .catch(error => console.error('Error fetching plot files:', error));
        }
    };

    const handleSendMessage = () => {
        const inputElement = document.querySelector('#ChatBot input');
        const message = inputElement.value;

        if (message.trim() === '') return;

        const newMessages = [...messages, { sender: 'You', text: message }];
        
        const chatbotResponse = generateChatbotResponse(message);
        newMessages.push({ sender: 'Chatbot', text: chatbotResponse });
        
        setMessages(newMessages);
        inputElement.value = '';
    };

    const generateChatbotResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase();
    
        if (lowerCaseMessage.includes('bonjour')) {
            return "Bonjour!";
        } else if (lowerCaseMessage.includes('posez une question')) {
            return "Oui, je suis là pour répondre à vos questions sur l'agriculture. Qu'aimeriez-vous savoir ?";
        } else if (lowerCaseMessage.includes('comment') && lowerCaseMessage.includes('agroanalytica') && lowerCaseMessage.includes('prédit')) {
            return `AgroAnalytica combine la collecte de données précises, une analyse approfondie des caractéristiques du sol et 
            l'utilisation de modèles de machine learning pour fournir des recommandations de culture personnalisées, visant à optimiser 
            les rendements agricoles et à améliorer la durabilité des pratiques agricoles.`;
        } else if (lowerCaseMessage.includes('type') && lowerCaseMessage.includes('données') && lowerCaseMessage.includes('analyse') && lowerCaseMessage.includes('sol')) {
            return `Pour obtenir une analyse complète du sol, vous devrez généralement fournir les types de données suivants :
            Composition Chimique du Sol: Cela inclut les niveaux de nutriments essentiels tels que l'azote (N), le phosphore (P) et le potassium (K), 
            ainsi que d'autres éléments comme le calcium, le magnésium et le soufre. Ces données sont cruciales pour évaluer la fertilité du sol et 
            déterminer les besoins en amendements.`;
        } else if (lowerCaseMessage.includes('recommendations de cultures') && lowerCaseMessage.includes('peuvent') && lowerCaseMessage.includes('aider') && lowerCaseMessage.includes('maximiser') && lowerCaseMessage.includes('rendements')) {
            return `Les recommandations de cultures fournies par AgroAnalytica peuvent grandement aider à maximiser les rendements agricoles en 
            vous fournissant des informations précises sur les cultures les mieux adaptées à votre sol et aux conditions locales. En utilisant des données 
            analytiques et des modèles de machine learning, AgroAnalytica vous aide à prendre des décisions éclairées qui optimisent l'utilisation des ressources 
            et améliorent la productivité globale.`;
        } else if (lowerCaseMessage.includes('principales fonctionnalités') && lowerCaseMessage.includes('agroanalytica') ) {
            return `Les principales fonctionnalités d'AgroAnalytica incluent :
            Analyse des Caractéristiques du Sol : Évaluation détaillée des niveaux de nutriments (N, P, K), du pH, de la texture du sol et de ses propriétés physiques. 
            Prédiction de Cultures Adaptées : Utilisation de modèles de machine learning pour recommander les cultures les mieux adaptées aux conditions spécifiques du sol et du climat. 
            Gestion des Intrants : Conseils sur l'application optimale de fertilisants et d'amendements pour améliorer la fertilité du sol et maximiser les rendements.`;
        
        } else if (lowerCaseMessage.includes('comparer prédictions') && lowerCaseMessage.includes('différentes cultures') ) {
            return `Oui, AgroAnalytica permet de comparer les prédictions de différentes cultures. En fournissant les caractéristiques spécifiques de votre sol, l'application peut générer 
            des prédictions pour plusieurs types de cultures. Vous pourrez alors voir quelles cultures sont les mieux adaptées à votre sol et conditions climatiques, et comparer leurs performances 
            attendues. Cela vous aide à prendre des décisions éclairées sur les cultures à planter pour maximiser les rendements et la rentabilité.`;
        } else if(lowerCaseMessage.includes('merci au revoir') ){
            return "Au revoir! Si vous avez d'autres questions, n'hésitez pas à me le demander.";
        } else if (lowerCaseMessage.includes('afrique')) {
            return `En Afrique, selon la région, vous pouvez cultiver des cultures telles que :
            - Afrique du Nord : Olives, agrumes, légumes, céréales.
            - Afrique de l'Ouest : Millet, sorgho, maïs, riz, arachides.
            - Afrique de l'Est : Café, thé, maïs, blé, sorgho.
            - Afrique Centrale : Manioc, bananes plantains, maïs, cacao.
            - Afrique Australe : Maïs, tabac, coton, blé, soja.`;
        } else if (lowerCaseMessage.includes('asie')) {
            return `En Asie, les cultures varient largement selon les régions :
            - Asie de l'Est : Riz, soja, thé, légumes.
            - Asie du Sud : Riz, blé, canne à sucre, coton.
            - Asie du Sud-Est : Riz, huile de palme, caoutchouc, café.
            - Asie Centrale : Blé, coton, fruits secs, légumes.`;
        } else if (lowerCaseMessage.includes('amérique')) {
            return `En Amérique, les cultures varient par région :
            - Amérique du Nord : Maïs, blé, soja, pommes de terre, coton.
            - Amérique Centrale : Maïs, café, bananes, canne à sucre.
            - Amérique du Sud : Café, soja, maïs, blé, canne à sucre.`;
        } else if (lowerCaseMessage.includes('europe')) {
            return `En Europe, les cultures varient selon les régions :
            - Europe du Nord : Blé, orge, avoine, pommes de terre, légumes.
            - Europe de l'Ouest : Blé, maïs, betteraves sucrières, légumes.
            - Europe du Sud : Olives, agrumes, vignes, légumes.
            - Europe de l'Est : Blé, maïs, tournesol, betteraves sucrières.`;
        } else {
            return "Je suis un chatbot et je ne comprends pas votre question. Pouvez-vous reformuler ?";
        }
    };
    
    const toggleProfileButton = () => {
        const button = document.getElementById("profileButton");
        button.style.display = button.style.display === "block" || button.style.display === "" ? "none" : "block";
    };

    const navigateToDashboard = (result) => {
        setActiveSection('Dashboard');
        setPredictionResult(result);
    };

    const scrollImages = (direction) => {
        const container = document.querySelector('.image-container');
        const scrollAmount = 300;

        if (direction === 'left') {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else if (direction === 'right') {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const openFullScreenImage = (imageSrc) => {
        setModalImage(imageSrc);
        setActiveSection('Dashboard');
        setModalOpen(true);
    };
    
    const closeFullScreenImage = () => {
        setModalImage(null);
        setModalOpen(false);
    };
    
    return (
        <div onLoad={() => handleButtonClick('Presentation')} className='Utilisateur'>
            <section className='Navigation'>
                <div className='logo'>
                    <img src="../sprout.png" alt="logo" className="logoImg" />
                </div>
                <div className='navbox'>
                    <div className="username">
                        <img onClick={() => handleButtonClick('Profile')} src="../edit.png" alt="Profile" className="icon" />
                        <span>{user}</span>
                    </div>
                    <div className="logoname">
                        <button onClick={() => handleButtonClick('Presentation')} data-text="AgroAnalytica">
                            AgroAnalytica
                        </button>
                    </div>
                    <div className="navbar">
                        <button onClick={() => window.location.href="/" } data-text="Accueil">
                            <img src="../home.png" alt="Accueil" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('Analyses')} data-text="Analyses">
                            <img src="../field.png" alt="Analyses" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('Dashboard')} data-text="Dashboard">
                            <img src="../dashboard.png" alt="Dashboard" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('capteur')} data-text="les capteurs">
                            <img src="../acheter.png" alt="capteur" className="icon" />
                        </button>
                        <button onClick={() => handleButtonClick('ChatBot')} data-text="ChatBot">
                            <img src="../chatbot.png" alt="ChatBot" className="icon" />
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
                            <Insert navigateToDashboard={navigateToDashboard} />
                        </div>
                        <div className='rigth'>
                            <div className='message'>Débutez votre analyse en insérant des caractéristiques sur celle-ci ! Ces caractéristiques correspond au taux de ph, température, azote, etc... Vous devez remplir ces champs d'aprés les donnéees que vous receviez à l'aide des capteurs IoT planté dans votre sol. </div>
                            <div className='message'>Si vous ne disposez pas de capteurs IoT, veuillez passer une demande afin que notre équipe puisse vous dotez de cels-ci pour pouvoir procéder à analyser les caractéristiques de votre sol! </div>
                            <a href="/Contact" className='demande'>Envoyer une demande</a>
                            <div className='message'>Consulter vos anciennes analyses! Si vous souhaitez revoire une ancienne analyse télécharger le rapport!</div>
                            <button onClick={toggleProfileButton} className='bouton'>📜</button>
                            <article id='profileButton' className="card">
                                <div>rapport 1</div>
                                <a href="./rapport.pdf" download>
                                    <button className='bouton'>Télécharger le rapport 📥</button>
                                </a>
                                <div>rapport 2</div>
                                <a href="/rapport.pdf" download>
                                    <button className='bouton'>Télécharger le rapport 📥</button>
                                </a>
                            </article>
                        </div>
                    </div>
                </section>
                <section id='Dashboard' className={`Dashboard ${activeSection === 'Dashboard' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Dashboard 📈</div>
                    {!predictionResult && (
                        <div className='introduction'>
                            <div className='message'>
                                Si vous voulez savoir qu'elle genre de culture est apropriée à votre sol, veuillez commencer par éffectuer une analyse!!
                            </div>
                            <div className='message'>
                                Si vous n'avez pas encore éffectuer une analyse clicker sur le bouton ci-dessous.
                            </div>
                            <div className="commence">
                                <a onClick={() => handleButtonClick('Analyses')}>Faire une analyse</a>
                            </div>
                        </div>
                    )}
                    {predictionResult && (
                        <div className='prediction'>
                            <div className='resultat'>
                                <p>La meilleure culture prédite pour votre type de sol : {predictionResult}</p>
                            </div>
                            <div className='message'>
                                <p>Voici quelques graphes montrant comment vous devriez gérer votre sol pour un bon rendement lors de la cultivation des {predictionResult}</p>
                            </div>
                            <div className="image-scroll">
                                <button className="scroll-button" onClick={() => scrollImages('left')}>&lt;</button>
                                <div className="image-container">
                                    {plotFiles.map((file, index) => (
                                        <img 
                                            key={index} 
                                            src={`http://localhost:5000/plot/${file}`} 
                                            alt={file} 
                                            onClick={() => openFullScreenImage(`http://localhost:5000/plot/${file}`)} // Utilisez la nouvelle fonction pour gérer le clic sur l'image
                                        />
                                    ))}
                                </div>
                                <button className="scroll-button" onClick={() => scrollImages('right')}>&gt;</button>
                            </div>
                            {modalOpen && (
                                <div className="modal" onClick={closeFullScreenImage}>
                                    <img src={modalImage} alt="Full Screen" />
                                </div>
                            )}
                        </div>
                    )}
                </section>
                <section id='capteur' className={`capteur ${activeSection === 'capteur' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Service des capteurs</div>
                    <div style={{ height: '573px', width: '100%' }}>
                        <div className="container">
                            <div className="row">
                                <div className="text">
                                    <h1>Améliorez votre efficacité et réduisez vos coûts grâce à notre solution de capteurs intelligents</h1>
                                    <p>Nos capteurs fournissent des données précises en temps réel, vous permettant de prendre des décisions éclairées rapidement.</p>
                                    <a href='/Categorie'>Explorez maintenant</a>
                                </div>
                                <div className="col-2">
                                    <img src="../capteur1.jpg" alt="capteur" className="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='ChatBot' className={`ChatBot ${activeSection === 'ChatBot' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">ChatBot 💬</div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index}>{msg.sender}: {msg.text}</div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Type your message..." />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </section>
                <section id='Profile' className={`Profile ${activeSection === 'Profile' ? 'section-visible' : 'section-hidden'}`}>
                    <div className="name">Profile 👱‍♂️</div>
                    <span>{console.log(userExists)}</span>
                    {userExists ? (
                    <div className='informations'>
                          <p>Organisation : <span>{userExists[1]}</span></p>
                          <p>Nom : <span>{userExists[3]}</span></p>
                          <p>Prénom : <span>{userExists[2]}</span></p>
                          <p>Email : <span>{userExists[4]}</span></p>
                          <p>Mot de passe : <span>{userExists[5]}</span></p>
                    </div>
                        ) : (
                            <p>User does not exist.</p>
                        )}
                </section>
            </section>
        </div>
    );
}
export default Utilisateur;
