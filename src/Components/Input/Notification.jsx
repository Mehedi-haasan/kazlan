import { useEffect, useState } from 'react';

const Notification = ({ message }) => {
    const [visible, setVisible] = useState(false);
    const [currentMsg, setCurrentMsg] = useState("");
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (message?.mgs) {
            setCurrentMsg(message?.mgs);
            setShow(true);
        }
    }, [message?.id]);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setShow(false); 
                setCurrentMsg('');
            }, 1500);
            return () => clearTimeout(timer); 
        }
    }, [show]);



    return (
        <div className="fixed bottom-8 right-5 z-50">
            <div
                className={`bg-green-500 text-white px-4 py-2 rounded shadow-lg transform transition-all duration-300 ease-in-out ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
            >
                {currentMsg}
            </div>
        </div>
    );
};

export default Notification;
