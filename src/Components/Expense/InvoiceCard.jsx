import React from 'react'

const InvoiceCard = ({ item, prefix = "KB" }) => {

    function convertToBengaliNumber(num) {
        const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
    }

    const ReturnSaleCode = (type) => {
        let saleType = "SL"
        if (type === "Sale") {
            saleType = "SL"
        } else if (type === "Sale Return") {
            saleType = "SR"
        } else if (type === "Return Purchase") {
            saleType = "PR"
        } else if (type === "Purchase items") {
            saleType = "PO"
        }else if (type === "Expense") {
            saleType = "EX"
        }

        return saleType
    }


    return (
        <div key={item?.id} className="border-b border-x text-[13px] grid grid-cols-3">
            <h1 className="p-2 font-thin">
                {item?.customername}
            </h1>
            <h1 className="p-2 border-l font-thin">
                {prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}
            </h1>
            <h1 className="p-2 border-l font-thin text-right">
                {item?.paidamount}
            </h1>
        </div>
    )
}

export default InvoiceCard
