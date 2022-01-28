import React, { useEffect, useContext, useState } from 'react';
import { signInWithGoogle } from './services/firebase';
import { UserContext } from './providers/UserProvider';
import { useHistory } from 'react-router';
import '../src/style/main.css'

export default function Login() {
    let history = useHistory();
    const user = useContext(UserContext)
    useEffect(() => {
        if (user) {
            history.push('/dashboard')
        }else{
            history.push('/')
        }
    }, [user]);

    return (
        <div className="login-buttons">
            <button className="login-provider-button" onClick={signInWithGoogle}>
                <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
                <span> Continue with Google</span>
            </button>
        </div>
    );
}