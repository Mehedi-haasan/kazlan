import React, { useState } from "react";
import Updown from "../../icons/Updown";
import { ReturnSaleCode, formatDate } from "../Input/Time";
import { NavLink } from "react-router-dom";
import Edit from "../../icons/Edit";
import Remove from "../../icons/Remove";
import DownModal from "../Input/DownModal";
import BaseUrl from "../../Constant";
import Modal from "../Input/Modal";
import PreviewInvoice from "../Invoice/PreviewInvoice";
import PreviewReturnInvoice from "../Invoice/PreviewReturnInvoice";
import PreviewOpeningInvoice from "../Invoice/PreviewOpeningInvoice";
import PreviewPurchaseInvoice from "../Invoice/PreviewPurchaseInvoice";
import PreviewPurchaseReturnInvoice from "../Invoice/PreviewPurchaseReturnInvoice";


const RecentReceipt = ({ invoices = [], prefix = "KB", info = {}, RecentInvoice }) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const [invopreview, setInvoPreview] = useState(false);
    const [id, setId] = useState(1)
    const [type, setType] = useState('')
    const [userType, setUserType] = useState("")
    const ModalOpen = (id) => {
        if (id === selected) {
            setSelected(null)
        } else {
            setSelected(id)
        }
    }

    const DeleteInvoice = async (id) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${BaseUrl}/api/delete/invoice/${id}`, {
                method: 'DELETE',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                }
            });

            const data = await response.json();
            setMessage({ id: Date.now(), mgs: data?.message });
            RecentInvoice()
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }


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
                                    Reciept No
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Customer
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
                                    Amount
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Receipt Type
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
                                    Created At
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
                                    Order Type
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-center border-r ">
                                <div className="flex justify-between items-center">
                                    Preview
                                    <Updown />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((item, i) => (
                            <tr key={i} className={`border-b cursor-pointer ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                <th scope="col" className="px-3 py-2 border-x font-thin ">{formatDate(item?.created_date)}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.customername}</th>
                                {info?.role === "superadmin" && <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.shopname}</th>}
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.paidamount}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.type}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.creator}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{formatDate(item?.created_date)}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin">
                                    <div className="flex justify-center items-center">
                                        {item?.is_edit && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z" clipRule="evenodd" />
                                        </svg>}
                                    </div>
                                </th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.order_type}</th>
                                <td scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2 relative">
                                    {/* {
                                        selected === item?.id && <div className="absolute -top-12 bg-white dark:bg-[#040404] dark:text-white shadow-xl rounded-md right-14 w-[125px] p-[5px] z-50 border border-red-500 font-semibold">
                                            <NavLink to={`/edit/user/balance/${item?.userId}/${item?.id}/${item?.type}`} className="flex justify-start items-center gap-[7px] cursor-pointer hover:bg-gray-200 px-1 py-[2px] rounded text-xs">
                                                <Edit size="17px" /><h1 className="mt-[3px]">Edit</h1>
                                            </NavLink>
                                            <NavLink to={`/opening/invoice/${item?.id}/${item?.type}`} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4.58 8.607L2 8.454C3.849 3.704 9.158 1 14.333 2.344c5.513 1.433 8.788 6.918 7.314 12.25c-1.219 4.411-5.304 7.337-9.8 7.406" /><path stroke-dasharray=".5 3" d="M12 22C6.5 22 2 17 2 11" /><path d="M13.604 9.722c-.352-.37-1.213-1.237-2.575-.62c-1.361.615-1.577 2.596.482 2.807c.93.095 1.537-.11 2.093.47c.556.582.659 2.198-.761 2.634s-2.341-.284-2.588-.509m1.653-6.484v.79m0 6.337v.873" /></g>
                                                </svg><h1 className="">Preview</h1>
                                            </NavLink>
                                            <div onClick={() => { setShow(true); }} className={`${info?.role === "admin" ? 'hidden' : ''} flex justify-start text-xs items-center gap-2.5 cursor-pointer text-red-500 hover:bg-gray-200 px-[5px] py-[2px] rounded`}>
                                                <Remove size="15px" onClick={() => { setShow(true); DeleteInvoice(item?.id) }} className={`text-red-500`} /><h1 className="mt-[3px]">Delete</h1>
                                            </div>
                                        </div>
                                    } */}
                                    <button onClick={() => { setId(item?.id); setType(item?.type); setInvoPreview(true); setUserType(item?.customer?.usertype) }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19s-7.764-4.013-9.257-5.962a1.69 1.69 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5s7.764 4.013 9.257 5.962" />
                                                <circle cx="12" cy="12" r="3" />
                                            </g>
                                        </svg>
                                    </button>
                                    {/* <DownModal show={show} handleClose={() => { setShow(false) }} size={``} className=''>
                                        <h1 className="py-3 text-sm font-thin">Are you sure you want to delete this?</h1>
                                        <div className="flex justify-between items-center p-4">
                                            <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 bg-blue-500 text-white">No</button>
                                            <button onClick={() => { setShow(false) }} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
                                        </div>
                                    </DownModal> */}
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                {/* <Modal show={invopreview} handleClose={() => setInvoPreview(false)} size={`1000px`} crosshidden={true}>
                    {(type === "Sale" || type === "Purchase items") && <PreviewInvoice id={id} type={type} usertype={values?.usertype} />}
                    {(type === "Sale Return" || type === "Return Purchase") && <PreviewReturnInvoice id={id} type={type} usertype={values?.usertype} />}
                    {(type === "Opening" || type === "Make Payment" || type === "Yearly Bonus" || type === "Online Collection") && <PreviewOpeningInvoice usertype={values?.usertype} info={info} id={id} type={type} />}
                </Modal> */}
                <Modal show={invopreview} handleClose={() => setInvoPreview(false)} size={`1000px`} crosshidden={true}>
                    {/* Sale */}
                    {type === "Sale" && <PreviewInvoice info={info} id={id} type={type} usertype={userType} />}
                    {/* Purchase */}
                    {type === "Purchase items" && <PreviewPurchaseInvoice info={info} id={id} type={type} usertype={userType} />}
                    {/* Sale Return */}
                    {type === "Sale Return" && <PreviewReturnInvoice info={info} id={id} type={type} usertype={userType} />}
                    {/* Purchase Return */}
                    {type === "Return Purchase" && <PreviewPurchaseReturnInvoice info={info} id={id} type={type} usertype={userType} />}

                    {(type === "Opening" || type === "Make Payment" || type === "Yearly Bonus" || type === "Online Collection") &&
                        <PreviewOpeningInvoice info={info} usertype={userType} id={id} type={type} />}
                </Modal>
            </div>
        </div>
    )
}

export default RecentReceipt
