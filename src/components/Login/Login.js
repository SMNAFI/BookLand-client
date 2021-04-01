import React, { useContext } from 'react';
import './Login.css'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserContext } from '../../App';
import { firebaseConfig } from '../../firebaseConfig/firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var user = result.user;
                const { displayName, email } = user;
                const newUser = { userName: displayName, email };
                setLoggedInUser(newUser);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className="login-container">
            <div>
                <button className='loginBtn' onClick={googleSignIn}>Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;