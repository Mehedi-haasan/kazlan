import React from "react";


const PayHisCard = ({ item, i, isChecked }) => {


    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    return (
        <tr className={`border-b ${i % 2 == 0 ? 'bg-gray-100' : ''}`}>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.customername}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.total}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.paidamount}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.due}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
        </tr>
    );
};

export default PayHisCard;
