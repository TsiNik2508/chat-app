import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import './Profile.scss';

const Profile = ({ onClose }) => {
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [errorDisplayName, setErrorDisplayName] = useState('');
    const [errorPhotoURL, setErrorPhotoURL] = useState('');
    const [success, setSuccess] = useState('');


    useEffect(() => {
        if (!displayName.trim()) {
            setErrorDisplayName('Имя не может быть пустым');
        } else {
            setErrorDisplayName('');
        }
    }, [displayName]);

    useEffect(() => {
        if (photoURL.trim()) {
            try {
                new URL(photoURL); 
                setErrorPhotoURL('');
            } catch (_) {
                setErrorPhotoURL('Введите корректную ссылку');
            }
        } else {
            setErrorPhotoURL('');
        }
    }, [photoURL]);
    

    const handleSave = async () => {
        if (errorDisplayName || errorPhotoURL) return;

        try {
            await updateProfile(user, { displayName, photoURL });
            setSuccess('Профиль обновлен успешно');
            setTimeout(() => setSuccess(''), 3000);
            onClose();
        } catch (e) {
            console.error('Ошибка обновления профиля:', e);
        }
    };

    return (
        <div className="profile">
            <div className="profile__content">
                <h2 className="profile__title">Редактировать профиль</h2>
                {success && <p className="profile__message profile__message--success">{success}</p>}
                <div className="profile__field">
                    <label className="profile__label">Имя:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className={`profile__input ${
                            errorDisplayName ? 'profile__input--error' : ''
                        }`}
                    />
                    {errorDisplayName && (
                        <p className="profile__error">{errorDisplayName}</p>
                    )}
                </div>
                <div className="profile__field">
                    <label className="profile__label">Ссылка на аватар:</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className={`profile__input ${
                            errorPhotoURL ? 'profile__input--error' : ''
                        }`}
                        placeholder="https://example.com/image.jpg"
                    />
                    {errorPhotoURL && (
                        <p className="profile__error">{errorPhotoURL}</p>
                    )}
                </div>
                <div className="profile__actions">
                    <button
                        className="profile__button profile__button--save"
                        onClick={handleSave}
                        disabled={!!errorDisplayName || !!errorPhotoURL}
                    >
                        Сохранить
                    </button>
                    <button
                        className="profile__button profile__button--cancel"
                        onClick={onClose}
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
