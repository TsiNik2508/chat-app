import React, { useState } from "react";
import styles from "./ProfileEdit.module.css";

const ProfileEdit = ({ user, updateUserProfile }) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [errors, setErrors] = useState({});

  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + 
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + 
      "((\\d{1,3}\\.){3}\\d{1,3}))" + 
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
      "(\\?[;&a-z\\d%_.~+=-]*)?" + 
      "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };

  const handleDisplayNameChange = (e) => {
    const newDisplayName = e.target.value;
    setDisplayName(newDisplayName);

    // Валидация никнейма
    if (newDisplayName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        displayName: "Никнейм не может быть пустым.",
      }));
    } else if (newDisplayName.length > 20) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        displayName: "Никнейм должен быть менее 20 символов.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        displayName: null,
      }));
    }
  };

  const handlePhotoURLChange = (e) => {
    const newPhotoURL = e.target.value;
    setPhotoURL(newPhotoURL);

    if (newPhotoURL && !isValidUrl(newPhotoURL)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photoURL: "Введите корректный URL для фото.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photoURL: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.displayName && !errors.photoURL) {
      updateUserProfile({ displayName, photoURL });
    }
  };

  return (
    <div className={styles.profileEdit}>
      <h2 className={styles.title}>Редактировать профиль</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Никнейм</label>
          <input
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
            className={styles.input}
            placeholder="Введите новый никнейм"
          />
          {errors.displayName && (
            <p className={styles.error}>{errors.displayName}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ссылка на фото</label>
          <input
            type="text"
            value={photoURL}
            onChange={handlePhotoURLChange}
            className={styles.input}
            placeholder="Введите URL для фото"
          />
          {errors.photoURL && (
            <p className={styles.error}>{errors.photoURL}</p>
          )}
        </div>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={errors.displayName || errors.photoURL}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
