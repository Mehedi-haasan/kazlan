import Updown from "../../icons/Updown";
import { ReturnSaleCode, formatDate } from "../Input/Time";



const PdfInvoiceTemp = ({ invoices = [], prefix = "KB", info = {}, usertype = "Customer", date_type = "Delivery Date", is_due = true }) => {


    return (
        <div className="pt-3">
            <div className="w-full overflow-hidden overflow-x-auto">
                <table className="text-sm text-left text-gray-500 w-full min-w-[700px] rounded">
                    <thead className="text-sm text-left  text-black rounded ">
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
                                    Created by
                                    <Updown />
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-3 text-right border-r ">
                                <div className="flex justify-between items-center">
                                    {date_type}
                                    <Updown />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((item, i) => (
                            <tr key={i} className={`border-b cursor-pointer text-black`}>
                                <th scope="col" className="px-3 py-2 border-x font-thin ">{formatDate(item?.createdAt)}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{prefix}/{ReturnSaleCode(item?.type)}-{String(item?.id).padStart(5, '0')}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin text-[16px]" id="kalpurush">{item?.customername}</th>
                                {info?.role === "superadmin" && <th scope="col" className="px-3 py-2 border-r font-thin text-[16px]" id="kalpurush">{item?.shopname}</th>}
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.total}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.paidamount}</th>
                                {is_due && <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.due}</th>}
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{item?.creator}</th>
                                <th scope="col" className="px-3 py-2 border-r font-thin ">{formatDate(item?.deliverydate)}</th>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PdfInvoiceTemp
