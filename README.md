# [ChatApp](https://TsiNik2508.github.io/chat-app)

ChatApp — это современное веб-приложение для обмена сообщениями в реальном времени, где пользователи могут авторизоваться через Google, редактировать профиль, отправлять и редактировать сообщения.

## Функционал

- **Авторизация через Google**
- **Редактирование профиля**
  - Изменение имени и аватара.
  - Анимация и стиль при редактировании аватара.
- **Отправка сообщений**
  - Сообщения отображаются в реальном времени.
  - Возможность редактировать и удалять свои сообщения.
- **Выход из аккаунта**
- Стильное оформление, адаптированное для тёмной темы.

---

## Стек технологий

- **React** — библиотека для создания пользовательского интерфейса.
- **Firebase**:
  - **Authentication** — для входа через Google.
  - **Realtime Database** — для хранения сообщений в реальном времени.
- **SCSS** — для стилизации компонентов.
- **ESLint** — для обеспечения качества кода.

---

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/TsiNik2508/chat-app.git
cd chat-app
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск приложения
```bash
npm start
```

Откройте приложение в браузере по адресу: [http://localhost:3000](http://localhost:3000).

---


## Структура проекта
```
src/
├── components/
│   ├── Chat/
│   │   ├── Chat.jsx
│   │   ├── Chat.scss
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── Header.scss
│   ├── Message/
│   │   ├── Message.jsx
│   │   ├── Message.scss
│   ├── Profile/
│   │   ├── Profile.jsx
│   │   ├── Profile.scss
├── firebase.js
├── App.jsx
├── App.scss
└── index.js
```

---

## Зависимости
- **React**: ^18.0.0
- **Firebase**: ^9.0.0
- **Sass**: ^1.0.0

---

## Автор
- Никита [GitHub](https://github.com/TsiNik2508) | [LinkedIn](https://www.linkedin.com/in/nikita-tsilosani-5367782b4) | [Email](mailto:nikitaandr2508@gmail.com)
