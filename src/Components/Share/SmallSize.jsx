import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import BaseUrl from '../../Constant';

const SmallSize = ({ onChange }) => {
    const [category, setCategory] = useState(false)
    const [contuct, setContact] = useState(false)

    const [data, setData] = useState([])


    const fetchData = async () => {
        const response = await fetch(`${BaseUrl}/api/get/category/by/productValue`);
        const data = await response.json();
        setData(data.items)
    }
    // useEffect(() => {
    //     fetchData();
    // }, [])



    return (
     

            <ul className="w-full ml-1">
                <li className="pt-2 pb-1 border-b">
                    <NavLink to="/" onClick={()=>{onChange(false)}} className="py-1 w-[100px] px-1 rounded">Home</NavLink>
                </li>

                <li className="py-1 border-b">
                    <div className=''>
                        <div className="flex justify-between w-full"><NavLink className={`rounded px-1 py-1 `}>Categories</NavLink><Icon onClick={() => { setCategory(!category) }} icon="ep:arrow-down" width="18px" className={`transition-transform mt-2 cursor-pointer right-0 duration-300 ${category ? "rotate-180" : "rotate-0"}`} /></div>
                        <div className={`text-sm text-black p-1.5 bg-white rounded ${category ? "block" : "hidden"}`}>
                            {data.map((item) => {
                                return <NavLink onClick={()=>{onChange(false)}} to={`/category/${item.id}/${item.name}`} className="flex py-1  rounded-lg">{item.name}</NavLink>
                            })}
                        </div>
                    </div>
                </li>

                <li className="py-1 border-b w-full">
                    <div>
                        <div className="flex justify-between w-full">
                            <NavLink to="/Contact" onClick={()=>{onChange(false)}} className={`rounded px-1 py-1`}>Support</NavLink>
                            <Icon onClick={() => { setContact(!contuct) }} icon="ep:arrow-down" width="18px" className={`transition-transform mt-2 cursor-pointer ml-1 duration-300 ${contuct ? "rotate-180" : "rotate-0"}`} />
                        </div>


                        <div className={`bg-white text-black p-2 rounded ${contuct ? "block" : "hidden"}`}>
                            <NavLink to="/watch" className="flex py-1 text-sm rounded-lg">Help Center</NavLink>
                            <NavLink to="/livechat" className="flex py-1 text-sm rounded-lg">Chat With Us</NavLink>
                        </div>
                    </div>
                </li>
                <li className="py-1 flex border-b">
                    <NavLink to="/login" onClick={()=>{onChange(false)}} className='py-1 w-[100px] text-sm px-1 rounded'>LOGIN/REGISTER</NavLink>
                    {/* {
                        auth ? <NavLink to='/profile' className='ml-4 py-1 text-sm w-[100px] px-1 rounded'>My Account</NavLink> : <NavLink to="/login" className='ml-4 py-1 w-[100px] text-sm px-1 rounded'>LOGIN/REGISTER</NavLink>
                    } */}
                </li>
            </ul>
   

    )
}

export default SmallSize
