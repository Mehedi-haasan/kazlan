import { useEffect, useState } from "react";
import BaseUrl from "../../Constant";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../Input/Notification";
import SelectionComponent from "../Input/SelectionComponent";


const UpdateUser = () => {

    const params = useParams()
    const goto = useNavigate()
    const [values, setValues] = useState({ name: '', });
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });

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
        setMessage({ id: Date.now(), mgs: data?.message });
        goto('/users')
    }

    const FetchUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/users/${params?.id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            }
        });
        const data = await response.json();
        setValues(data?.items)
    }


    useEffect(() => {
        document.title = "Update User - Kazaland Brothers";
        FetchUser()
    }, [])

    return (
        <div className="p-4 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white min-h-screen">
            <Notification message={message} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 shadow-xl p-6 rounded">
                <div className="grid col-span-1 lg:col-span-2 py-2">
                    <h1>Update User Details</h1>
                </div>
                <div className=''>
                    <label className="block text-sm  mb-1 font-thin">Full Name</label>
                    <input type="text" onChange={(e) => { setValues({ ...values, name: e.target.value }) }}
                        className="w-full p-1.5 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.name} value={values?.name} />
                </div>
                <div>
                    <label className="block  text-sm  mb-1 font-thin">Phone</label>
                    <input type="text" onChange={(e) => { setValues({ ...values, username: e.target.value }) }}
                        className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.username} value={values?.username} />
                </div>
                <div>
                    <label className="block  text-sm  mb-1 font-thin">Bank Name</label>
                    <input type="text" onChange={(e) => { setValues({ ...values, bankname: e.target.value }) }}
                        className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.bankname} value={values?.bankname} />
                </div>
                <div>
                    <label className="block  text-sm  mb-1 font-thin">Account Name</label>
                    <input type="text" onChange={(e) => { setValues({ ...values, accountname: e.target.value }) }}
                        className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.accountname} value={values?.accountname} />
                </div>
                <div>
                    <label className="block  text-sm  mb-1 font-thin">Account Number</label>
                    <input type="number" onChange={(e) => { setValues({ ...values, accountnumber: e.target.value }) }}
                        className="w-full p-1.5 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.accountnumber} value={values?.accountnumber} />
                </div>
                <div>
                    <label className="block  text-sm  mb-1 font-thin">Address</label>
                    <input type="text" onChange={(e) => { setValues({ ...values, address: e.target.value }) }}
                        className="w-full p-1.5  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.address} value={values?.address} />
                </div>
                <div>
                    <label className="block  text-sm  mb-1 font-thin">Email</label>
                    <input type="email" onChange={(e) => { setValues({ ...values, email: e.target.value }) }}
                        className="w-full p-1.5 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 bg-[#BCA88D] dark:bg-[#040404]"
                        placeholder={values?.email} value={values?.email} />
                </div>
                <div>
                    <SelectionComponent options={[{ id: 1, name: "admin" }, { id: 2, name: "superadmin" }]} onSelect={(v) => { setValues({ ...values, rules: [v?.name] }) }} label={`User Role`} className='' />
                </div>

                <div className="grid col-span-1 lg:col-span-2">
                    <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600  text-white py-3 rounded-lg transition-all">
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser