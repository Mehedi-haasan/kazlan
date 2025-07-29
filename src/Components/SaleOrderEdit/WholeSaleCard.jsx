import React from 'react';
import Remove from '../../icons/Remove';

const SellCard = ({ i, item, onClick, ChangeQty }) => {
    return (
        <div className={` ${i % 2 === 0 ? ' bg-gray-100' : ''} border-b border-x text-[15px] text-black grid grid-cols-12`}>
            <div scope="col" className="p-2 flex justify-center items-center">
                <Remove onClick={() => { onClick(item?.id) }} />
            </div>
            <div scope="col" className="p-2 font-thin border-l ">
                <input onChange={(e) => { ChangeQty(item?.id, e.target.value) }}
                placeholder={item?.qty} value={item?.qty} 
                className='focus:outline-none w-full h-full'
                />
            </div>
            <div scope="col" className="p-2 font-thin border-l">{item?.product?.year ? item?.product?.year : item?.edition}</div>
            <div scope="col" className="p-2 font-thin border-l">{item?.product?.category?.name ? item?.product?.category?.name : item?.category?.name}</div>
            <div scope="col" className="p-2 font-thin border-l">{item?.product?.brand?.name ? item?.product?.brand?.name : item?.brand?.name}</div>
            <div scope="col" className="p-2 font-thin border-l grid col-span-2">{item?.name}</div>
            <div scope="col" className="p-2 font-thin border-l">{item?.product?.cost ? item?.product?.cost : item?.cost}</div>
            <div scope="col" className="p-2 font-thin border-l">{item?.discount}</div>
            <div scope="col" className="p-2 font-thin border-l">{item?.discount_type}</div>
            <div scope="col" className="p-2 font-thin border-l">{item?.product?.price ? item?.product?.price : item?.price}</div>
            <div scope="col" className="p-2 text-right font-thin border-l">{parseInt(item?.disPrice || item?.price) * parseInt(item?.qty)}</div>

        </div>
    );
};

export default SellCard;