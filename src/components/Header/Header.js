import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header-container">
            <h1>Book Shop</h1>
            <div className="nav">
                <ul>
                    <li><Link to='/' className="anchor">Home</Link></li>
                    <li><Link to='/orders' className="anchor">Orders</Link></li>
                    <li><Link to='/admin' className="anchor">Admin</Link></li>
                    <li><Link to='/' className="anchor">Deals</Link></li>
                    <li><Link to='/login' className="anchor">Login</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;