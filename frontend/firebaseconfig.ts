// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ1vYLxz0tYHg4pWxGziokS04-WAffmDw",
  authDomain: "fullstack-todo-list-upso.firebaseapp.com",
  projectId: "fullstack-todo-list-upso",
  storageBucket: "fullstack-todo-list-upso.appspot.com",
  messagingSenderId: "452133988125",
  appId: "1:452133988125:web:4d260b90a8e4acda4a63f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
