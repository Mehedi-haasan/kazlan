import React from 'react'
import { ReturnSaleCode } from '../Input/Time'

const InvoiceCard = ({ item, prefix = "KB", name }) => {



    return (
        <div key={item?.id} className={`border-b border-x text-[13px] grid ${name === "Income" ? "grid-cols-2" : "grid-cols-3"}`}>
            <h1 className="p-2 font-thin">
                {item?.customername}
            </h1>
            <h1 className={`p-2 border-l font-thin ${name === "Income" ? "hidden" : ""}`}>
                {prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}
            </h1>
            <h1 className="p-2 border-l font-thin text-right">
                {item?.paidamount}
            </h1>
            {/* <h1 className="p-2 border-l font-thin text-right">
                {item?.total}
            </h1> */}
        </div>
    )
}

export default InvoiceCard
