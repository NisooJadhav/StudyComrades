import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIDTXxFHdMcEjzrqMED2E7zITFXQTrWqI",
  authDomain: "study-comrades.firebaseapp.com",
  projectId: "study-comrades",
  storageBucket: "study-comrades.appspot.com",
  messagingSenderId: "282505516501",
  appId: "1:282505516501:web:0b77d10691db7cb73b995c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
