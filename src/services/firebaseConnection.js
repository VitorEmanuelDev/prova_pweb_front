import {initializeApp} from "firebase/app"
import{getAuth} from "firebase/auth"

const firebaseConfig={
    apiKey: "AIzaSyAyN4iR4CxBat48dGR23LzImF-2guoiwzE",
    authDomain: "crud-pweb-front.firebaseapp.com",
    projectId: "crud-pweb-front",
    storageBucket: "crud-pweb-front.appspot.com",
    messagingSenderId: "32926432204",
    appId: "1:32926432204:web:395070f98e146b1a8d7b69",
    measurementId: "G-N0QXVNS8L2"
}

const app=initializeApp(firebaseConfig);
var auth=null;
if(app){
    auth=getAuth();
}


export default auth;