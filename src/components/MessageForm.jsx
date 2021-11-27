import React from "react";
import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

function MessageForm(props) {
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const { chatId, creds } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = value.trim();

    if (text.length > 0) sendMessage(creds, chatId, { text });

    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    isTyping(props, chatId);
  };

  const handleUpload = (e) => {
    sendMessage(creds, chatId, { files: e.target.files, text: "" });
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  console.log(isFocus);

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        onSubmit={handleSubmit}
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
}

export default MessageForm;
