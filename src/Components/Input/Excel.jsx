import React from "react";

const Excel = ({ Jpg, onClick, expotExcel, handeldelete }) => {
    return <div>
        <button onClick={handeldelete} className="border-y border-l rounded-l px-3 py-1 font-thin text-[#FD3550] border-[#FD3550] hover:bg-[#FD3550] hover:text-white">Delete</button>
        <button onClick={expotExcel} className="border px-3 py-1 font-thin border-[#6C757D] hover:text-white hover:bg-gray-400 text-gray-500">Excel</button>
        <button className="border-y border-r px-3 py-1 font-thin border-[#6C757D] hover:text-white hover:bg-gray-400 text-gray-500" onClick={onClick}>PDF</button>
        <button className="border-y border-r rounded-r px-3 py-1 font-thin border-[#6C757D] hover:text-white hover:bg-gray-400 text-gray-500" onClick={Jpg}>JPG</button>
    </div>
}

export default Excel