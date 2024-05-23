// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7CLmMvxOMU2GGAemigce6gtbLQpo0djo",
  authDomain: "pdm-user-register.firebaseapp.com",
  projectId: "pdm-user-register",
  storageBucket: "pdm-user-register.appspot.com",
  messagingSenderId: "399460135418",
  appId: "1:399460135418:web:fafc78208828137a2df443",
  measurementId: "G-LZSY20DRQV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
