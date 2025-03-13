import React, { useState } from 'react';
import Remove from '../../icons/Remove';
import Edit from '../../icons/Edit'
import Modal from '../Input/Modal';
import MiniButton from '../Input/MiniButton';

const SellCard = ({ item, onClick }) => {
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false)

    return (
        <tr className='border-b'>
            <th scope="col" className="pr-6 py-2 ">{item?.id}</th>
            <th scope="col" className="px-4 py-2 text-center">{item?.name}</th>
            <th scope="col" className="px-4 py-2 text-center">{item?.qty}</th>
            <th scope="col" className="pl-4 py-2 text-right">{item?.price}</th>
            <th scope="col" className="pl-4 py-2 text-right">{item?.price}</th>
            <th scope="col" className="pl-4 py-2 text-right">{item?.comn}</th>
            <th scope="col" className="pl-4 py-2 text-right">{parseInt(item?.price) * parseInt(item?.qty)}</th>
            <th scope="col" className="px-2 py-2 flex justify-end items-center border-r">
                <Modal show={edit} handleClose={() => { setEdit(false) }} size={``} className=''>
                    <div className='flex justify-between items-center py-1'>
                        <h1>Name</h1>
                        <h1>{item?.name}</h1>
                    </div>
                    <div className='flex justify-between items-center py-1'>
                        <h1>Price</h1>
                        <h1>{item?.price}</h1>
                    </div>
                    <div className='flex justify-between items-center py-1'>
                        <h1>Qty</h1>
                        <input type='number'
                            className="text-right focus:outline-none w-16 border rounded"
                            // onChange={(e) => setData({ ...data, qty: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setShow(false);
                                }
                            }}
                            placeholder={""}
                        />
                    </div>
                    <div className='flex justify-between items-center py-1'>
                        <h1>Comn</h1>
                        <input type='number'
                            className="text-right focus:outline-none w-16 border rounded"
                            // onChange={(e) => setData({ ...data, comn: e.target.value })}
                            // value={qty}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setShow(false);
                                }
                            }}
                            placeholder={""}
                        />
                    </div>
                    <div className='flex justify-end items-center pt-1'>
                        <MiniButton name={`Done`}
                            // onClick={() => { setAllData([...allData, data]); setData([]); setShow(false); }}
                        />
                    </div>
                </Modal>
                <Edit onClick={() => { setEdit(true) }} />

                <Remove onClick={() => { setShow(true) }} />
                <Modal show={show} handleClose={() => { setShow(false) }} size={``} className=''>
                    <h1 className="py-3 text-lg">Are you sure you want to delete this?</h1>
                    <div className="flex justify-between items-center p-4">
                        <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-red-500 text-red-500">Yes</button>
                        <button onClick={() => setShow(false)} className="border px-4 py-1.5 rounded border-blue-500 text-blue-500">No</button>
                    </div>
                </Modal>
            </th>
        </tr>
    );
};

export default SellCard;