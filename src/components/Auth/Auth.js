import React from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import styles from "./Auth.module.css";

const Auth = ({ setUser }) => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); 
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  return (
    <div className={styles.auth}>
      <h2 className={styles.authTitle}>Добро пожаловать в Chat App</h2>
      <p className={styles.authSubtitle}>Авторизуйтесь, чтобы продолжить</p>
      <button className={styles.authButton} onClick={handleSignIn}>
        Войти через Google
      </button>
    </div>
  );
};

export default Auth;
