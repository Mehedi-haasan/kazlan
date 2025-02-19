import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
// const socket = io('http://localhost:8050');

const MessageBar = ({userId}) => {
    const [show, setShow] = useState(false)
    const [allMessage, setAllMessage] = useState([]);
    const [message, setMessage] = useState('')
    const [recieverId, setReceiverId] = useState('1');
    const [senderId, setSenderId] = useState('2')
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     socket.emit('login', senderId);

    //     socket.on('receive-message', (data) => {
    //         setAllMessage(prevMessages => [...prevMessages, data]);
    //         setShow(true)
    //     });

    //     return () => {
    //         socket.emit('logout');
    //         socket.off('receive-message');
    //     };
    // }, [senderId]);

    // const fetchMessage = async () => {
    //     const response = await fetch(`http://localhost:8050/api/get/message/${recieverId}`);
    //     const data = await response.json();
    //     setAllMessage(data.items)
    // }

    // useEffect(() => {
    //     // fetchMessage()
    // }, [])



    const onSubmit = (event) => {
        // event.preventDefault();
        // setIsLoading(true);

        // setAllMessage(prevMessages => [...prevMessages, { senderId: senderId, recieverId: recieverId, message: message }]);
        // socket.timeout(5000).emit('create-message', { senderId, recieverId, message }, (response) => {
        //     setIsLoading(false);
        //     console.log(response);

        // });
        // setMessage('')
        // setIsLoading(false)
    }
    return (
        <div>
            {
                show ? <div className='fixed w-[300px] max-h-[550px] min-h-[450px] bg-white right-5 bottom-0 rounded shadow-xl'>


                    <div className='w-[300px] max-h-[550px] min-h-[450px] relative rounded-lg shadow'>

                        <div className='flex justify-between absolute top-2 right-0 left-0 shadow-xl pb-[3px] rounded-t-lg'>
                            <div className='flex justify-start items-start gap-2'>
                                <img className='h-12 w-12 rounded-full object-cover' src='https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-628.jpg?w=740' alt='image' />
                                <div>
                                    <h1 className='pt-1 font-semibold'>Mehedi hasan</h1>
                                    <p className='text-xs'>Active now</p>
                                </div>
                            </div>
                            <div className='pt-1 pr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { setShow(false) }} className='cursor-pointer' width="1em" height="1em" viewBox="0 0 64 64"><path fill="#ec1c24" d="M50.592 2.291L32 20.884C25.803 14.689 19.604 8.488 13.406 2.291c-7.17-7.17-18.284 3.948-11.12 11.12c6.199 6.193 12.4 12.395 18.592 18.592A32589 32589 0 0 1 2.286 50.595c-7.164 7.168 3.951 18.283 11.12 11.12q9.297-9.3 18.593-18.594l18.592 18.594c7.17 7.168 18.287-3.951 11.12-11.12q-9.297-9.298-18.597-18.594q9.298-9.299 18.597-18.596c7.168-7.166-3.949-18.284-11.12-11.11" /></svg>
                            </div>
                        </div>

                        <div className='absolute top-16 bottom-12 left-2 right-2 overflow-y-auto'>

                            <div className='flex flex-col  pb-1'>
                                {
                                    allMessage.map((item, index) => {
                                        return (
                                            <div>
                                                {
                                                    item?.senderId === '1' ? <div className='flex justify-end'>
                                                        <h1 key={index} className='inline-block py-1 bg-[#0861F2] px-2 rounded-full text-white my-1 text-right' >
                                                            {item?.message}
                                                        </h1>
                                                    </div> : <h1 key={index} className='inline-block bg-gray-200 py-1 px-2 rounded-full my-1' >
                                                        {item?.message}
                                                    </h1>
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>


                        <div className=' absolute left-0 right-0 bottom-2'>
                            <div className='flex justify-between items-center gap-2 pl-2 pr-3'>
                                <input
                                    className='border focus:outline-none rounded-lg py-1 px-2 w-full'
                                    type="text"
                                    placeholder="Message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                                <button onClick={onSubmit}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className='text-[#0861F2]'
                                        width="24px" height="24px" viewBox="0 0 48 48">
                                        <path fill="currentColor"
                                            d="M7.262 4.244c-1.787-.893-3.765.812-3.146 2.711L8.13 19.26a2 2 0 0 0 1.573 1.352l15.86 2.643c.835.14.835 1.34 0 1.48L9.704 27.378a2 2 0 0 0-1.573 1.352L4.116 41.042c-.62 1.9 1.359 3.605 3.146 2.712l35.494-17.742c1.659-.83 1.659-3.197 0-4.026z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>


                </div> : <span />
            }

        </div>
    );
};

export default MessageBar;