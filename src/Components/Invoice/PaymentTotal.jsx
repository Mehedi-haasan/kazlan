

const PaymentTotal = ({ user, total, invoice }) => {


    const convertToBengaliNumber = (num) => {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const Calculate = () => {

        let sum = 0
        let due = parseInt(user?.previousdue);
        if (due > 0) {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - parseInt(invoice?.special_discount) - Math.abs(user?.previousdue)
        } else {
            sum = Math.abs(user?.previousdue) + total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - parseInt(invoice?.special_discount)
        }
        return sum
    }

    const TotalDue = () => {
        let amount = Calculate()
        return amount - parseInt(user?.paidamount)
    }

    return (
        <>
            <tr className="bg-white text-[13px]">
                <td className="p-2 "></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2">মোট</td>
                <td className="p-2 text-right">{convertToBengaliNumber(total)}.০</td>
            </tr>
            <tr className="bg-white text-[13px]">
                <td className="p-2"></td>
                <td className="p-2"> </td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> প্যাকিং </td>
                <td className="p-2 text-right">{convertToBengaliNumber(parseInt(user?.packing))}.০</td>
            </tr>
            <tr className="bg-white text-[13px]">
                <td className="p-2"></td>
                <td className="p-2"> </td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2 border-b">ডেলিভারী</td>
                <td className="p-2 border-b text-right">{convertToBengaliNumber(parseInt(user?.delivery))}.০</td>
            </tr>
            <tr className="bg-white text-[13px]">
                <td className="p-2"></td>
                <td className="p-2 text-xl text-center">{invoice?.status}</td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> সর্বমোট</td>
                <td className="p-2 text-right">{convertToBengaliNumber(total + user?.packing + user?.delivery)}.০</td>
            </tr>

            <tr className="bg-white text-[13px]">
                <td className="pr-6 py-3"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> ডিসকাউন্ট </td>
                <td className="p-2 text-right">{convertToBengaliNumber(parseInt(user?.lastdiscount || 0))}.০</td>
            </tr>
            {invoice?.special_discount > 0 &&
                <tr className="bg-white text-[13px]">
                    <td className="pr-6 py-3"></td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td className="p-2">বিশেষ ডিসকাউন্ট </td>
                    <td className="p-2 text-right">{convertToBengaliNumber(parseInt(invoice?.special_discount || 0))}.০</td>
                </tr>
            }
            <tr className="bg-white text-[13px] ">
                <td className="pr-6 py-3"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2 border-b">পুর্বের বকেয়া</td>
                <td className="p-2 text-right border-b">{convertToBengaliNumber(parseInt(user?.previousdue))}.০</td>
            </tr>
            <tr className="bg-white text-[13px]">
                <td className="pr-6 py-3"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"> অবশিষ্ট</td>
                <td className="p-2 text-right">{convertToBengaliNumber(Calculate())}.০</td>
            </tr>
            <tr className="bg-white text-[13px]">
                <td className="pr-6 py-3"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2 border-b"> জমা</td>
                <td className="p-2 text-right border-b"> {convertToBengaliNumber(parseInt(user?.paidamount || 0))}.০</td>
            </tr>
            <tr className="bg-white text-[13px]">
                <td className="p-2"><h1 className='font-tdin text-black'>বিতরনকারী</h1></td>
                <td className="p-2"> </td>
                <td className="p-2"><h1 className='font-tdin text-black'>ম্যানেজার</h1></td>
                <td className="p-2"></td>
                <td className="p-2"> মোট বাকি</td>
                <td className="p-2 text-right">{convertToBengaliNumber(TotalDue())}.০</td>
            </tr>
        </>
    )
}

export default PaymentTotal
