import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./chat.png";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="home">
      <div className="card">
        <img className="logo" alt="graphic logo of a speech logo" src={logo} />
        <div className="column"> 
          <input
            placeholder="Username"
            type="text"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            placeholder="Room Name"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            required
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button type="submit">SUBMIT</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
