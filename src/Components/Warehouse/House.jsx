import React from "react";
import Warehouse from './Warehouse'
const House = ({ entries = [], shop = [], info = {} }) => {
    return (
        <div>
            {info?.role === "superadmin" ? <Warehouse entries={entries} shop={shop} info={info} /> :
                <div className="relative h-screen">
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
                        You have no permission to see the shop list
                    </h1>
                </div>}
        </div>
    )
}

export default House