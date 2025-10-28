import React, { useState } from "react";
import Updown from "../../icons/Updown";
import { ReturnSaleCode, formatDate } from "../Input/Time";
import Modal from "../Input/Modal";
import PreviewInvoice from "../Invoice/PreviewInvoice";
import PreviewReturnInvoice from "../Invoice/PreviewReturnInvoice";
import PreviewOpeningInvoice from "../Invoice/PreviewOpeningInvoice";
import PreviewPurchaseInvoice from "../Invoice/PreviewPurchaseInvoice";
import PreviewPurchaseReturnInvoice from "../Invoice/PreviewPurchaseReturnInvoice";

const InvoiceTemp = ({ invoices = [], prefix = "KB", info = {}, usertype = "Customer", date_type = "Delivery Date", is_due = true }) => {


    const [invopreview, setInvoPreview] = useState(false);
    const [id, setId] = useState(1)
    const [type, setType] = useState('')
    const [user_type, setUserType] = useState("")



    return (
        <div className="pt-3">
            <div className="w-full overflow-hidden overflow-x-auto">
                <table className="text-sm text-left text-gray-500 w-full min-w-[700px] rounded">
                    <thead className="text-sm text-left  text-black rounded bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                        <tr className='border'>
                            <th scope="col" className="px-3 py-3 border-r ">
                                <div className="flex justify-between items-center">
                                    Date
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 border-r ">
                                <div className="flex justify-between items-center">
                                    Invoice
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    {usertype}
                                    <Updown />
                                </div>
                            </th>
                            {info?.role === "superadmin" && <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Warehouse
                                    <Updown />
                                </div>
                            </th>}
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Total
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Paid
                                    <Updown />
                                </div>
                            </th>
                            {is_due && <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Due
                                    <Updown />
                                </div>
                            </th>}
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Return
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Created by
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Edited
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Invoice Type
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Order Type
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-right border-r ">
                                <div className="flex justify-between items-center">
                                    {date_type}
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-right border-r ">
                                <div className="flex justify-between items-center">
                                    Preview
                                    <Updown />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((item, i) => (
                            <tr key={i} onClick={() => { setId(item?.id); setType(item?.type); setInvoPreview(true) }} className={`border-b cursor-pointer ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                <th scope="col" className="px-3 py-2 border-x font-thin ">{formatDate(item?.created_date)}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin" >{item?.customername}</th>
                                {info?.role === "superadmin" && <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.shopname}</th>}
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.total}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.paidamount}</th>
                                {is_due && <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.due}</th>}
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.return}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.creator}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin">
                                    <div className="flex justify-center items-center">
                                        {item?.is_edit && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd" />
                                        </svg>}
                                    </div>
                                </th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.type}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.order_type}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{formatDate(item?.deliverydate)}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin flex justify-center items-center">
                                    <button onClick={() => { setId(item?.id); setType(item?.type); setInvoPreview(true) }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962" />
                                                <circle cx="12" cy="12" r="3" />
                                            </g>
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

                <Modal show={invopreview} handleClose={() => setInvoPreview(false)} size={`1000px`} crosshidden={true}>
                    {/* Sale */}
                    {type === "Sale" && <PreviewInvoice info={info} id={id} type={type} usertype={user_type} />}
                    {/* Purchase */}
                    {type === "Purchase items" && <PreviewPurchaseInvoice info={info} id={id} type={type} usertype={user_type} />}
                    {/* Sale Return */}
                    {type === "Sale Return" && <PreviewReturnInvoice info={info} id={id} type={type} usertype={user_type} />}
                    {/* Purchase Return */}
                    {type === "Return Purchase" && <PreviewPurchaseReturnInvoice info={info} id={id} type={type} usertype={user_type} />}

                    {(type === "Opening" || type === "Make Payment" || type === "Yearly Bonus" || type === "Online Collection") && <PreviewOpeningInvoice info={info} usertype={user_type} id={id} type={type} />}
                </Modal>
            </div>
        </div>
    )
}

export default InvoiceTemp
