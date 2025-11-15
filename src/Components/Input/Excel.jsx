import React, { useState } from "react";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Notification from "../Input/Notification";


const Excel = ({ Jpg, onClick, data, filename = 'data.xlsx', handeldelete, is_delete }) => {
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const exportToExcel = () => {
        if (!data || data.length === 0) {
            setMessage({ id: Date.now(), mgs: 'No data to export!' });
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    };

    return <div>
        <Notification message={message} />
        <button onClick={handeldelete} className={`border-y border-l rounded-l ${is_delete ? 'hidden' : ''} px-3 py-1 font-thin text-[#FD3550] border-[#FD3550] hover:bg-[#FD3550] hover:text-white`}>Delete</button>
        <button onClick={() => {
            exportToExcel();
        }} className={`border px-3 py-1 ${is_delete ? 'rounded-l' : ''} font-thin border-[#6C757D]  hover:text-white dark:text-white dark:border-white hover:bg-gray-400 text-gray-500`}>Excel</button>
        <button className="border-y border-r px-3 py-1 font-thin border-[#6C757D] dark:border-white hover:text-white hover:bg-gray-400 dark:text-white text-gray-500" onClick={onClick}>PDF</button>
        <button className="border-y border-r rounded-r px-3 py-1 font-thin border-[#6C757D] dark:border-white hover:text-white hover:bg-gray-400 dark:text-white text-gray-500" onClick={Jpg}>JPG</button>
    </div>
}

export default Excel