// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyCMeUfRmWU5uTIeIEAGxRVax0Yd3o1jkLM",
        authDomain: "instagram-clone-db892.firebaseapp.com",
        projectId: "instagram-clone-db892",
        storageBucket: "instagram-clone-db892.appspot.com",
        messagingSenderId: "439039008777",
        appId: "1:439039008777:web:a43f1e3268c910776718d8",
        measurementId: "G-PK4C9V6R1Q"
      }
);

// Initialize Firebase
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage}