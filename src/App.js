import React, { useState } from "react";
import Auth from "./components/Auth/Auth";
import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}

export default App;
