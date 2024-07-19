import React, { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../api/FirestoreAPI"; // Adjust the import path as necessary

const MessageComponent = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (currentUser && selectedUser) {
      getMessages(currentUser.id, selectedUser.id, setMessages);
    }
  }, [currentUser, selectedUser]);

  const handleSendMessage = () => {
    if (currentUser && selectedUser && messageText.trim()) {
      sendMessage(currentUser.id, selectedUser.id, messageText)
        .then(() => setMessageText("")) // Clear the input field on success
        .catch((err) => console.error("Error sending message: ", err));
    }
  };

  if (!currentUser) {
    return <p>Loading...</p>; // Show a loading message or spinner while loading user data
  }

  return (
    <div className="message-container">
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.sender === currentUser.id ? "message-sent" : "message-received"}
          >
            {message.text}
          </div>
        ))}
      </div>
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageComponent;
