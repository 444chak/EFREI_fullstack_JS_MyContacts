import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/">MyContacts</Link>
            </div>
            <div>
                <Link to="/login">Connexion</Link>
                <Link to="/register">Inscription</Link>
                <Link to="/contacts">Contacts</Link>
            </div>
        </nav>
    );
};

export default Navbar;
