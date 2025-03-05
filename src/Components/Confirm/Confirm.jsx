import React, { useEffect } from "react";

const Confirm = ({ message, istoggle, toggle }) => {

    useEffect(() => {
        const interval = setInterval(() => {
            istoggle(false)
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={`bg-white w-[200px] absolute transition-all top-8 ease-in duration-300 ${toggle ? "right-8 " : "right-[-200px]"} z-50 h-14 rounded-lg flex justify-center items-center`}>
            <h1 className="text-black">{message}</h1>
        </div>
    )
}

export default Confirm