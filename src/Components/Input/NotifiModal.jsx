import React, { useEffect, useState } from 'react';
import groovyWalkAnimation from "../../lotti/Animation - 1745147041767.json";
import { useLottie } from "lottie-react";

const NotifiModal = ({ children }) => {
    const [open, setOpen] = useState(true)
    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        style: {
            width: 60,
            height: 60,
        },
    };

    const { View } = useLottie(options);


    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className={`absolute bg-[#FFFFFF] transition-all top-16 rounded-md ease-in duration-500 z-50 pr-3 shadow-xl ${open ? "right-3" : "right-[-350px]"}`}>
            {children}
        </div>

    );
};

export default NotifiModal;