import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import {  useState } from "react";
import BaseUrl from "../../Constant";
import Notification from '../Input/Notification'
import DownModal from "../Input/DownModal";
import { useNavigate } from "react-router-dom";


const WarehouseCard = ({ item, i, FetchShop, info = {}, isChecked, TikBox }) => {
    const goto = useNavigate()
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({ id: '', mgs: '' });



    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/company/${item?.id}`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();
        setMessage({ id: Date.now(), mgs: data?.message });
        FetchShop()
        setShow(false)
        setMessage({ id: Date.now(), mgs: data?.message });
    }

    return (

        <tr className={`border-b font-thin ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" onChange={() => TikBox(item.id)} checked={isChecked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th className="px-2 py-2 border-x font-thin ">{item?.name}</th>
            <th className="px-2 py-2 border-r font-thin ">{item?.count}</th>
            <th className="px-2 py-2 border-r font-thin "> {item?.TotalCost}</th>
            <th className="px-2 py-2 border-r font-thin ">{item?.TotalCost}</th>
            <th className="px-2 py-2 border-r font-thin "> {item?.TotalWorth}</th>
            <th className="px-2 py-2 border-r font-thin "> {item?.TotalWorth - item?.TotalCost}</th>
            <th className="px-2 py-2 border-r font-thin "> {item?.employee}</th>
            <th className="px-2 py-2 border-r font-thin ">{item?.creator}</th>
            <th className="px-2 py-2 flex justify-center items-center border-r gap-2">
                <Notification message={message} />
                <Edit size='22px' onClick={() => { goto(`/update/warehouse/${item?.id}`) }} />
                <Remove size='18px' onClick={() => { setShow(true) }} className={`${info?.role === "superadmin" ? '' : 'hidden'}`} />
                <DownModal show={show} handleClose={() => { setShow(false) }} size="320px" className="">
                    <h1 className="font-semibold text-lg py-2 text-black">Are you sure you want to delete?</h1>
                    <div className="flex justify-between items-center pb-6 pt-4">
                        <button onClick={() => { setShow(false) }} className="border px-3 py-1 rounded border-blue-500 text-blue-500">No</button>
                        <button onClick={handleDelete} className="border px-3 py-1 rounded border-red-500 text-red-500">Yes</button>
                    </div>
                </DownModal>
            </th>
        </tr>
    )
}

export default WarehouseCard