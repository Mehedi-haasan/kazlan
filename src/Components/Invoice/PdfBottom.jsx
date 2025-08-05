

const PdfBottom = ({ user, total }) => {


    const convertToBengaliNumber = (num) => {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const Calculate = () => {

        let sum = 0
        let due = parseInt(user?.previousdue);

        if (due < 0) {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - Math.abs(user?.previousdue)
        } else {
            sum = Math.abs(user?.previousdue) + total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount)
        }
        return sum
    }

    const TotalDue = () => {
        let amount = Calculate()
        return amount - parseInt(user?.paidamount)
    }

    return (
        <>
            <tr className="bg-white text-gray-700 font-thin">
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]">মোট</td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] text-right">{convertToBengaliNumber(total)}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"> </td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"> প্যাকিং </td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] text-right">{convertToBengaliNumber(parseInt(user?.packing))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"> </td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] border-b">ডেলিভারী</td>
                <td className="p-1 text-[13px] border-b"></td>
                <td className="p-1 text-[13px] border-b text-right">{convertToBengaliNumber(parseInt(user?.delivery))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"> সর্বমোট</td>
                <td className="p-1 text-[13px]"></td>

                <td className="p-1 text-[13px] text-right">{convertToBengaliNumber(total + user?.packing + user?.delivery)}.০</td>
            </tr>

            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="pr-6 py-3"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"> ডিসকাউন্ট </td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] text-right">{convertToBengaliNumber(parseInt(user?.lastdiscount || 0))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="pr-6 py-3"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] border-b">পুর্বের বকেয়া</td>
                <td className="p-1 text-[13px] border-b"></td>
                <td className="p-1 text-[13px] text-right border-b">{convertToBengaliNumber(parseInt(user?.previousdue))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="pr-6 py-3"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"> অবশিষ্ট</td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] text-right">{convertToBengaliNumber(Calculate())}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="pr-6 py-3"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] border-b"> জমা</td>
                <td className="p-1 text-[13px] border-b"></td>
                <td className="p-1 text-[13px] text-right border-b"> {convertToBengaliNumber(parseInt(user?.paidamount || 0))}.০</td>
            </tr>
            <tr className="bg-white text-[13px] text-gray-700 font-thin">
                <td className="p-1 text-[13px]"><h1 className='font-tdin text-black'>বিতরনকারী</h1></td>
                <td className="p-1 text-[13px]"><h1 className='font-tdin text-black text-right'>ম্যানেজার</h1></td>
                <td className="p-1 text-[13px]"> </td>
                <td className="p-1 text-[13px]"> মোট বাকি</td>
                <td className="p-1 text-[13px]"></td>
                <td className="p-1 text-[13px] text-right">{convertToBengaliNumber(TotalDue())}.০</td>
            </tr>
        </>
    )
}

export default PdfBottom
