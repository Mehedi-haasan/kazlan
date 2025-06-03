import React, { useEffect, useState } from 'react';
import Remove from '../../icons/Remove';

const SellCard = ({ i, item, changeqty, changeprice, changedis, onClick, ChangeDiscountType, inputQty }) => {

    const [type, setType] = useState('Percentage')

    useEffect(() => {
        setType(item?.discount_type)
    }, [item])

    return (
        <tr className={` ${i % 2 === 0 ? ' bg-gray-100' : ''} border-b border-x text-[15px] text-black`}>
            <th scope="col" className="py-2 flex justify-center items-center">
                <Remove onClick={() => { onClick(item?.id) }} />
            </th>
            <th scope="col" className="text-left font-thin border-l max-w-28">
                <input placeholder={item?.qty} value={item?.qty} ref={inputQty}
                    onChange={(e) => { changeqty(item?.id, e.target.value) }}
                    className='w-full h-full py-2 focus:outline-none pl-2' />
            </th>
            <th scope="col" className="px-2 py-2 text-left font-thin border-l">{item?.edition}</th>
            <th scope="col" className="px-2 py-2 text-left font-thin border-l">{item?.category?.name}</th>
            <th scope="col" className="px-2 py-2 text-left font-thin border-l">{item?.brand?.name}</th>
            <th scope="col" className="px-2 py-2 text-left font-thin border-l">{item?.name}</th>
            <th scope="col" className="py-2 text-center font-thin border-l">{item?.price}</th>
            <th scope="col" className="border-l text-left font-thin min-w-[200px]">
                <div className='flex justify-start items-center'>
                    <input type='number' value={item?.discount}
                        placeholder={item?.discount}
                        onChange={(e) => { changedis(item?.id, e.target.value) }}
                        className=' px-2 focus:outline-none rounded-l font-thin py-2 w-[60%]' />
                    <select value={type} onChange={(e) => { ChangeDiscountType(e.target.value, item?.id); setType(e.target.value) }}
                        className={`border-l text-[#6B7280] w-[40%] text-sm  focus:outline-none font-thin rounded-r block p-2 `}>
                        {[{ id: 1, name: "Percentage" }, { id: 2, name: "Fixed" }].map(({ id, name }) => (
                            <option key={id} value={name} className='text-[#6B7280]'>{name}</option>
                        ))}
                    </select>

                </div>

            </th>
            <th scope="col" className="pl-2 text-center font-thin border-l">{item?.disPrice || item?.price}</th>
            <th scope="col" className="pl-2 py-2 text-center font-thin border-l">{parseInt(item?.disPrice || item?.price) * parseInt(item?.qty)}</th>

        </tr>
    );
};

export default SellCard;