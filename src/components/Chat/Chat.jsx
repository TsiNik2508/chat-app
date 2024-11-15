import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../firebase';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import Message from './Message';
import './Chat.scss';

const Chat = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    const inputRef = useRef(null); 
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const messagesRef = ref(db, 'messages');
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const formattedMessages = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setMessages(formattedMessages);
                scrollToBottom();
            } else {
                setMessages([]);
            }
        });
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '' || !user) return;

        const messagesRef = ref(db, 'messages');
        const newMessage = {
            text: message,
            user: user.displayName || 'Anonymous',
            uid: user.uid,
            avatar: user.photoURL || '',
            timestamp: Date.now(),
        };

        push(messagesRef, newMessage);
        setMessage('');
    };

    const deleteMessage = (id) => {
        const messageRef = ref(db, `messages/${id}`);
        remove(messageRef);
    };

    const startEditing = (id, text) => {
        setEditingMessage({ id, text });
        setMessage(text);

        setTimeout(() => {
            inputRef.current?.focus(); 
            inputRef.current?.setSelectionRange(text.length, text.length); 
        }, 0);
    };

    const saveEditedMessage = async () => {
        if (message.trim() === '' || !editingMessage) return;

        const messageRef = ref(db, `messages/${editingMessage.id}`);
        try {
            await update(messageRef, { text: message });
            setEditingMessage(null);
            setMessage('');
        } catch (error) {
            console.error('Ошибка при обновлении сообщения:', error);
        }
    };

    return (
        <div className="chat">
            <div className="chat__messages">
                {messages.map((msg) => (
                    <Message
                        key={msg.id}
                        message={msg}
                        isOwner={user?.uid === msg.uid}
                        onEdit={() => startEditing(msg.id, msg.text)}
                        onDelete={() => deleteMessage(msg.id)}
                    />
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <form
                className="chat__form"
                onSubmit={editingMessage ? saveEditedMessage : sendMessage}
            >
                <input
                    type="text"
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat__input"
                    placeholder={user ? 'Введите сообщение' : 'Авторизуйтесь для отправки сообщений'}
                    disabled={!user}
                />
                <button
                    type="submit"
                    className="chat__button chat__button--send"
                    disabled={!user}
                >
                    {editingMessage ? 'Сохранить' : 'Отправить'}
                </button>
            </form>
        </div>
    );
};

export default Chat;
