import React from "react";
import Setting from "./Setting";

const AppSetting = ({ info = {} }) => {
    return (
        <div>
            {
                info?.role === "superadmin" ? <Setting /> : <div className="relative h-screen">
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                        You have no permission to see the shop list
                    </h1>
                </div>
            }
        </div>
    )
}

export default AppSetting