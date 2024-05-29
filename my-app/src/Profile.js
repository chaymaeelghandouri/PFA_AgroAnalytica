import React from 'react';
import './styles1.css';

function UserProfile({ userData }) {
    return (
        <div>
            <h2>{userData.prenom} {userData.nom}</h2>
            <p>Organisation: {userData.organisation}</p>
            <p>Email: {userData.email}</p>
            <p>Password: {userData.password}</p>
        </div>
    );
}

export default UserProfile;