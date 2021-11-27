import React from "react";
import "./App.css";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import { IsTypingComponent } from "./components";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Chats from "./components/Chats";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
