import React from 'react';
import Remove from '../../icons/Remove';

const PurchaseReturnCard = ({ item, changeqty, onClick }) => {

    return (
        <tr className='border-b border-l'>
            <th scope="col" className="flex justify-center items-center py-2">
                <Remove onClick={onClick} />
            </th>
            <th scope="col" className="pl-2 py-2 font-thin text-left border-l">{item?.id}</th>
            <th scope="col" className="px-2 py-2 text-left font-thin border-l">{item?.name}</th>
            <th scope="col" className="text-left font-thin border-l px-2">
                <input placeholder={item?.qty} value={item?.qty} onChange={(e) => { changeqty(item?.id, e.target.value) }} className='w-full h-full py-2 focus:outline-none' />
            </th>
            <th scope="col" className="pl-2 py-2 text-left font-thin border-l">{item?.cost}</th>
            <th scope="col" className="pl-2 text-left font-thin border-l">{item?.discount}</th>
            <th scope="col" className="pl-2 text-left font-thin border-l">{item?.price}</th>
            <th scope="col" className="pl-2 py-2 text-left font-thin border-x">{parseInt(item?.price) * parseInt(item?.qty)}</th>
            
        </tr>
    );
};

export default PurchaseReturnCard;