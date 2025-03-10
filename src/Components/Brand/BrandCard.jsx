import React from "react";
import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";


const BrandCard = ({ item }) => {
    return (
        <tr className='border-b'>
            <th className="w-4 py-2 px-4 border-x">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col" className="px-2 py-2 border-r">{item?.name}</th>
            <th scope="col" className="px-2 py-2 border-r">#{item?.id}</th>
            <th scope="col" className="px-2 py-2 border-r">
                <img src={item?.image_url} alt={item?.image_url} className="h-10 w-10 rounded" />
            </th>
            <th scope="col" className="px-2 py-2 border-r">Active</th>
            <th scope="col" className="px-2 py-2 flex justify-end items-center border-r">
                <Edit />
                <Remove />
            </th>
        </tr>
    )
}

export default BrandCard