

const PaymentTotal = ({ user, total, invoice }) => {


    const convertToBengaliNumber = (num) => {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }


    return (
        <>
            <tr className="bg-white text-[13px] border-black text-black">
                <td className="p-2 border-b">পুর্বের বকেয়া</td>
                <td className="pr-6 py-3 border-b"></td>
                <td className="p-2 border-b"></td>
                <td className="p-2 border-b"></td>
                <td className="p-2 border-b"></td>
                <td className="p-2 text-right border-b">{convertToBengaliNumber(parseInt(invoice?.previousdue))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] border-black text-black">
                <td className="p-2 border-b"> জমা</td>
                <td className="pr-6 py-3 border-b"></td>
                <td className="p-2 border-b"></td>
                <td className="p-2 border-b"></td>
                <td className="p-2 border-b"></td>
                <td className="p-2 text-right border-b"> {convertToBengaliNumber(parseInt(invoice?.paidamount))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-black">
                <td className="p-2"><h1 className='font-tdin text-black'>বিতরনকারী</h1></td>
                <td className="p-2"> </td>
                <td className="p-2"><h1 className='font-tdin text-black'>ম্যানেজার</h1></td>
                <td className="p-2"></td>
                <td className="p-2"> মোট বাকি</td>
                <td className="p-2 text-right">{convertToBengaliNumber(parseInt(invoice?.previousdue) - parseInt(invoice?.paidamount))}.০</td>
            </tr>
        </>
    )
}

export default PaymentTotal
