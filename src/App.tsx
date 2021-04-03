import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import { __prod__ } from './constants';

function App() {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const socket = io.connect(
    `ws://${__prod__ ? '54.234.116.155:5000' : 'localhost:5000'}`
  );
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <div className="App">
      <form className="app__input">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          name="name"
          type="text"
        />
        <label htmlFor="message">Message:</label>
        <input
          name="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            setDisabled(true);
            socket.send(
              JSON.stringify({
                name,
                message,
                id: Math.floor(Math.random() * 5000),
              })
            );
            setTimeout(() => {
              setDisabled(false);
            }, 3000);
          }}
          disabled={disabled}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
