import { useEffect, useState, useRef } from "react"
import Button from "../Input/Button"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant'
import Edit from "../../icons/Edit";
import Remove from "../../icons/Remove";


const StateCard = ({ item, i, callState, info = {}, isChecked, TikBox }) => {

    const [values, setValues] = useState({});
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false)
    const input_name = useRef(null)
    const HandleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/delete/state/${item?.id}`, {
                method: 'Delete',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            setShow(false)
            callState()
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }
    useEffect(() => {
        input_name.current.focus()
    }, [])
    const HandleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/state/${values?.id}`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            setEdit(false)

            callState()
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    useEffect(() => {
        setValues(item)
    }, [item])


    return (
        <tr className={`border-b z-10 font-thin ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox"
                        checked={isChecked} onChange={() => TikBox(item.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-2 py-2 border-x font-thin">{item?.name}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin">KB-{item?.id}</th>
            <th scope="col" className="px-2 py-2 flex justify-end items-center border-r gap-2">
                <Edit onClick={() => { setEdit(true) }} />
                <Remove className={`${info?.role === "superadmin" ? "" : "hidden"}`} onClick={() => { setShow(true) }} />
                <Modal show={edit} handleClose={() => { setEdit(false) }} size="500px" className="">
                    <div className="pt-1">
                        <div className=''>
                            <h1 className='text-[15px] pb-1.5'>State name</h1>
                            <input type="text" ref={input_name} value={values?.name} placeholder={values?.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") { HandleUpdate() }
                                }}
                            />
                        </div>

                        <Button isDisable={false} name="Update" onClick={HandleUpdate} className="mt-3 border bg-blue-500 text-white" />
                    </div>
                </Modal>

                <Modal show={show} handleClose={() => { setShow(false) }} size="350px" className="">
                    <h1 className="py-3 text-sm font-thin">Are you sure you want to delete this?</h1>
                    <div className="flex justify-between items-center p-4">
                        <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 bg-blue-500 text-white">No</button>
                        <button onClick={HandleDelete} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
                    </div>
                </Modal>
            </th>
        </tr>
    )
}

export default StateCard