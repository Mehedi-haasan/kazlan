import React from "react"

const Pdf = ({ children }) => {

    return (
        <div className="px-8 pb-8 pt-2">
            <div className="">
                <div className="pb-1" style={{ paddingBottom: '10px' }}>
                    <h1 className="text-xl text-center">Kazal & Brothers</h1>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Pdf