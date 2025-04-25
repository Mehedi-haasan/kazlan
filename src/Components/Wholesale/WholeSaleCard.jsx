import React from 'react';
import Remove from '../../icons/Remove';

const SellCard = ({ item, changeqty, changeprice, changedis, onClick }) => {

    return (
        <tr className='border-b'>
            <th scope="col" className="pl-4 py-2 font-thin text-left border-l">{item?.id}</th>
            <th scope="col" className="px-4 py-2 text-left font-thin border-l">{item?.name}</th>
            <th scope="col" className="text-left font-thin">
                <input placeholder={item?.qty} value={item?.qty} onChange={(e) => { changeqty(item?.id, e.target.value) }} className='w-full h-full py-2 focus:outline-none pl-4 border-l' />
            </th>
            <th scope="col" className="pl-4 py-2 text-left font-thin border-l">{item?.cost}</th>
            <th scope="col" className="pl-0 text-left font-thin">
                <input placeholder={item?.discount} value={item?.discount} onChange={(e) => { changedis(item?.id, e.target.value) }} className='w-full h-full py-2 focus:outline-none pl-4 border-l' />
            </th>
            <th scope="col" className="pl-4 text-left font-thin border-l">
                <input placeholder={item?.price} value={item?.price} readOnly={true} onChange={(e) => { changeprice(item?.id, e.target.value) }} className='w-full h-full py-2 focus:outline-none' />
            </th>
            <th scope="col" className="pl-4 py-2 text-left font-thin border-l">{parseInt(item?.price) * parseInt(item?.qty)}</th>
            <th scope="col" className="py-2 flex justify-center items-center border-x gap-2 ">
                <Remove onClick={onClick} />
            </th>
        </tr>
    );
};

export default SellCard;