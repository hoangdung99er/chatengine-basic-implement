import React, { useEffect, useState } from "react";
import { ChatEngine, IsTyping } from "react-chat-engine";
import { ChatFeed } from "./";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function Chats() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/*" });
  };

  useEffect(() => {
    if (!user || !localStorage.getItem("username")) {
      navigate("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        // if we dont have chat engine profile, so
        // we have to create one.
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((err) => console.log(err));
        });
      });
  }, [navigate, user]);

  console.log(user);

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Ashahen</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={localStorage.getItem("username") || user.email}
        userSecret={localStorage.getItem("password") || user.uid}
        // renderIsTyping={(typers) => <IsTyping />}
        // renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
      />
    </div>
  );
}

export default Chats;
