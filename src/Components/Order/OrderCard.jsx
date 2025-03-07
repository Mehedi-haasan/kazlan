import React, { useState } from 'react';
import Remove from '../../icons/Remove';
import Edit from '../../icons/Edit';
import Modal from '../Input/Modal';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';
import BaseUrl from '../../Constant';

const OrderCard = ({ id, name, price, qty, contact, product }) => {

    const sta = ['Draft', 'Pending', 'Confirm', 'Deliverd']
    const [stas, setStat] = useState('');
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [values, setValues]=useState({});
    const [value, setValue]=useState('');

    const handleStatusChange = async (status) => {
        // setStat(status)
        // const token = localStorage.getItem('token')
        // const response = await fetch(`http://localhost:8050/api/product/order/update`, {
        //     method: 'PATCH',
        //     headers: {
        //         'authorization': token,
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        //     body: JSON.stringify({ id: id }),
        // });
        // const data = await response.json();
    }

    const handleCreate = async (image_url) => {

        values.image_url = image_url;
        values.description = value;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/product`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            alert(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }

    return (
        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-4 py-4">
                {name}
            </td>
            <td className="px-4 py-4">
                {price}
            </td>
            <td className="px-4 py-4">
                {qty}
            </td>
            <td className="px-4 py-4">
                {name}
            </td>
            <td className="px-4 py-4">
                {contact}
            </td>
            <td className="px-4 py-4">
                {`N/A`}
            </td>
            <td className="px-4 py-4">
                {'N/A'}
            </td>
            <td className="px-4 py-4">
                {contact}
            </td>
            <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">

                <Edit size='25px' onClick={() => { setEdit(true) }} />
                <Remove size='25px' onClick={() => { setShow(true) }} />


                <Modal show={edit} handleClose={() => { setEdit(false) }} size="500px" className="">
                    <div className="pt-1">
                        <InputComponent placeholder={name} label={`State name`} onChange={(e) => { setValues(e) }} className='lg:text-lg' />

                        <Button isDisable={false} name="Create" onClick={handleCreate} className="mt-3" />
                    </div>
                </Modal>

                <Modal show={show} handleClose={() => { setShow(false) }} size="350px" className="">
                    <h1 className="font-semibold text-lg py-2 text-black">Are you sure you want to delete?</h1>
                    <div className="flex justify-between items-center pb-6 pt-4">
                        <button onClick={() => { setShow(false) }} className="border px-3 py-1 rounded border-blue-500 text-blue-500">No</button>
                        <button onClick={() => { setShow(false) }} className="border px-3 py-1 rounded border-red-500 text-red-500">Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default OrderCard;