import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyAN_eW1uO5wRZaEz05q6hJPirGUTZqB7qk",
  authDomain: "chat-app-67741.firebaseapp.com",
  databaseURL: "https://chat-app-67741-default-rtdb.europe-west1.firebasedatabase.app", 
  projectId: "chat-app-67741",
  storageBucket: "chat-app-67741.appspot.com",
  messagingSenderId: "73007261512",
  appId: "1:73007261512:web:459e19ba2a8efbf4d4357d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app); 
