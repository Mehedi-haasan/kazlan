import React, { useEffect, useState } from "react";
import InvoiceTemp from "./InvoiceTemp";
import BaseUrl from "../../Constant";


const Invoice = ({info={}}) => {

    const [pageSize, setPageSize]=useState(15)
    const [invoices, setInvoices] = useState([]);
    const RecentInvoice = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/user/recent/order/${1}/20`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();
        setInvoices(data?.items)
    }

    useEffect(() => {
        RecentInvoice(invoices)
    }, [])




    return (
        <div className="pt-3">
            <div className="w-full overflow-hidden overflow-x-auto">
                <InvoiceTemp invoices={invoices}  prefix={info?.shopcode}/>
            </div>
        </div>
    )
}

export default Invoice
