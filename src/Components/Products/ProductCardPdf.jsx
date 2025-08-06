import React from "react";

const ProductCardPdf = ({ item, i }) => {

    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    return (
        <tr className={`border-b z-10 font-thin ${i % 2 === 1 ? 'bg-[#FAF9EE]' : ''}`}>
            <td scope="col" className="px-2 py-2.5 border-x  text-[#212529]">{item?.name} {item?.edition}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{item?.brand?.name}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{item?.category?.name}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{item?.company?.name}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{item?.price}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{item?.qty} {item?.qty_type}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{item?.creator}</td>
            <td scope="col" className="px-2 py-2.5 border-r  text-[#212529]">{formatDate(item?.createdAt)}</td>
        </tr>
    );
};

export default ProductCardPdf;
