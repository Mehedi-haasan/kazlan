import { numberToWords, convertToBengaliNumber } from "../Input/Time";


const ReturnInvoicePaymentTotal = ({ user, total, invoice }) => {

    const Calculate = () => {

        let sum = 0
        let due = parseInt(user?.previousdue*-1);

        if (due < 0) {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) + due
        } else {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - due
        }
        return sum
    }



    return (
        <>
            <tr className="bg-white text-[16px] font-thin" id="kalpurush">
                <th className="p-1 "></th>
                <td className="p-1"></td>
                <th className="p-1"></th>
                <td className="p-1">মোট</td>
                <td className="p-1"></td>
                <td className="p-1 text-right">{convertToBengaliNumber(total)}.০</td>
            </tr>
            <tr className="bg-white text-[16px]" id="kalpurush">
                <th className="p-1 font-thin align-top" style={{ paddingBottom: '10px' }} colSpan={3} id="kalpurush">(কথায় : {numberToWords(total + user?.packing + user?.delivery - user?.lastdiscount)})</th>
                <td className="p-1">প্যাকিং, ডেলিভারী</td>
                <td className="p-1">  </td>
                <td className="p-1 text-right">{convertToBengaliNumber(parseInt(user?.packing + user?.delivery))}.০</td>
            </tr>

            <tr className="bg-white text-[16px]" id="kalpurush">
                <th className="pr-6 py-1"></th>
                <th className="p-1"></th>
                <td className="p-1"></td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>ডিসকাউন্ট</td>
                <td className="p-1 border-b border-black">  </td>
                <td className="p-1 text-right border-b border-black">{convertToBengaliNumber(parseInt(user?.lastdiscount || 0))}.০</td>
            </tr>

            <tr className="bg-white text-[16px]" id="kalpurush">
                <th className="pr-6 py-1"></th>
                <th className="p-1"></th>
                <td className="p-1"></td>
                <td className="p-1">সর্বমোট</td>
                <td className="p-1"> </td>
                <td className="p-1 text-right">{convertToBengaliNumber(parseInt(total + user?.packing + user?.delivery - user?.lastdiscount || 0))}.০</td>
            </tr>

            <tr className="bg-white text-[16px]" id="kalpurush">
                <th className="pr-6 py-1"></th>
                <th className="p-1"></th>
                <td className="p-1"></td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>আগের বকেয়া</td>
                <td className="p-1 border-b border-black"></td>
                <td className="p-1 text-right border-b border-black">{convertToBengaliNumber(parseInt(user?.previousdue*-1))}.০</td>
            </tr>
            <tr className="bg-white text-[16px]" id="kalpurush">
                <td className="pr-6 py-1"></td>
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1">অবশিষ্ট</td>
                <td className="p-1"> </td>
                <td className="p-1 text-right">{convertToBengaliNumber(Calculate()*-1)}.০</td>
            </tr>
            <tr className="bg-white text-[16px]" id="kalpurush">
                <td className="pr-6 py-1" colSpan={3}>{invoice?.creator}</td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>জমা</td>
                <td className="p-1 border-b border-black"> </td>
                <td className="p-1 text-right border-b border-black">{convertToBengaliNumber(parseInt(invoice?.paidamount))}.০</td>
            </tr>
            <tr className="bg-white text-[16px]" id="kalpurush">
                <th className="px-1 w-[80px] overline"><h1 className='font-thin text-black' id="kalpurush">বিতরনকারী</h1></th>
                <th className="px-1"><h1 className='font-thin text-black text-right overline' id="kalpurush">ম্যানেজার</h1></th>
                <td className="px-1"></td>
                <td className="px-1">মোট বাকি</td>
                <td className="px-1"></td>
                <td className="px-1 text-right">{convertToBengaliNumber((Calculate()*-1 - (invoice?.paidamount)))}.০</td>
            </tr>
        </>
    )
}

export default ReturnInvoicePaymentTotal
