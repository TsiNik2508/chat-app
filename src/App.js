import React, { useState } from 'react';
import Header from './components/Header/Header';
import Chat from './components/Chat/Chat';
import Profile from './components/Profile/Profile';
import './App.scss';

const App = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="app">
            <Header onEditProfile={() => setIsProfileOpen(true)} />
            <Chat />
            {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)} />}
        </div>
    );
};

export default App;
