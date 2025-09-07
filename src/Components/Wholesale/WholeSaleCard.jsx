import React from 'react';
import Remove from '../../icons/Remove';

const SellCard = ({ i, item, onClick, ChangeQty, handleEnter }) => {

    const DiscountCalculate = (itm) => {

        let sale = 0;
        const price = parseInt(itm?.price);
        const cost = parseInt(itm?.cost ? itm?.cost : itm?.price);
        const discount = parseInt(itm?.discount);
        const qty = parseInt(itm?.qty);
        if (price == cost) {
            if (itm?.discount_type === "Fixed") {
                sale = (price - discount) * qty;
            } else if (itm?.discount_type === "Percentage") {
                const discountedPrice = price - (price * discount / 100);
                sale = discountedPrice * qty;
            } else {
                sale = price
            }

        } else {
            sale = price * qty
        }

        return sale
    }

    const DiscountCal = (itm) => {
        let sale = 0;
        const price = parseInt(itm?.price) || 0;
        const cost = parseInt(itm?.cost ? itm?.cost : itm?.price);
        const discount = parseInt(itm?.discount) || 0;
        if (price != cost) {
            sale = price
        } else {
            if (itm?.discount_type === "Fixed") {
                sale = (price - discount);
            } else if (itm?.discount_type === "Percentage") {
                const discountedPrice = price - (price * discount / 100);
                sale = discountedPrice;
            }
        }
        return sale
    }

    return (
        <div className={` ${i % 2 === 0 ? ' bg-gray-100' : ''} border-b border-x text-[15px] text-black grid grid-cols-12`}>
            <div scope="col" className="p-2 flex justify-center items-center">
                <Remove onClick={() => { onClick(item?.id) }} />
            </div>
            <div scope="col" className="p-2 font-thin border-l ">
                <input onChange={(e) => { ChangeQty(item?.id, e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") { handleEnter() }
                    }}
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
            <div scope="col" className="p-2 font-thin border-l">{DiscountCal(item)} </div>
            <div scope="col" className="p-2 text-right font-thin border-l">{DiscountCalculate(item)}</div>

        </div>
    );
};

export default SellCard;