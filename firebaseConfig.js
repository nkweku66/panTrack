import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBXANTc_8lNO4n3d20VEwLHsZFzK9wCxkM",
    authDomain: "friendlyeats-6e73c.firebaseapp.com",
    projectId: "friendlyeats-6e73c",
    storageBucket: "friendlyeats-6e73c.appspot.com",
    messagingSenderId: "345695075061",
    appId: "1:345695075061:web:c9cbe1ed286a34100363bc",
    measurementId: "G-1QWDTNMN9M"
};

let app;
let db;
let auth;

if (typeof window !== "undefined" && !getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
}

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signOutUser = () => {
    return signOut(auth);
};

export { db, auth };
