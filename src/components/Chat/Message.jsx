import React from 'react';
import './Message.scss';

const Message = ({ message, isOwner, onEdit, onDelete }) => {
    const { text, user, avatar, timestamp } = message;

    return (
        <div className="message">
            <img src={avatar} alt={user} className="message__avatar" />
            <div className="message__content">
                <div className="message__header">
                    <div className="message__info">
                        <strong className="message__user">{user}</strong>
                        <span className="message__time">
                            {new Date(timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                    {isOwner && (
                        <div className="message__actions">
                            <button
                                className="message__button message__button--edit"
                                onClick={onEdit}
                                title="Редактировать"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="message__icon"
                                >
                                    <path d="M3 21v-3.75L14.81 5.44a2.5 2.5 0 0 1 3.53 0l.69.69a2.5 2.5 0 0 1 0 3.53L7.25 21H3zm3-2h2.75L18 9.75l-2.75-2.75L6 16.25V19zm10-14a.5.5 0 0 0-.35.15l-.69.69 2.75 2.75.69-.69a.5.5 0 0 0 0-.7l-.69-.69a.5.5 0 0 0-.35-.15z" />
                                </svg>
                            </button>
                            <button
                                className="message__button message__button--delete"
                                onClick={onDelete}
                                title="Удалить"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="message__icon"
                                >
                                    <path d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H4v2h16V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <p className="message__text">{text}</p>
            </div>
        </div>
    );
};

export default Message;
