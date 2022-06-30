import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useState, createContext, useEffect } from 'react'
import firebase from '../services/firebaseConnection'
import { toast } from 'react-toastify';
import auth from '../services/firebaseConnection';
export const AuthContext = createContext({});


function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function loadUser() {
            const storagedUser = localStorage.getItem("usuarioLogado");
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
                setLoading(true);
            }
            setLoading(false);
        }
        loadUser();
    }, []);

    async function signUp(email, password, nome) {
        try{
        console.log("TESTE 1")
        const reponse = await createUserWithEmailAndPassword(auth, email, password)
        setLoading(true);
        return auth.createUser
    }catch(e){
        console.error();
    }
    }

    async function signIn(email, password) {
        
        try{
            console.log("TESTE 2")
            const reponse = await signInWithEmailAndPassword(auth, email, password)
           
            setLocalUser(reponse)
        
            setLoading(true);
            return auth.createUser
        }catch(e){
            console.error();
        }
        setLoading(true);
        //Fazer Login no firebase
        toast.success('Bem-vindo de volta!!');
        
    }


    async function signOut() {
        signOut(auth)
        localStorage.removeItem("usuarioLogado")
    }

    function setLocalUser(data){
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signUp,
            signOut,
            signIn,
            loading,
            setUser,
            setLocalUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;