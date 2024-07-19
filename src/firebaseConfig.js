// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVz-SzN6tFWKGpmyYxzeqMspn_Lwh67io",
    authDomain: "connexus-67b70.firebaseapp.com",
    projectId: "connexus-67b70",
    storageBucket: "connexus-67b70.appspot.com",
    messagingSenderId: "110800032268",
    appId: "1:110800032268:web:9e5cecc67418fa14c7d429"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };