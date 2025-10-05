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
        <tr key={item?.id} className="border-b border-x text-[13px]">
            <th className="p-2 font-thin text-center">
                {convertToBengaliNumber(item?.qty)}
            </th>
            <td className="p-2 border-l font-thin">
                {item?.name}, {item?.product?.category?.name}, {item?.product?.edition}
            </td>
            <td className="p-2 border-l font-thin">
                {item?.product?.brand?.name}
            </td>
            <td className="p-2 border-l font-thin text-center">
                {convertToBengaliNumber(parseInt(item?.product?.price))}.০
            </td>
            <td className="p-2 border-l font-thin text-center">
                {convertToBengaliNumber(CalculateSale(item))}.০
            </td>
            <td className="p-2 text-right border-l font-thin">
                {convertToBengaliNumber(item?.sellprice)}.০
            </td>
        </tr>
    )
}

export default InvoiceCard
