import React from "react";
import { formatDate, ReturnSaleCode } from "../Input/Time";


const ProTranCard = ({ item, i, isChecked, prefix = "KB" }) => {


    return (
        <tr className={`border-b ${i % 2 === 1 ? 'bg-[#FAF9EE]' : ''}`}>
            {/* <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th> */}
            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{formatDate(item?.created_date)}</th>
            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.invoice_id).padStart(5, '0')}</th>
            <th scope="col" className="px-2 py-2 border-x font-thin text-[#212529]">{item?.type}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.price}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.sellprice}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.qty} {item?.qty_type}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.qty}</th>
            <th scope="col" className="px-2 py-2 border-r font-thin text-[#212529]">{item?.creator}</th>
        </tr>
    );
};

export default ProTranCard;
