/* eslint-disable react/prop-types */


import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const goggleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [ user, setUser]=useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoggle = () => {
        setLoading(true);
        return signInWithPopup(auth, goggleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }

    }, []);

    const authInfo = {
        user,
        createUser,
        signInUser,
        signInWithGoggle,
        logOut,
        loading
    }


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;