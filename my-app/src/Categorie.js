import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function Categorie() {
    const [cartItems, setCartItems] = useState([]);
    const [clickedProduct, setClickedProduct] = useState(null);
    
    const products = [
        { id: 1, name: 'Capteur d\'Humidité', price: 50, image: '/h1.jpg', rating: 3.5 },
        { id: 2, name: 'Capteur de Phosphore', price: 30, image: '/p.jpg', rating: 3.0 },
        { id: 3, name: 'Capteur d\'Azote', price: 50, image: '/azote2.png', rating: 4.0 },
        { id: 4, name: 'Capteur de Potassium', price: 30, image: '/Potassium.jpg', rating: 5.0 },
        { id: 5, name: 'Capteur de température', price: 30, image: '/temp.png', rating: 4.5 },
        { id: 6, name: 'Capteur de ph', price: 20, image: '/ph2.jpg', rating: 2.5 },
        { id: 7, name: 'détécteur d\'eau', price: 70, image: '/rainfall2.jpg', rating: 4.5 },
    ];

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
        setClickedProduct(product);
        setTimeout(() => setClickedProduct(null), 2000);
    };

    return (
        <div className="categorie">
            <div className="container">
                <h2>Les meilleurs capteurs</h2>
                <div className="row">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
                    {products.map(product => (
                        <div key={product.id} className="col-3">
                            <img src={product.image} alt={product.name} className="icon" />
                            <h1>{product.name}</h1>
                            <div className="rating">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <i key={i} className={`fa fa-star${i < Math.floor(product.rating) ? '' : '-o'}`} aria-hidden="true"></i>
                                ))}
                            </div>
                            <p>{product.price}$</p>
                            <button onClick={() => addToCart(product)}>
                                Ajouter au panier
                                {clickedProduct && clickedProduct.id === product.id && <img className="check" style={{ width: '10%' }} aria-hidden="false" src='./check-mark.png' alt="Check mark"></img>}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="back"> 
                    <Link to="/Panier" state={ cartItems }>Voir le panier</Link>
                    <a href="/Utilisateur">Quitter</a>
                </div>
            </div>
        </div>
    );
}
export default Categorie;