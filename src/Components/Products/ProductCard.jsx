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


const ProductCard = ({ item, i, isChecked, info = {}, getProduct, modalOpen, selected, TikBox }) => {

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
        metdod: 'PATCH',
        headers: {
          'autdorization': token,
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
      console.error("Image file is missing in tde payload");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BaseUrl}/api/upload/image`, {
        metdod: 'POST',
        headers: {
          'autdorization': token,
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
      metdod: 'POST',
      headers: {
        'autdorization': token,
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
    <tr  className={`border-b z-10 font-thin  ${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'}`}>
      <td className="w-4 py-2 px-4 border-x">
        <div className="flex items-center">
          <input id="checkbox-table-search-1" onChange={() => TikBox(item.id)} checked={isChecked} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      <td scope="col" className="px-2 py-2.5 border-x" id="bnc-unicode-textarea">{item?.name} {item?.edition}
        <Notification message={message} />
      </td>
      <td scope="col" className="px-2 py-2.5 border-r" id="bnc-unicode-textarea">{item?.brand?.name}</td>
      <td scope="col" className="px-2 py-2.5 border-r" id="bnc-unicode-textarea">{item?.category?.name}</td>
      <td scope="col" className="px-2 py-2.5 border-r">{item?.company?.name}</td>
      <td scope="col" className="px-2 py-2.5 border-r">{item?.cost}</td>
      <td scope="col" className="px-2 py-2.5 border-r">{item?.price}</td>
      <td scope="col" className="px-2 py-2.5 border-r">{item?.qty} {item?.qty_type}</td>
      <td scope="col" className="px-2 py-2.5 border-r">{item?.creator}</td>
      <td scope="col" className="px-2 py-2.5 border-r">{formatDate(item?.createdAt)}</td>
      <td scope="col" className="px-2 py-2 flex justify-center items-center border-r gap-2 relative">
        {
          selected === item?.id && <div className="absolute -top-12 bg-white dark:bg-[#040404] dark:text-white shadow-xl rounded-md right-14 w-[125px] p-[5px] z-50 border border-red-500 font-semibold">
            <NavLink to={`/update/product/${item?.id}`} className="flex justify-start items-center gap-[7px] cursor-pointer hover:bg-gray-200 px-1 py-[2px] rounded text-xs">
              <Edit size="17px" /><h1 className="mt-[3px]">Edit</h1>
            </NavLink>
            <NavLink to={`/tran/product/${item?.id}`} className="flex justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-1 rounded text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4.58 8.607L2 8.454C3.849 3.704 9.158 1 14.333 2.344c5.513 1.433 8.788 6.918 7.314 12.25c-1.219 4.411-5.304 7.337-9.8 7.406" /><path stroke-dasharray=".5 3" d="M12 22C6.5 22 2 17 2 11" /><path d="M13.604 9.722c-.352-.37-1.213-1.237-2.575-.62c-1.361.615-1.577 2.596.482 2.807c.93.095 1.537-.11 2.093.47c.556.582.659 2.198-.761 2.634s-2.341-.284-2.588-.509m1.653-6.484v.79m0 6.337v.873" /></g>
              </svg><h1 className="">Transactions</h1>
            </NavLink>
            <div onClick={() => { setShow(true); modalOpen(item?.id) }} className={`${info?.role === "admin" ? 'hidden' : ''} flex justify-start text-xs items-center gap-2.5 cursor-pointer text-red-500 hover:bg-gray-200 px-[5px] py-[2px] rounded`}>
              <Remove size="15px" onClick={() => { setShow(true) }} className={`text-red-500`} /><h1 className="mt-[3px]">Delete</h1>
            </div>
          </div>
        }
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { modalOpen(item?.id) }} className="cursor-pointer" width="25" height="22" viewBox="0 0 40 40">
          <g fill="currentColor"><path d="M23.112 9.315a3.113 3.113 0 1 1-6.226.002a3.113 3.113 0 0 1 6.226-.002" />
            <circle cx="20" cy="19.999" r="3.112" /><circle cx="20" cy="30.685" r="3.112" />
          </g>
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
                <ReactQuill tdeme="snow" value={value} onChange={setValue} />
              </div>
            </div>
            <div className=''>
              <Button onClick={handleUpload} isDisable={isLoading} name={"Update"} />
            </div>

          </div>
        </Modal>

        <DownModal show={show} handleClose={() => { setShow(false) }} size={``} className=''>
          <h1 className="py-3 text-sm font-thin">Are you sure you want to delete this?</h1>
          <div className="flex justify-between items-center p-4">
            <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 bg-blue-500 text-white">No</button>
            <button onClick={handleDelete} className="border px-4 py-1.5 rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Yes</button>
          </div>
        </DownModal>
      </td>

    </tr>
  );
};

export default ProductCard;
