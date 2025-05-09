import React from 'react';
import Remove from '../../icons/Remove';

const SellCard = ({ item, onClick }) => {


    return (
        <tr className='border-b'>
            <th scope="col" className="pr-6 py-2 ">{item?.id}</th>
            <th scope="col" className="px-4 py-2 text-center">{item?.name}</th>
            <th scope="col" className="px-4 py-2 text-center">{item?.qty}</th>
            <th scope="col" className="pl-4 py-2 text-right">{item?.price}</th>
            <th scope="col" className="pl-4 py-2 text-right">{item?.price}</th>
            <th scope="col" className="pl-4 py-2 text-right">{item?.comn}</th>
            <th scope="col" className="pl-4 py-2 text-right">{parseInt(item?.price) * parseInt(item?.qty)}</th>
            <th scope="col" className="pl-4 py-2 flex justify-end items-center"><Remove /></th>
        </tr>
    );
};

export default SellCard;