import React from 'react'

const InvoiceCard = ({ item }) => {

    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const CalculateSale = (item) => {
        let sale = 0;

        if (item?.discount_type === "Fixed") {
            sale = parseInt(item?.discount)
        } else if (item?.discount_type === "Percentage") {
            let discount = parseInt(parseInt(item?.product?.price) * parseInt(item?.discount) / 100);
            sale = discount
        }
        return parseInt(item?.product?.price) - parseInt(sale)
    }

    return (
        <tr key={item?.id} className="border-b border-x border-black text-[15px] text-black" id="kalpurush">
            <td className="p-1 font-thin text-center align-top" style={{ paddingBottom: '10px' }} >
                {convertToBengaliNumber(item?.qty)}
            </td>
            <td className="p-1 border-l border-black font-thin align-top" style={{ paddingBottom: '10px' }}>
                {item?.name}, {item?.product?.category?.name}, {item?.product?.edition}
            </td>
            <td className="p-1 border-l border-black font-thin align-top" style={{ paddingBottom: '10px' }}>
                {item?.product?.brand?.name}
            </td>
            <td className="p-1 border-l border-black font-thin text-center align-top" style={{ paddingBottom: '10px' }}>
                {convertToBengaliNumber(parseInt(item?.product?.price))}.০
            </td>
            <td className="p-1 border-l border-black font-thin text-center align-top" style={{ paddingBottom: '10px' }}>
                {convertToBengaliNumber(CalculateSale(item))}.০
            </td>
            <td className="p-1 text-right border-l border-black font-thin align-top" style={{ paddingBottom: '10px' }}>
                {convertToBengaliNumber(item?.sellprice)}.০
            </td>
        </tr>
    )
}

export default InvoiceCard
