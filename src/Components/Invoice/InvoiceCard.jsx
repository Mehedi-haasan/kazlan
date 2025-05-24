import React from 'react'

const InvoiceCard = ({ item }) => {

    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const CalculateSale = (item) => {
        let discount = parseInt(parseInt(item?.price) * parseInt(item?.discount) / 100);
        let price = parseInt(item?.price)
        return price - parseInt(discount)
    }

    return (
        <tr key={item?.id} className="border-b border-x">
            <th className="p-2 font-thin text-center">
                {convertToBengaliNumber(item?.qty)}
            </th>
            <td className="p-2 border-l font-thin text-center">
                {item?.name}
            </td>
            <td className="p-2 border-l font-thin text-center">
                {item?.product?.brand?.name}
            </td>
            <td className="p-2 border-l font-thin text-center">
                {convertToBengaliNumber(parseInt(item?.price))}.০
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
