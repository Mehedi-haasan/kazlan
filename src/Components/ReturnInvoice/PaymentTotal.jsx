

const PaymentTotal = ({ user, total,invoice }) => {


    const convertToBengaliNumber = (num) => {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const Calculate = () => {

        let sum = 0
        let due = parseInt(user?.previousdue);

        if (due < 0) {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) + due
        } else {
            sum =  total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - due 
        }
        return sum
    }



    return (
        <>
            <tr className="bg-white">
                <th className="p-2 "></th>
                <td className="p-2"></td>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2">মোট</td>
                <td className="p-2 text-right">{convertToBengaliNumber(total)}.০</td>
            </tr>
            <tr className="bg-white">
                <th className="p-2"></th>
                <td className="p-2"> </td>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2"> প্যাকিং </td>
                <td className="p-2 text-right">{convertToBengaliNumber(parseInt(user?.packing))}.০</td>
            </tr>
            <tr className="bg-white">
                <th className="p-2"></th>
                <td className="p-2"> </td>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2 border-b">ডেলিভারী</td>
                <td className="p-2 border-b text-right">{convertToBengaliNumber(parseInt(user?.delivery))}.০</td>
            </tr>
            <tr className="bg-white">
                <th className="p-2"></th>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> সর্বমোট</td>
                <td className="p-2 text-right">{convertToBengaliNumber(total + user?.packing + user?.delivery)}.০</td>
            </tr>

            <tr className="bg-white">
                <th className="pr-6 py-3"></th>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> ডিসকাউন্ট </td>
                <td className="p-2 text-right">{convertToBengaliNumber(parseInt(user?.lastdiscount || 0))}.০</td>
            </tr>
            <tr className="bg-white ">
                <th className="pr-6 py-3"></th>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2 border-b">আগের বকেয়া</td>
                <td className="p-2 text-right border-b">{convertToBengaliNumber(parseInt(user?.previousdue))}.০</td>
            </tr>
            <tr className="bg-white">
                <th className="pr-6 py-3"></th>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> অবশিষ্ট</td>
                <td className="p-2 text-right">{convertToBengaliNumber(Calculate())}.০</td>
            </tr>
            <tr className="bg-white">
                <th className="pr-6 py-3"></th>
                <th className="p-2"></th>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2 border-b"> জমা</td>
                <td className="p-2 text-right border-b">{convertToBengaliNumber(parseInt(invoice?.paidamount))}.০</td>
            </tr>
            <tr className="bg-white">
                <th className="p-2"><h1 className='font-thin text-black'>বিতরনকারী</h1></th>
                <th className="p-2"> </th>
                <td className="p-2"><h1 className='font-thin text-black'>ম্যানেজার</h1></td>
                <td className="p-2"></td>
                <td className="p-2"> মোট বাকি</td>
                <td className="p-2 text-right">{convertToBengaliNumber(Calculate())}.০</td>
            </tr>
        </>
    )
}

export default PaymentTotal
