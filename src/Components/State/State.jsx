import { useState, useEffect } from "react"
import Button from "../Input/Button"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant'
import Add from "../../icons/Add";
import StateCard from "./StateCard";

const State = () => {

    const [values, setValues] = useState("");
    const [state, setState] = useState([])
    const [show, setShow] = useState(false)

    const handleCreate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/state`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    name: values
                }),
            });

            const data = await response.json();
            setShow(false)
            alert(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }



    useEffect(() => {

        const fetchState = async () => {
            const response = await fetch(`${BaseUrl}/api/get/state`);
            const data = await response.json();
            if (data && data?.items?.length > 0) {
                setState(data?.items || []);
            }
        }
        fetchState()
    }, [])



    return (
        <div className="pt-5 px-2">
            <div className="flex justify-between items-center border-b border-red-500 pb-2">
                <h1 className="text-lg font-semibold">State</h1>
                <button onClick={() => { setShow(true) }} className="border rounded-lg px-2 py-1 border-red-500 flex float-start text-md items-center gap-1 text-red-500"><Add /> State</button>
            </div>
            <div>
                <Modal show={show} handleClose={() => { setShow(false) }} size="500px" className="">
                    <div className="pt-1">
                        <InputComponent placeholder={`Enter State name`} label={`State name`} onChange={(e) => { setValues(e) }} className='lg:text-lg' />

                        <Button isDisable={false} name="Create" onClick={handleCreate} className="mt-3" />
                    </div>
                </Modal>
            </div>

            <div className="">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='shadow'>
                            <th scope="col" className="pl-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="pl-1 py-3 text-left font-semibold text-[16px] text-black">
                                Id
                            </th>
                            <th scope="col" className="pl-1 py-3 text-left font-semibold text-[16px] text-black">
                                Category name
                            </th>
                            <th scope="col" className="px-4 py-3 text-right pr-5 font-semibold text-[16px] text-black">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.map((cate) => {
                                return <StateCard cate={cate} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default State