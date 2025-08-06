import React from "react";

import logo from '../Logo/photo.png'

const BrandCardPdf = ({ item, i }) => {


    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }


    return (
        <tr className={`${i % 2 === 1 ? 'bg-[#FAF9EE]' : ''} border-b`}>

            <th scope="col" className="px-2 py-1.5 border-x font-thin text-[#212529]">{item?.name} </th>
            <th scope="col" className="px-2 py-1 border-r">
                <img src={item?.image_url ? item?.image_url : logo} alt={item?.image_url ? item?.image_url : logo} className="h-8 w-8 rounded" />
            </th>
            <th scope="col" className="px-2 py-1.5 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-1.5 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
        </tr>
    )
}

export default BrandCardPdf