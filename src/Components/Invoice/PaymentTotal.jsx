import React, { useEffect, useState } from 'react'

const PaymentTotal = ({ data, flatDiscount, percentageDiscount, discountFlat, discountPercentage, discountType, due, pay,changePay, setTotalPrice }) => {
    const [total, setTotal] = useState(0);
    const [actualPrice, setActualPrice] = useState(0);

    useEffect(() => {
        let amount = data.reduce((acc, d) => acc + (parseInt(d?.price) * parseInt(d?.qty) || 0), 0);
        setTotalPrice(amount)
        setActualPrice(amount)
        if (discountType === "Percentage") {
            let discountAmount = (parseInt(percentageDiscount) * parseInt(amount)) / 100;
            setTotal(amount - discountAmount);
        } else {
            let discountParcent = flatDiscount * 100 / amount;
            console.log(parseInt(discountParcent));
            setTotal(amount - flatDiscount);
        }

    }, [data, flatDiscount, percentageDiscount, discountType]);


    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }



    return (
        <>
            <tr className="bg-white">
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
            <tr className="bg-white">
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
            <tr className="bg-white">
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
                    {convertToBengaliNumber(actualPrice * 1)}.০
                </td>
            </tr>

            <tr className="bg-white">
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
                {
                    discountType === "Percentage" ? <td className="pl-6 py-3 text-right">
                        <input type='' value={percentageDiscount} placeholder={convertToBengaliNumber(percentageDiscount)} onChange={discountPercentage} className='w-10 text-right focus:outline-none gap-1' /> %
                    </td> : <td className="pl-6 py-3 text-right">
                        <input type='' value={flatDiscount} placeholder={convertToBengaliNumber(flatDiscount)} onChange={discountFlat} className='w-10 text-right focus:outline-none gap-1' />
                    </td>
                }
            </tr>
            <tr className="bg-white ">
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
            <tr className="bg-white">
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
                    {convertToBengaliNumber(total + due)}.০
                </td>
            </tr>
            <tr className="bg-white">
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
                    <input type='' value={pay} placeholder={convertToBengaliNumber(pay)} onChange={(e)=>changePay(e.target.value)} className='w-10 text-right focus:outline-none gap-1' />
                </td>
            </tr>
            <tr className="bg-white">
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
                    {convertToBengaliNumber(total + due - pay)}.০
                </td>
            </tr>
        </>
    )
}

export default PaymentTotal
