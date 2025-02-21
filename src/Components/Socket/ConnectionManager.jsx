import React from 'react';
import { io } from "socket.io-client";
import BaseUrl from '../../Constant';
const socket = io(`${BaseUrl}`);

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