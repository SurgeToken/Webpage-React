// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZvkQrqNuP4IKaM52iPX-7jq0DxZUgJq0",
  authDomain: "xsurge-d234b.firebaseapp.com",
  projectId: "xsurge-d234b",
  storageBucket: "xsurge-d234b.appspot.com",
  messagingSenderId: "534796218765",
  appId: "1:534796218765:web:b2773480a0bf34a3470dc4",
  measurementId: "G-Z6J9ZBTY7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();