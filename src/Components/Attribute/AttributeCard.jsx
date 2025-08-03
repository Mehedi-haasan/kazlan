import React, { useState } from "react";
import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import Modal from "../Input/Modal";
import InputComponent from "../Input/InputComponent";
import BaseUrl from "../../Constant";
import Button from "../Input/Button";
import logo from '../Logo/userProfile.png'
import ImageSelect from "../Input/ImageSelect";
import Notification from "../Input/Notification";
import groovyWalkAnimation from "../../lotti/Animation - 1745147041767.json";
import { useLottie } from "lottie-react";
import DownModal from "../Input/DownModal";
import SelectionComponent from "../Input/SelectionComponent";


const BrandCard = ({ item, i, isChecked, info = {}, GetAttribute, isDownloadMode }) => {

    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [image_url, setImage_Url] = useState();
    const [values, setValues] = useState({ name: item?.name, });
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [showlotti, setLottiShow] = useState(false)
    const [first, setFirst] = useState({
        first: true,
        value: 'Bank'
    })

    const handleUpdate = async (id) => {
        values.id = id;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/attribute`, {
                method: 'PATCH',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setEdit(false)
            GetAttribute()
            setMessage({ id: Date.now(), mgs: data?.message });
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }


    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/attribute`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(item),
        });
        const data = await response.json();
        setShow(false)
        GetAttribute();
        setLottiShow(true)
        setMessage({ id: Date.now(), mgs: data?.message });
    }




    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }


    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        style: {
            width: 200,
            height: 200,
        },
    };

    const { View } = useLottie(options);

    return (
        <tr className={`${i %2 === 1 ? 'bg-[#FAF9EE]': ''} border-b`}>
            {/* <th className="w-4 py-1.5 px-4 border-x">
                <div className="flex items-center">
                    <Modal show={showlotti} handleClose={() => { setLottiShow(false); }} size={`250px`}>
                        <>{View}</>
                    </Modal>
                    <Notification message={message} />
                    <input id="checkbox-table-search-1" checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </th> */}
            <th scope="col" className="px-2 py-1.5 border-x font-thin text-[#212529]">{item?.name}
                <Modal show={showlotti} handleClose={() => { setLottiShow(false); }} size={`250px`}>
                        <>{View}</>
                    </Modal>
                    <Notification message={message} />
            </th>
            <th scope="col" className="px-2 py-1.5 border-r font-thin text-[#212529]">{item?.type}</th>
            <th scope="col" className="px-2 py-1.5 border-r font-thin text-[#212529]">{item?.creator}</th>
            <th scope="col" className="px-2 py-1.5 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
            {
                info?.role === "superadmin" && <th scope="col" className="px-2 py-3 flex justify-center items-center border-r gap-2">
                    <Modal show={edit} handleClose={() => { setEdit(false) }} size={`800px`} className=''>
                        <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                            <div className="border-b">
                                <h1 className="pl-5 text-xl py-2 text-black">Update Attribute Details</h1>
                            </div>
                            <div className="pt-5 pl-5">
                                <SelectionComponent options={[{ id: 1, name: 'Bank' }, { id: 2, name: "Mobile Banking" }]} default_select={first?.first} default_value={item?.type}
                                    onSelect={(v) => {
                                        setValues({ ...values, type: v?.name, })
                                        setFirst({ ...first, value: v?.name })
                                    }} label={"Type*"} className='rounded-r' />
                            </div>
                            <div className="px-6 py-4">
                                <InputComponent placeholder={values?.name} value={values?.name} label={`Name`} handleEnter={() => { handleUpdate(item?.id) }} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' />
                                <Button isDisable={isLoading} name="Update" onClick={() => { handleUpdate(item?.id) }} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                            </div>
                        </div>
                    </Modal>
                    <Edit onClick={() => { setEdit(true) }} />

                    <Remove onClick={() => { setShow(true) }} />
                    <DownModal show={show} handleClose={() => { setShow(false) }} size={``} className=''>
                        <h1 className="py-3 text-sm font-thin">Are you sure you want to delete this?</h1>
                        <div className="flex justify-between items-center p-4">
                            <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 bg-blue-500 text-white">No</button>
                            <button onClick={handleDelete} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
                        </div>
                    </DownModal>
                </th>
            }
        </tr>
    )
}

export default BrandCard