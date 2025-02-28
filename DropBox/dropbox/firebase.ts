import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6AeSy8oeZ_0KHb8wn5ravtacTJ0BYkis",
    authDomain: "dropbox-35236.firebaseapp.com",
    projectId: "dropbox-35236",
    storageBucket: "dropbox-35236.firebasestorage.app",
    messagingSenderId: "890097512558",
    appId: "1:890097512558:web:ad49acb6d6416b5ace367f"
  };
  
  // when server rendered some pages so some pages are pre-initialised we dont have
  // to run every time for that we are using singleton which will check if present or not.
  // if not then initialize from scratch.

  const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export { db, storage };