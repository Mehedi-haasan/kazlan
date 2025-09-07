import React from "react";

const Tableheader = () => {
    return (
        <thead className="text-gray-900 dark:bg-[#040404] dark:text-white">
            <tr className='border font-thin'>
                <th scope="col" className="p-2">Name</th>
                <th scope="col" className="p-2 border-l">Invoice No</th>
                <th scope="col" className="p-2 border-l text-right">Amount</th>
            </tr>
        </thead>
    )
}

export default Tableheader