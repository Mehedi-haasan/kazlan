import React from 'react'

const InvoiceCard = ({ id, name, qty, price }) => {
    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }
    return (
        <tr key={id} className="bg-white dark:bg-gray-800 border-b">
            <th scope="row" className="pr-6 pl-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {convertToBengaliNumber(qty)}
            </th>
            <td className="px-6 py-3 text-center">
                {name}
            </td>
            <td className="px-6 py-3 text-center">
                {"Islamia Library"}
            </td>
            <td className="pl-6 py-3 text-right">
                {convertToBengaliNumber(price)}
            </td>
            <td className="pl-6 py-3 text-right">
                {convertToBengaliNumber(price * qty)}
            </td>
            <td className="pl-6 py-3 text-right">
                {convertToBengaliNumber(price * qty)}
            </td>
        </tr>
    )
}

export default InvoiceCard
