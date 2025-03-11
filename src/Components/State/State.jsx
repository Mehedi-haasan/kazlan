import { useState, useEffect } from "react"
import Button from "../Input/Button"
import InputComponent from "../Input/InputComponent"
import Modal from "../Input/Modal";
import BaseUrl from '../../Constant'
import Add from "../../icons/Add";
import StateCard from "./StateCard";
import Updown from "../../icons/Updown";
import SelectionComponent from "../Input/SelectionComponent";
import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import ShowEntries from "../Input/ShowEntries";

const State = ({ entries = [], state = [] }) => {

    const [values, setValues] = useState("");
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


    return (
        <div className="pt-5 px-2">
            <div>
                <Modal show={show} handleClose={() => { setShow(false) }} size="500px" className="">
                    <div className="pt-1">
                        <InputComponent placeholder={`Enter State name`} label={`State name`} onChange={(e) => { setValues(e) }} className='lg:text-lg' />

                        <Button isDisable={false} name="Create" onClick={handleCreate} className="mt-3" />
                    </div>
                </Modal>
            </div>

            <div className="flex justify-between items-center px-4 py-1 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">State List</h1>
                <Button onClick={() => { setShow(true) }} name={'Create State'} />
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <ShowEntries options={entries} />
                    </div>
                    <div className="flex justify-start items-center gap-1.5 mt-5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name" className="focus:outline-none border rounded p-1.5 " />
                    </div>
                </div>
                <div className="pt-3">
                    <table class="min-w-[1600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr className='border'>
                                <th className="w-4 py-2 px-4 border-r">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 border-r ">
                                    <div className="flex justify-between items-center">
                                        Name
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-center border-r">
                                    <div className="flex justify-between items-center">
                                        Item Code
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-2 text-right border-r">
                                    <div className="flex justify-between items-center">
                                        status
                                        <Updown />
                                    </div>
                                </th>
                                <th scope="col" className="pl-4 pr-1 py-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                state?.map((item) => (
                                    <StateCard item={item} />
                                ))
                            }


                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center pt-3">
                    <h1>Showing 1 to 3 of 3 entries</h1>
                    <div>
                        <button className="border-y border-l rounded-l py-1.5 px-3 bg-blue-50">Prev</button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">1</button>
                        <button className="border-y border-r rounded-r py-1.5 px-3 bg-blue-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default State