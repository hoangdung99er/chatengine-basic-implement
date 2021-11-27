import React, { useState } from "react";
import axios from "axios";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { signInWithGoogle, signInWithFacebook } from "../firebase";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // username | password => chatengine -> give messages
    // works out -> logged in
    // error -> try with new username...
    const authObject = {
      "Project-ID": "ff1aabb3-fc9d-4ba2-a091-d2d1daadd13a",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      setError("Oops, Invalid credentials");
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
          <div align="center">
            <button onClick={signInWithGoogle} type="submit" className="button">
              <span>
                <GoogleOutlined /> Sign In With Google
              </span>
            </button>
          </div>
          <div align="center">
            <button
              onClick={signInWithFacebook}
              type="submit"
              className="button"
            >
              <span>
                <FacebookOutlined /> Sign In With Facebook
              </span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
