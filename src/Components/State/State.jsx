import { useState, useEffect } from "react"
import Button from "../Input/Button"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant'
import Edit from "../../icons/Edit";
import Remove from "../../icons/Remove";

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
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">State</h1>
                <Button isDisable={false} name="Add State" onClick={() => { setShow(true) }} className="" />
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
                            <th scope="col" className="pl-1 py-3 text-left">
                                Id
                            </th>
                            <th scope="col" className="pl-1 py-3 text-left">
                                Category name
                            </th>
                            <th scope="col" className="px-4 py-3 text-right pr-5">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.map((cate) => {
                                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cate?.id}
                                    </th>
                                    <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {cate?.name}
                                    </th>
                                    <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">
                                        <Edit size='25px' />
                                        <Remove size='25px' />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default State