import React, { useEffect, useState } from 'react'

const Caculation = ({ data, discount, discountType, due, pay }) => {
    const [total, setTotal] = useState(0);
    const [actualPrice, setActualPrice] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);

    useEffect(() => {
        let amount = data.reduce((acc, d) => acc + (parseInt(d?.price) * parseInt(d?.qty) || 0), 0);
        // setActualPrice(amount)
        if (discountType === "Percentage") {
            // setDiscountAmount(parseInt(discount));
        } else {
            // setDiscountAmount(parseInt(actualPrice * discount / 100));
        }

    }, [data, discountType, discountAmount]);


    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }


    return (
        <>
            <tr className="">
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-black font-semibold">
                    মোট
                </td>
                <td className="pl-6 py-3 text-right">
                    {convertToBengaliNumber(actualPrice)}.০
                </td>
            </tr>
            <tr className="">
                <th scope="row" className="pr-6 py-2">

                </th>
                <td className="px-6 py-2 text-center">

                </td>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-2 text-center border-b-2 border-black text-black font-semibold">
                    প্যাকিং
                </td>
                <td className="pl-6 py-2 text-right border-b-2 border-black">
                    ০০.০
                </td>
            </tr>
            <tr className="">
                <th scope="row" className="pr-6 py-3 text-black">
                    সর্বমোট
                </th>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-xl text-black ">
                    সর্বমোট
                </td>
                <td className="pl-6 py-3 text-right">
                    {convertToBengaliNumber(parseInt(actualPrice))}.০
                </td>
            </tr>

            <tr className="">
                <th scope="row" className="pr-6 py-3">

                </th>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-xl text-black">
                    ডিসকাউন্ট
                </td>
                <td className="pl-6 py-3 text-right text-black">
                    {convertToBengaliNumber(parseInt(discountAmount))}.০
                </td>

            </tr>
            <tr className=" ">
                <th scope="row" className="pr-6 py-3">

                </th>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-xl border-b-2 border-black text-black">
                    আগের বকেয়া
                </td>
                <td className="pl-6 py-3 text-right border-b-2 border-black text-black">
                    {convertToBengaliNumber(parseInt(due))}.০
                </td>
            </tr>
            <tr className="">
                <th scope="row" className="pr-6 py-3">

                </th>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-xl text-black ">
                    অবশিষ্ট
                </td>
                <td className="pl-6 py-3 text-right">
                    {convertToBengaliNumber(parseInt(actualPrice + due - discountAmount))}.০
                </td>
            </tr>
            <tr className="">
                <th scope="row" className="pr-6 py-3">

                </th>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-xl border-b-2 border-black text-black">
                    জমা
                </td>
                <td className="pl-6 py-3 text-right border-b-2 border-black text-black">
                    {convertToBengaliNumber(parseInt(pay))}.০
                </td>
            </tr>
            <tr className="">
                <th scope="row" className="pr-6 py-3">
                    <h1 className='font-semibold text-lg text-black'>বিতরনকারী</h1>
                </th>
                <th scope="row" className="pr-6 py-3 ">

                </th>
                <td className="px-6 py-3 text-center">
                    <h1 className='font-semibold text-lg text-black'>ম্যানেজার</h1>
                </td>
                <td className="px-6 py-3 text-center">

                </td>
                <td className="px-6 py-3 text-center text-xl text-black font-bold">
                    মোট বাকি
                </td>
                <td className="pl-6 py-3 text-right">
                    {convertToBengaliNumber((actualPrice + due) - (discountAmount + pay))}.০
                </td>
            </tr>
        </>
    )
}

export default Caculation
