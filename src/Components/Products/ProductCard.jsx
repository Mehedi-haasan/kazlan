import React, { useState } from "react";
import Remove from "../../icons/Remove";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Edit from "../../icons/Edit";
import Modal from "../Input/Modal";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import InputComponent from "../Input/InputComponent";
import { NavLink } from "react-router-dom";
import Notification from "../Input/Notification";
import DownModal from "../Input/DownModal";


const ProductCard = ({ item, i, isChecked, info = {}, getProduct, modalOpen, selected }) => {

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [image_url, setImage_Url] = useState();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ id: '', mgs: '' });
  const [values, setValues] = useState({
    categoryId: 1,
    brandId: 1,
    qty: 0,
    product_type: "Physical",
  })

  const handleUpdate = async (image_url) => {

    values.image_url = image_url;
    const token = localStorage.getItem('token');
    setIsLoading(true)
    try {
      const response = await fetch(`${BaseUrl}/api/update/category`, {
        method: 'PATCH',
        headers: {
          'authorization': token,
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setIsLoading(true)
      getProduct()
      setShow(false)
      setMessage({ id: Date.now(), mgs: data?.message });
    } catch (error) {
      console.error('Error updating variant:', error);
    }
  }

  const handleUpload = async () => {
    const formData = new FormData();
    if (image_url) {
      formData.append('image_url', image_url);
    } else {
      console.error("Image file is missing in the payload");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BaseUrl}/api/upload/image`, {
        method: 'POST',
        headers: {
          'authorization': token,
        },
        body: formData,
      });

      const data = await response.json();
      if (data) {
        handleUpdate(data.image_url)
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/delete/product`, {
      method: 'POST',
      headers: {
        'authorization': token,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ id: item?.id, url: item?.image_url }),
    });
    const data = await response.json();
    setShow(false)
    setMessage({ id: Date.now(), mgs: data?.message });
    getProduct()
  }

  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <tr className={`border-b z-10 ${i % 2 == 0 ? 'bg-gray-100' : ''}`}>
      {/* <th className="w-4 py-2 px-4 border-x">
        <div className="flex items-center">
          <Notification message={message} />
          <input id="checkbox-table-search-1" checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </th> */}
      <th scope="col" className="px-2 py-2.5 border-x font-thin text-[#212529]">{item?.name} {item?.edition}
        <Notification message={message} />
      </th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.brand?.name}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.category?.name}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.company?.name}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.cost}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.price}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.qty} {item?.qty_type}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{item?.creator}</th>
      <th scope="col" className="px-2 py-2.5 border-r font-thin text-[#212529]">{formatDate(item?.createdAt)}</th>
      <th scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2 relative">
        {
          selected === item?.id && <div className="absolute -top-12 bg-white shadow-xl rounded-md right-14 w-[120px] p-1 z-50 border">
            <NavLink to={`/update/product/${item?.id}`} className="flex justify-start items-center gap-[7px] cursor-pointer hover:bg-gray-200 px-1 py-[2px] rounded">
              <Edit size="17px" /><h1 className="mt-[3px] text-xs">Edit</h1>
            </NavLink>
            <NavLink to={`/tran/product/${item?.id}`} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 px-1 py-[2px] rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16">
                <path fill="currentColor" d="M6 9.5A2 2 0 0 1 7.937 11H13.5a.5.5 0 0 1 .09.992L13.5 12l-5.563.001a2 2 0 0 1-3.874 0L2.5 12a.5.5 0 0 1-.09-.992L2.5 11h1.563A2 2 0 0 1 6 9.5m4-7A2 2 0 0 1 11.937 4H13.5a.5.5 0 0 1 .09.992L13.5 5l-1.563.001a2 2 0 0 1-3.874 0L2.5 5a.5.5 0 0 1-.09-.992L2.5 4h5.563A2 2 0 0 1 10 2.5" />
              </svg><h1 className="mt-[3px] text-xs">Transactions</h1>
            </NavLink>
            <div onClick={() => { setShow(true); modalOpen(item?.id) }} className={`${info?.role === "admin" ? 'hidden' : ''} flex justify-start items-center gap-2.5 cursor-pointer text-red-500 hover:bg-gray-200 px-[5px] py-[2px] rounded`}>
              <Remove size="15px" onClick={() => { setShow(true) }} className={`text-red-500`} /><h1 className="mt-[3px] text-xs">Delete</h1>
            </div>
          </div>
        }
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { modalOpen(item?.id) }} className="cursor-pointer" width="25" height="22" viewBox="0 0 40 40">
          <g fill="currentColor"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" />
            <circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" /></g>
        </svg>
        <Modal show={edit} handleClose={() => { setEdit(false) }} size={``} className=''>
          <div className='max-w-[600px] p-5'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
              <div className='mt-3'>
                <h1 className='font-semibold py-1'>Select your Product Picture</h1>
                <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
              </div>
              <div>
                <InputComponent onChange={(e) => setValues({ ...values, qty: e })} label={"Quantity"} placeholder={"Quantity"} type={"number"} isRequered={""} />
              </div>

              <InputComponent onChange={(e) => setValues({ ...values, name: e })} label={"Product Name"} placeholder={item?.name} type={""} isRequered={""} />
              <InputComponent onChange={(e) => setValues({ ...values, cost: e })} label={"Cost Price"} placeholder={item?.cost} type={"number"} isRequered={""} />
              <InputComponent onChange={(e) => setValues({ ...values, price: e })} label={"Sell Price"} placeholder={item?.price} type={"number"} isRequered={""} />
              <div className='my-2 grid col-span-2'>
                <h1 className='font-semibold py-1'>Description</h1>
                <ReactQuill theme="snow" value={value} onChange={setValue} />
              </div>
            </div>
            <div className=''>
              <Button onClick={handleUpload} isDisable={isLoading} name={"Update"} />
            </div>

          </div>
        </Modal>

        <DownModal show={show} handleClose={() => { setShow(false) }} size={``} className=''>
          <h1 className="py-3 text-lg">Are you sure you want to delete this?</h1>
          <div className="flex justify-between items-center p-4">
            <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 text-white bg-blue-600">No</button>
            <button onClick={handleDelete} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:text-white hover:bg-red-600 hover:border-red-600">Yes</button>
          </div>
        </DownModal>
      </th>

    </tr>
  );
};

export default ProductCard;
