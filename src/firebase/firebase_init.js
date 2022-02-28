import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

initializeApp({
    apiKey: "AIzaSyCa23kmh3n2QtClVGnc2RxaXS2a157reMs",
    authDomain: "grizzly-internnet.firebaseapp.com",
    projectId: "grizzly-internnet",
    storageBucket: "grizzly-internnet.appspot.com",
    messagingSenderId: "1048143878833",
    appId: "1:1048143878833:web:09a349b9be7e2afbfc6090",
    measurementId: "G-HKPTVS6NG0"
});

const db = getFirestore();

export {db}; 