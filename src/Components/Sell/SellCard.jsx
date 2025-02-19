import React from 'react';

const SellCard = ({ product, onClick }) => {

    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    return (
        <tr key={product?.id} onClick={onClick} className="bg-white dark:bg-gray-800 border-b">
            <th scope="row" className="pr-6 pl-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product?.qty}
            </th>
            <td className="px-6 py-3 text-center">
                {product?.name}
            </td>
            <td className="px-6 py-3 text-center">
                {"Islamia Library"}
            </td>
            <td className="pl-6 py-3 text-right">
                {convertToBengaliNumber(product?.price)}
            </td>
            <td className="pl-6 py-3 text-right">
                {convertToBengaliNumber(product?.price * product.qty)}
            </td>
            <td className="pl-6 py-3 text-right">
                {convertToBengaliNumber(product?.price * product.qty)}
            </td>
        </tr>
    );
};

export default SellCard;