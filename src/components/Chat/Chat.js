import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, push, onValue, remove, update } from "firebase/database";
import { auth } from "../../firebase";
import { signOut, updateProfile } from "firebase/auth";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import styles from "./Chat.module.css";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const [editingMessageId, setEditingMessageId] = useState(null); // ID редактируемого сообщения
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Ref для фокуса на поле ввода

  const db = getDatabase();

  useEffect(() => {
    const messagesRef = ref(db, "messages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      setMessages(loadedMessages);
    });
  }, [db]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        if (editingMessageId) {
          // Обновление существующего сообщения
          const messageRef = ref(db, `messages/${editingMessageId}`);
          await update(messageRef, {
            text: message,
            timestamp: new Date().toISOString()
          });
          setEditingMessageId(null); // Сброс режима редактирования после обновления
        } else {
          // Добавление нового сообщения
          const messagesRef = ref(db, "messages");
          await push(messagesRef, {
            text: message,
            uid: localUser.uid,
            displayName: localUser.displayName,
            photoURL: localUser.photoURL,
            timestamp: new Date().toISOString()
          });
        }
        
        setMessage(""); // Очистка поля ввода
      } catch (error) {
        console.error("Ошибка при отправке или обновлении сообщения:", error);
      }
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const messageRef = ref(db, `messages/${messageId}`);
      await remove(messageRef);
    } catch (error) {
      console.error("Ошибка при удалении сообщения:", error);
    }
  };

  const handleEdit = (msg) => {
    setMessage(msg.text); // Загружаем текст сообщения в поле ввода
    setEditingMessageId(msg.id); // Устанавливаем ID редактируемого сообщения
    inputRef.current.focus(); // Устанавливаем фокус на поле ввода
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("user");
    });
  };

  const toggleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const updateUserProfile = async ({ displayName, photoURL }) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      const updatedUser = { ...localUser, displayName, photoURL };
      setLocalUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatHeader}>
        <span className={styles.userInfo} onClick={toggleProfileEdit}>
          <img src={localUser.photoURL} alt="avatar" className={styles.headerAvatar} />
          Привет, {localUser.displayName}
        </span>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Выйти
        </button>
      </div>

      {isEditingProfile && (
        <div className={styles.profilePopup}>
          <ProfileEdit user={localUser} updateUserProfile={updateUserProfile} />
          <button onClick={toggleProfileEdit} className={styles.closeButton}>
            ×
          </button>
        </div>
      )}

      <div className={styles.chatMessages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.chatMessage} ${
              msg.uid === localUser.uid ? styles.myMessage : styles.otherMessage
            }`} // Стиль в зависимости от пользователя
          >
            <img src={msg.photoURL} alt={msg.displayName} className={styles.avatar} />
            <div className={styles.messageContent}>
              <div className={styles.chatMessageHeader}>
                <strong>{msg.displayName}</strong>
                <span className={styles.timestamp}>
                  {msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "Время неизвестно"}
                </span>
              </div>
              <p className={styles.messageText}>{msg.text}</p>

              {/* Меню с кнопками редактирования и удаления */}
              {msg.uid === localUser.uid && (
                <div className={styles.messageMenu}>
                  <button
                    className={styles.menuButton}
                    onClick={() => handleEdit(msg)}
                  >
                    Редактировать
                  </button>
                  <button
                    className={styles.menuButton}
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          ref={inputRef} // Ref для фокуса
          className={styles.chatInput}
          placeholder={editingMessageId ? "Редактировать сообщение..." : "Введите сообщение..."}
        />
        <button onClick={sendMessage} className={styles.chatSend}>
          {editingMessageId ? "Сохранить" : "Отправить"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
