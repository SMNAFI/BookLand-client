import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser] = useContext(UserContext)
    return (
        <div className="header-container">
            <h1 style={{ fontSize: '45px' }}>BookLand</h1>
            <div className="nav">
                <ul>
                    <li><Link to='/' className="anchor">Home</Link></li>
                    <li><Link to='/orders' className="anchor">Orders</Link></li>
                    <li><Link to='/admin' className="anchor">Admin</Link></li>
                    <li><Link to='/' className="anchor">Deals</Link></li>
                    <li><Link to='/login' className="anchor">
                        {
                            loggedInUser.email ? `${loggedInUser.userName}` : 'Login'
                        }
                    </Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;