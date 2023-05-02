// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { getDatabase } from 'firebase/database';
//import * as firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmA40rR4lGWxpeRLBaTWkee5qRM43cuvs",
  authDomain: "hobbyhive-b797e.firebaseapp.com",
  projectId: "hobbyhive-b797e",
  storageBucket: "hobbyhive-b797e.appspot.com",
  messagingSenderId: "310552705899",
  appId: "1:310552705899:web:2ff3528426a22174366a2e",
  measurementId: "G-YMZ6T20MZ5"
};


if (!firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig)
    const storage = getStorage(app);
}

const auth = firebase.auth();

export { auth, firebase };
