import { numberToWords, convertToBengaliNumber } from "../Input/Time";


const PurchaseInvoicePaymentTotal = ({ user, total, invoice, info }) => {



    const Calculate = () => {

        let sum = 0
        let due = parseInt(user?.previousdue * -1);
        if (due > 0) {
            sum = total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - parseInt(invoice?.special_discount) - user?.previousdue
        } else {
            sum = user?.previousdue + total + parseInt(user?.packing) + parseInt(user?.delivery) - parseInt(user?.lastdiscount) - parseInt(invoice?.special_discount)
        }
        return sum
    }

    const TotalDue = () => {
        let amount = Calculate()
        return amount - parseInt(user?.paidamount)
    }

    const get_total = () => {
        return total + user?.packing + user?.delivery - user?.lastdiscount - invoice?.special_discount
    }

    return (
        <>
            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1">মোট</td>
                <td className="p-1"></td>
                <td className="p-1 text-right">{convertToBengaliNumber(total)}.০</td>
            </tr>
            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="py-1" colSpan={3}>(কথায় : {numberToWords(get_total())})</td>
                <td className="p-1">প্যাকিং, ডেলিভারী</td>
                <td className="p-1">  </td>
                <td className="p-1 text-right">{convertToBengaliNumber(parseInt(user?.packing + user?.delivery))}.০</td>
            </tr>


            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="pr-6 py-1"></td>
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>ডিসকাউন্ট</td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>  </td>
                <td className="p-1 text-right border-b border-black align-top" style={{ paddingBottom: '10px' }}>{convertToBengaliNumber(parseInt(user?.lastdiscount || 0))}.০</td>
            </tr>
            {invoice?.special_discount > 0 &&
                <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                    <td className="pr-6 py-1"></td>
                    <td className="p-1"></td>
                    <td className="p-1"></td>
                    <td className="p-1">বিশেষ ডিসকাউন্ট</td>
                    <td className="p-1"></td>
                    <td className="p-1 text-right">{convertToBengaliNumber(parseInt(invoice?.special_discount || 0))}.০</td>
                </tr>
            }

            <tr className="bg-white text-[16px] font-thin text-black" id="kalpurush">
                <th className="pr-6 py-1"></th>
                <th className="p-1"></th>
                <td className="p-1"></td>
                <td className="p-1">সর্বমোট</td>
                <td className="p-1"></td>
                <td className="p-1 text-right">{convertToBengaliNumber(get_total())}.০</td>
            </tr>
            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="pr-6 py-1"></td>
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>পুর্বের বকেয়া</td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}></td>
                <td className="p-1 text-right border-b border-black align-top" style={{ paddingBottom: '10px' }}>{convertToBengaliNumber(parseInt(user?.previousdue * -1))}.০</td>
            </tr>
            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="pr-6 py-1" colSpan={3}></td>
                <td className="p-1">অবশিষ্ট</td>
                <td className="p-1"> </td>
                <td className="p-1 text-right">{convertToBengaliNumber((get_total() + (user?.previousdue))*-1)}.০</td>
            </tr>
            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="pr-6 py-1" colSpan={3}>{invoice?.creator}</td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}>জমা</td>
                <td className="p-1 border-b border-black align-top" style={{ paddingBottom: '10px' }}> </td>
                <td className="p-1 text-right border-b border-black align-top" style={{ paddingBottom: '10px' }}>{convertToBengaliNumber(parseInt(user?.paidamount || 0))}.০</td>
            </tr>
            <tr className="bg-white text-[16px] text-black font-thin" id="kalpurush">
                <td className="p-1"><h1 className='font-thin text-black overline'>বিতরনকারী</h1></td>
                <td className="p-1"><h1 className='font-thin text-black text-right overline'>ম্যানেজার</h1> </td>
                <td className="p-1"></td>
                <td className="p-1">মোট বাকি</td>
                <td className="p-1"> </td>
                <td className="p-1 text-right">{convertToBengaliNumber((invoice?.previousdue + invoice?.total - invoice?.paidamount)*-1)}.০</td>
            </tr>
        </>
    )
}

export default PurchaseInvoicePaymentTotal
