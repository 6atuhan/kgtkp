
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";   

const firebaseConfig = {
  apiKey: "AIzaSyDObp6hfx0zbAc9Pedl4WHNmZk19lmeWYQ",
  authDomain: "kgtkp-2fa25.firebaseapp.com",
  projectId: "kgtkp-2fa25",
  storageBucket: "kgtkp-2fa25.appspot.com",
  messagingSenderId: "314577306050",
  appId: "1:314577306050:web:8a0bb91f3dcb1cbc01565b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  
export { db }    