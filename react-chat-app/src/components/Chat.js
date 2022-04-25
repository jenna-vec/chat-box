import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
      });
    }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("");
    } else alert("empty input");
  };

  return (
    <div className="home">
      <div className="chat-card">
        <h4>{room}</h4>
        <br />
        <div className="card-flex">
          <div className="chat-box">
            {messages.map((val, i) => {
              return (
                <div className="text-right" key={i}>
                  <p className="bubble">{val.text}</p>
                  <small>{val.user}</small>
                </div>
              );
            })}
          </div>
          <div className="submit-box">
            <form className="wrapper" action="" onSubmit={handleSubmit}>
              <input
                className="chat-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input className="submit" type="submit" value="&#8811;" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
