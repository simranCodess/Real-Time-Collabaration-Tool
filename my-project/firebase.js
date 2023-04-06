// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-NL6h9lFM4z5DkuSvYwE9d8NSwQN5F0M",
    authDomain: "docs-yt-ddc88.firebaseapp.com",
    projectId: "docs-yt-ddc88",
    storageBucket: "docs-yt-ddc88.appspot.com",
    messagingSenderId: "291912831630",
    appId: "1:291912831630:web:e540f144c29d6a8142afdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const db=getFirestore(app);

export {app, auth ,db}