import { NavLink } from "react-router-dom";
import { useState } from "react";
import Notification from "../../icons/Notification";
import data from '../Dashboard/data.json'
import logo from '../Logo/logu (2).png'
import user from '../Logo/userProfile.png'
import { Icon } from "@iconify/react";
import Add from "../../icons/Add";
import RightArrow from "../../icons/RightArrow";
import Circle from '../../icons/Circle'


const Header = ({ auth, open, isOpen, notification }) => {
    const [selected, setSelected] = useState({})
    return (
        <div className="fixed w-full top-0 z-50 shadow">

            <div className="flex justify-between items-center sticky top-0 z-50 w-[100%] px-2 mx-auto bg-[#FFFFFF] py-1">

                <div className="">
                    <NavLink className={`pt-1 pb-2`} to="/">
                        <img src={logo} alt="dhyfg" className="w-[110px] h-[50px]" />
                    </NavLink>
                </div>


                <div className="flex justify-end items-center gap-3">
                    <button onClick={() => { isOpen(!open) }} className="border rounded-full px-2 py-1 text-md border-[#3A95EE] flex float-start items-center gap-1 text-[#3A95EE]"><Add /> Add Purchase</button>
                    <button className="border rounded-full px-2 py-1 border-red-500 flex float-start text-md items-center gap-1 text-red-500"><Add /> Add Sale</button>
                    {auth ? <NavLink to='/profile' className='font-bold text-sm xl:text-md'>
                        <img src={user} alt="sdgd" className="h-10 w-10 rounded-full" />
                    </NavLink> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}
                    <NavLink to='/notification' className="relative hover:bg-slate-200 p-2 rounded-full">
                        <Notification />
                        <h1 className="text-red-600 absolute top-0 right-[2px] font-semibold text-sm">{notification?.length > 0 ? notification?.length : null}</h1>
                    </NavLink>
                </div>
            </div>

            <div className={`absolute bg-[#FFFFFF] transition-all ease-in duration-500 top-[59px] z-50 shadow-xl border-r border-red-300 w-[230px] min-h-[100vh] py-3 pr-3 right-0 space-x-2 space-y-2 ${open ? "left-[0px]" : "left-[-170px]"}`}>
                <div className=''>
                    {data?.map((item, index) => (
                        <div className="">
                            <NavLink onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} to={`/${item?.option ? 'dashboard' : `${item?.route}`}`} className={`flex ${selected?.id === item?.id ? 'bg-blue-50 text-blue-500' : ''} ${open ? 'justify-between ml-2' : 'justify-end mr-2'} text-[#5F5F5F] text-md hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                <div className="flex justify-start items-center gap-2">
                                    <Icon icon={item.icon} width='20px' />
                                    <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                </div>
                                {item?.option && <RightArrow className={`${open ? '' : 'hidden'} transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : ''}`} />}
                            </NavLink>
                            <div className={`pl-2 overflow-hidden transition-all duration-700 ease-in-out ${selected?.id === item?.id ? "max-h-[500px]" : "max-h-0"}`}>
                                {item?.items?.map((it) => (
                                    <NavLink key={index} onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} to={`/${it?.route}`} className={`flex text-[#5F5F5F] w-full mt-1 text-lg hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 pl-4 py-1.5`}>
                                        <div className="flex justify-start items-center gap-2">
                                            <Circle />
                                            <h1 className={`${open ? '' : 'hidden'} text-sm`}>{it.name}</h1>
                                        </div>
                                    </NavLink>
                                ))}

                            </div>

                        </div>
                    ))}


                    <NavLink to={`/`} onClick={() => { localStorage.setItem('token', ''); }} className={`flex ${open ? 'justify-start' : 'justify-end mr-2'} w-full text-lg hover:bg-blue-50 rounded justify-start items-center gap-2 py-2 pl-4`}>
                        <Icon icon={"uiw:logout"} width='20px' />
                        <h1 className={`${open ? '' : 'hidden'}`}>{'Logout'}</h1>
                    </NavLink>

                </div>
            </div>
        </div >
    )
};

export default Header;