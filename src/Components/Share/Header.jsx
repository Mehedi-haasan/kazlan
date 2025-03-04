import { NavLink } from "react-router-dom";
import Notification from "../../icons/Notification";
import data from '../Dashboard/data.json'
import logo from '../Logo/logu (2).png'
import { useState } from "react";
import { Icon } from "@iconify/react";
import Add from "../../icons/Add";
import RightArrow from "../../icons/RightArrow";


const Header = ({ auth, open, isOpen }) => {
    function generateRandomNumber() {
        return Math.floor(Math.random() * 20) + 1;
    }


    return (
        <div className="fixed w-full top-0 z-50 shadow">

            <div className="flex justify-between items-center sticky top-0 z-50 w-[100%] px-2 mx-auto bg-white py-1 border-b border-black">

                <div className="">
                    <NavLink className={`pt-1 pb-2`} to="/">
                        <img src={logo} alt="dhyfg" className="w-[110px] h-[50px]" />
                    </NavLink>
                </div>


                <div className="flex justify-end items-center gap-3">
                    <button onClick={() => { isOpen(!open) }} className="border rounded-full px-2 py-1 border-[#3A95EE] flex float-start items-center gap-1 text-[#3A95EE]"><Add /> Add Purchase</button>
                    <button className="border rounded-full px-2 py-1 border-red-500 flex float-start items-center gap-1 text-red-500"><Add /> Add Sale</button>
                    {auth ? <NavLink to='/profile' className='font-bold text-sm xl:text-md mr-2'>My Account</NavLink> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}
                    <NavLink to='/notification' className="relative hover:bg-slate-200 p-2 rounded-full">
                        <Notification />
                        <h1 className="text-red-600 absolute top-0 right-[2px] font-semibold text-sm">{generateRandomNumber()}</h1>
                    </NavLink>
                </div>
            </div>

            <div className={`absolute bg-white transition-all font-bold ease-in duration-500 top-[59px] z-50 shadow-xl border-r border-red-300 w-[230px] min-h-[100vh] py-3 pr-3 right-0 space-x-2 space-y-2 ${open ? "left-[0px]" : "left-[-170px]"}`}>
                <div className='items-center'>
                    {data.map((item, index) => (
                        <NavLink key={index} to={`/${item?.route}`} className={`flex ${open ? 'justify-between ml-2' : 'justify-end mr-2'} font-bold w-full text-lg hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 p-2`}>
                            <div className="flex justify-start items-center gap-2">
                                <Icon icon={item.icon} width='20px' />
                                <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                            </div>
                            <RightArrow className={`${open ? '' : 'hidden'}`} />
                        </NavLink>
                    ))}


                    <NavLink to={`/`} onClick={() => { localStorage.setItem('token', ''); }} className={`flex ${open ? 'justify-start' : 'justify-end mr-2'} font-bold w-full text-lg hover:bg-blue-50 rounded justify-start items-center gap-2 p-2`}>
                        <Icon icon={"uiw:logout"} width='20px' />
                        <h1 className={`${open ? '' : 'hidden'}`}>{'Logout'}</h1>
                    </NavLink>

                </div>
            </div>
        </div >
    )
};

export default Header;