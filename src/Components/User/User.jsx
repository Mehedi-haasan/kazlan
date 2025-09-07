import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Updown from '../../icons/Updown'
import Remove from '../../icons/Remove'
import Edit from "../../icons/Edit";
import ShowEntries from "../Input/ShowEntries";
import BaseUrl from "../../Constant";
import Loading from "../../icons/Loading";
import Excel from "../Input/Excel";
import Search from "../Input/Search";
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import Modal from "../Input/Modal";
import Notification from "../Input/Notification";
import EscapeRedirect from "../Wholesale/EscapeRedirect";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Pdf from "../Pdf/Pdf";


const User = ({ entries, info = {} }) => {

    const goto = useNavigate()
    const [selectAll, setSelectAll] = useState(false);
    const [preview, setPreview] = useState(false)
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const targetRef = useRef();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const options = { width: 1600, backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(options)
    const [values, setValues] = useState({
        usertype: "Wholesaler",
        compId: 1,
        stateId: 1
    });
    const GetUsers = async () => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        const response = await fetch(`${BaseUrl}/api/get/users/with/role/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json();
        setIsLoading(false)
        setUsers(data?.items)
        setTotalItem(data?.items?.length)
    }

    useEffect(() => {
        document.title = "User info - KazalandBrothers";
        if (info?.role === "superadmin") {
            GetUsers()
        }
    }, [])


    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BaseUrl}/api/update/single/users/by/super/admin`, {
            method: "PATCH",
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values)
        })
        const data = await response.json()
        setOpen(false)
        setMessage({ id: Date.now(), mgs: data?.message });

    }

    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/single/users/by/super/admin`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        setShow(false)
        setMessage({ id: Date.now(), mgs: data?.message });
    }

    EscapeRedirect()


    const TikBox = (id) => {
        setUsers(prev => {
            const newData = prev.map(item => {
                if (item.id === id) {
                    return { ...item, active: !item.active };
                } else {
                    return item;
                }
            });

            // Check if all are active based on newData
            const allActive = newData.every(item => item.active === false);
            setSelectAll(allActive)

            return newData;
        });
    };


    const BulkDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/bulk/update/users`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ data: users }),
        });
        const result = await response.json();
        setMessage({ id: Date.now(), mgs: result?.message });
        GetUsers()
    }


    const exportToExcel = () => {
        let filename = 'users.xlsx'
        if (!users || users.length === 0) {
            setMessage({ id: Date.now(), mgs: 'No users items to export!' });
            return;
        }
        let excel = [];
        users.map((item) => {
            excel.push({
                name: item?.name,
                username: item?.username,
                email: item?.email,
                bankname: item?.bankname,
                accountname: item?.accountname,
                accountnumber: item?.accountnumber,
                address: item?.address,
                active: item?.active,
                type: item?.usertype,
                createdby: item?.creator,
                createdAt: item?.createdAt,
            })
        })

        const worksheet = XLSX.utils.json_to_sheet(excel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    };


    return (
        <div className="pl-4 pt-5 pr-2 min-h-screen pb-12">
            <Notification message={message} />
            <div className="flex justify-between items-center p-4 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">User List</h1>
                <NavLink to={`/registration`} className={`border rounded-md shadow bg-blue-500 text-white py-1.5 px-4 font-thin`}>Create user</NavLink>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-4">
                <div className="flex justify-between items-center ">
                    <div>
                        <ShowEntries options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        <Excel expotExcel={exportToExcel} handeldelete={() => { BulkDelete() }} onClick={() => setPreview(true)} Jpg={() => setPreview(true)} />
                        <Search SearchProduct={() => { }} />
                    </div>
                </div>
                <div>

                    <Modal show={show} handleClose={() => { setShow(false) }} size={`380px`} className={""}>
                        <h1 className="py-3 text-sm font-thin">Are you sure you want to delete this?</h1>
                        <div className="flex justify-between items-center p-4">
                            <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 bg-blue-500 text-white">No</button>
                            <button onClick={handleDelete} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
                        </div>
                    </Modal>
                </div>
                <div>
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:bg-[#040404] dark:text-white">
                            <thead class="text-sm text-gray-900 bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                                <tr className='border'>
                                    <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox"
                                                checked={selectAll}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setSelectAll(isChecked);
                                                    setUsers(prev => prev.map(item => ({ ...item, active: !isChecked })));
                                                }}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center">
                                            Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Mobile
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Email
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Bank Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Account Name
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Bank Account
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Address
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center">
                                            Type
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r">
                                        <div className="flex justify-between items-center">
                                            Role
                                            <Updown />
                                        </div>
                                    </th>
                                    {info?.role === "superadmin" && <th scope="col" className="pl-4 pr-1 py-2 text-center">Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((item, i,) => (
                                    <tr className={`border-b font-thin ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                        <th className="w-4 py-2 px-4 border-x">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" onChange={() => TikBox(item.id)} checked={!item?.active} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-2 border-x font-thin ">{item?.name}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.username}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.email}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.bankname}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.accountname}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.accountnumber}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.address}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.usertype}</th>
                                        <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.role?.length > 0 ? item?.role[0]?.name : 'User'}</th>
                                        {info?.role === "superadmin" && <th scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2">
                                            <Edit onClick={() => { goto(`/update/user/${item?.id}`) }} />
                                            <Remove onClick={() => { setValues(item); setShow(true) }} />
                                        </th>}
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <Modal show={preview} handleClose={() => { setPreview(false) }} size={`1000px`} crosshidden={true}>
                    <div ref={ref}>
                        <div ref={targetRef} className="pt-3 w-full overflow-hidden overflow-x-auto actual-receipt" >
                            <Pdf>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:bg-[#040404] dark:text-white">
                                    <thead class="text-sm text-gray-900 bg-[#BCA88D] dark:bg-[#040404] dark:text-white">
                                        <tr className='border'>
                                            <th scope="col" className="px-2 py-2 border-r ">
                                                <div className="flex justify-between items-center">
                                                    Name
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Mobile
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Email
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Bank Name
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Account Name
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Bank Account
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Address
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-center border-r">
                                                <div className="flex justify-between items-center">
                                                    Type
                                                    <Updown />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-2 py-2 text-right border-r">
                                                <div className="flex justify-between items-center">
                                                    Role
                                                    <Updown />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map((item, i,) => (
                                            <tr className={`border-b font-thin ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
                                                <th scope="col" className="px-2 py-2 border-x font-thin ">{item?.name}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.username}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.email}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.bankname}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.accountname}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.accountnumber}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.address}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.usertype}</th>
                                                <th scope="col" className="px-2 py-2 border-r font-thin ">{item?.role?.length > 0 ? item?.role[0]?.name : 'User'}</th>

                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </Pdf>
                        </div>
                    </div>
                    <div className='flex justify-end items-end pr-8 gap-2'>
                        <button onClick={getPng} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">JPG</span>
                        </button>

                        <button onClick={() => generatePDF(targetRef, { filename: `Products.pdf` })} className='border group border-red-500 text-red-500 bg-[#FFFFFF] shadow-md hover:bg-red-500 hover:text-white group rounded-lg px-4 py-1.5 ml-3 font-thin flex justify-start items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:text-white transition duration-200" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.792 21.25h8.416a3.5 3.5 0 0 0 3.5-3.5v-5.53a3.5 3.5 0 0 0-1.024-2.475l-5.969-5.97A3.5 3.5 0 0 0 10.24 2.75H7.792a3.5 3.5 0 0 0-3.5 3.5v11.5a3.5 3.5 0 0 0 3.5 3.5" /><path fill="currentColor" fill-rule="evenodd" d="M10.437 7.141c-.239.078-.392.236-.436.411c-.09.352 0 .73.253 1.203c.126.234.28.471.45.725l.092.137l.145.215l.019-.068l.086-.306q.148-.503.23-1.02c.089-.642-.011-1.018-.309-1.26c-.08-.065-.278-.119-.53-.037m.055 4.152l-.27-.362l-.032-.048c-.115-.19-.243-.38-.382-.585l-.1-.149a10 10 0 0 1-.512-.828c-.31-.578-.558-1.286-.358-2.067c.17-.664.698-1.081 1.227-1.254c.517-.168 1.174-.147 1.66.247c.792.644.848 1.573.739 2.357a9 9 0 0 1-.261 1.174l-.096.34q-.112.382-.208.769l-.067.194l1.392 1.864c.65-.078 1.364-.125 2.03-.077c.769.054 1.595.242 2.158.776a1.56 1.56 0 0 1 .395 1.441c-.117.48-.454.88-.919 1.123c-.985.515-1.902.105-2.583-.416c-.533-.407-1.045-.975-1.476-1.453l-.104-.114c-.37.057-.72.121-1.004.175c-.305.057-.684.128-1.096.22l-.151.443q-.125.288-.238.58l-.122.303a8 8 0 0 1-.427.91c-.33.578-.857 1.192-1.741 1.241c-1.184.066-1.986-.985-1.756-2.108l.006-.027c.2-.791.894-1.31 1.565-1.653c.597-.306 1.294-.532 1.941-.701zm.87 1.165l-.287.843l.421-.08l.004-.001l.38-.07zm2.84 1.604c.274.29.547.56.831.777c.55.42.94.493 1.299.305c.2-.105.284-.241.309-.342a.35.35 0 0 0-.08-.309c-.257-.228-.722-.38-1.392-.428a8 8 0 0 0-.967-.003m-5.005.947c-.318.109-.62.23-.89.368c-.587.3-.87.604-.944.867c-.078.415.192.673.516.655c.27-.015.506-.184.766-.639q.204-.372.358-.767l.107-.266z" clip-rule="evenodd" /></g></svg>
                            <span className="group-hover:text-white transition duration-200">PDF</span>
                        </button>
                    </div>
                </Modal>
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + users?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + users?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + users?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className="font-thin">Next</p>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User