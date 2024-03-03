// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGWp3DTaDf-cgVnSB5_2r_75JX50JMwRo",
    authDomain: "promaze-e582f.firebaseapp.com",
    databaseURL:
        "https://promaze-e582f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "promaze-e582f",
    storageBucket: "promaze-e582f.appspot.com",
    messagingSenderId: "15789154787",
    appId: "1:15789154787:web:98c2e9cbc20def0cf5c0d6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
