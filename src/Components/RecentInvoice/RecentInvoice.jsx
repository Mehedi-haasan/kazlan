import React from "react";
import { NavLink } from "react-router-dom";
import ShowEntries from "../Input/ShowEntries";
import Invoice from "./Invoice";


const RecentInvoice = ({ entries }) => {
    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <div className="flex justify-between items-center px-4 py-3 bg-[#FFFFFF] rounded shadow">
                <h1 className="font-semibold text-lg">Customer List</h1>
                <NavLink to={`/registration`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4`}>Create Customer</NavLink>
            </div>
            <div className="bg-[#FFFFFF] p-4 shadow rounded-lg mt-2">
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={entries} />
                    </div>
                    <div className="flex justify-end items-center gap-1.5">
                        <h1>Search : </h1>
                        <input placeholder="Enter name" className="focus:outline-none border rounded p-1" />
                    </div>
                </div>
                <Invoice />
                <div className="flex justify-between items-center pt-3">
                    <h1>Showing 1 to 3 of 3 entries</h1>
                    <div>
                        <button className="border-y border-l rounded-l py-1.5 px-3">Prev</button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">1</button>
                        <button className="border-y border-r rounded-r py-1.5 px-3">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentInvoice
