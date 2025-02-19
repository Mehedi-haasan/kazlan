import React from 'react';
import { io } from "socket.io-client";
const socket = io("http://localhost:8050");

export function ConnectionManager() {
    
  function connect() {
    console.log("connect");
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}