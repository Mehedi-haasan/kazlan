import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8050');

const MyForm =()=> {
    const [message, setMessage] = useState('from Admin');
    const [receiverId, setReceiverId] = useState('');
    const senderId = "3"; 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
       
        socket.emit('login', senderId);

        socket.on('receive-message', (data) => {
          console.log('Message received:', data);
      });

        return () => {
            socket.emit('logout');
            socket.off('receive-message');
        };
    }, [senderId]);

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

       
        socket.timeout(5000).emit('create-message', { senderId, receiverId, message }, (response) => {
            setIsLoading(false);
            console.log(response);

        });
    }

    return (
        <form onSubmit={ onSubmit }>
            <input
                type="text"
                placeholder="Message"
                value={ message }
                onChange={ e => setMessage(e.target.value) }
            />
            <input
                type="text"
                placeholder="Receiver ID"
                value={ receiverId }
                onChange={ e => setReceiverId(e.target.value) }
            />
            <button type="submit" disabled={ isLoading }>Submit</button>
        </form>
    );
}


export default MyForm