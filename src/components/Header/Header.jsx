import React, { useEffect, useState } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import './Header.scss';

const Header = ({ onEditProfile }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('Пользователь вошел:', result.user);
                alert(`Добро пожаловать, ${result.user.displayName}!`);
            })
            .catch((error) => {
                console.error('Ошибка входа:', error);
                alert('Ошибка входа. Попробуйте еще раз.');
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                alert('Вы успешно вышли из аккаунта.');
            })
            .catch((error) => {
                console.error('Ошибка при выходе:', error);
            });
    };

    return (
        <header className="header">
            <h1 className="header__title">ChatApp</h1>
            {user ? (
                <div className="header__user">
                    <div className="header__avatar-wrapper" onClick={onEditProfile}>
                        <img
                            src={user.photoURL}
                            alt={user.displayName || 'Пользователь'}
                            className="header__avatar"
                        />
                        <div className="header__edit-overlay">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="header__edit-icon"
                            >
                                <path d="M3 21v-3.75L14.81 5.44a2.5 2.5 0 0 1 3.53 0l.69.69a2.5 2.5 0 0 1 0 3.53L7.25 21H3zm3-2h2.75L18 9.75l-2.75-2.75L6 16.25V19zm10-14a.5.5 0 0 0-.35.15l-.69.69 2.75 2.75.69-.69a.5.5 0 0 0 0-.7l-.69-.69a.5.5 0 0 0-.35-.15z" />
                            </svg>
                        </div>
                    </div>
                    <p className="header__name">{user.displayName || 'Аноним'}</p>
                    <button className="header__button header__button--signout" onClick={handleSignOut}>
                        Выйти
                    </button>
                </div>
            ) : (
                <button className="header__button" onClick={handleSignIn}>
                    Войти
                </button>
            )}
        </header>
    );
};

export default Header;
