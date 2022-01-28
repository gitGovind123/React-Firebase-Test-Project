import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyA-N4g791SKpBViFcFxJF_Dhmu265YrUzg",
    authDomain: "firestoredemoproj.firebaseapp.com",
    projectId: "firestoredemoproj",
    storageBucket: "firestoredemoproj.appspot.com",
    messagingSenderId: "418361808194",
    appId: "1:418361808194:web:5793c1a2d63b09120324db",
    measurementId: "G-QL0D4VVQK7"
});


export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res.user)
    }).catch((error) => {
        console.log(error.message)
    })
}

export const logOut = () => {
    auth.signOut().then(()=> {
        console.log('logged out')
    }).catch((error) => {
        console.log(error.message)
    })
}

export const db = firebase.firestore();