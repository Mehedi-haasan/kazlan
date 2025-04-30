import React from 'react';
import Remove from '../../icons/Remove';

const SellCard = ({ item, changeqty, changeprice, changedis, onClick }) => {




    return (
        <tr className='border-b bg-gray-100'>
            <th scope="col" className="py-2 flex justify-center items-center border-x">
                <Remove onClick={onClick} />
            </th>
            <th scope="col" className="pl-2 py-2 font-thin text-left border-l">{item?.id}</th>
            <th scope="col" className="px-2 py-2 text-left font-thin border-l">{item?.name}</th>
            <th scope="col" className="text-left font-thin">
                <input placeholder={item?.qty} value={item?.qty} onChange={(e) => { changeqty(item?.id, e.target.value) }} className='w-full h-full py-2 focus:outline-none pl-4 border-l border-dashed' />
            </th>
            <th scope="col" className="pl-2 py-2 text-left font-thin border-l">{item?.price}</th>
            <th scope="col" className="pl-0 text-left font-thin">
                <input placeholder={item?.discount} value={item?.discount} onChange={(e) => { changedis(item?.id, e.target.value) }} className='w-full h-full p-2 focus:outline-none border-l' />
            </th>
            <th scope="col" className="pl-2 text-left font-thin border-l">{item?.disPrice || item?.price}</th>
            <th scope="col" className="pl-2 py-2 text-left font-thin border-l">{parseInt(item?.disPrice || item?.price) * parseInt(item?.qty)}</th>

        </tr>
    );
};

export default SellCard;