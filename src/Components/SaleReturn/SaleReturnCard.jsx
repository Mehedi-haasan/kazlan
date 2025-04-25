import React from 'react';
import Remove from '../../icons/Remove';

const SaleReturnCard = ({ item, changeqty, onClick }) => {

    return (
        <tr className='border-b'>
            <th scope="col" className="pl-4 py-2 font-thin text-left border-l">{item?.id}</th>
            <th scope="col" className="px-4 py-2 text-left font-thin border-l">{item?.name}</th>
            <th scope="col" className="text-left font-thin">
                <input placeholder={item?.qty} value={item?.qty} onChange={(e) => { changeqty(item?.id, e.target.value) }} className='w-full h-full py-2 focus:outline-none pl-4 border-l' />
            </th>
            <th scope="col" className="pl-4 py-2 text-left font-thin border-l">{item?.product?.cost}</th>
            <th scope="col" className="pl-4 text-left font-thin border-l">{item?.discount}</th>
            <th scope="col" className="pl-4 text-left font-thin border-l">{item?.price}</th>
            <th scope="col" className="pl-4 py-2 text-left font-thin border-l">{parseInt(item?.price) * parseInt(item?.qty)}</th>
            <th scope="col" className="py-2 flex justify-center items-center border-x gap-2 ">
                <Remove onClick={onClick} />
            </th>
        </tr>
    );
};

export default SaleReturnCard;