import React from "react";
import Setting from "./Setting";
import EscapeRedirect from "../Wholesale/EscapeRedirect";

const AppSetting = ({ info = {} }) => {
    EscapeRedirect()
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