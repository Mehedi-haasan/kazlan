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


const Header = ({ auth, isLoggedOut, open, isOpen, notification, info = {} }) => {
    const [selected, setSelected] = useState({});
    const [child, setChaild] = useState({})
    return (
        <div className="w-full top-0 z-50 shadow fixed">

            <div className="flex justify-between items-center z-50 w-[100%] px-2 mx-auto bg-[#FFFFFF] py-1">

                <div className="">
                    <NavLink className={`pt-1 pb-2`} onClick={() => { isOpen(!open); setSelected({}) }}>
                        <img src={logo} alt="dhyfg" className="w-[110px] h-[50px]" />
                    </NavLink>
                </div>


                <div className="flex justify-end items-center gap-3">
                    {
                        auth && <div className="hidden md:block">
                            <NavLink to={`/update/product`} className="border rounded-full px-2 py-1 text-md border-[#3A95EE] flex float-start items-center gap-1 text-[#3A95EE]"><Add /> Add Purchase</NavLink>
                        </div>
                    }

                    {auth && <NavLink to={`/sell`} className="border rounded-full px-2 py-1 border-red-500 flex float-start text-md items-center gap-1 text-red-500"><Add /> Add Sale</NavLink>}
                    {auth ? <div className="flex justify-start items-start gap-2">
                        <NavLink to='/profile' className='font-bold text-sm xl:text-md'>
                            <img src={user} alt="sdgd" className="h-10 w-10 rounded-full" />
                        </NavLink>
                        <div>
                            <h1 className="text-sm font-semibold pt-1">{info?.name}</h1>
                            <p className="text-xs">{info?.role}</p>
                        </div>
                    </div> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}

                    {
                        auth && <NavLink to='/notification' className="relative hover:bg-slate-200 p-2 rounded-full">
                            <Notification />
                            <h1 className="text-red-600 absolute top-0 right-[2px] font-semibold text-sm">{notification?.length > 0 ? notification?.length : null}</h1>
                        </NavLink>
                    }
                </div>
            </div>

            {
                auth && <div className={`absolute bg-[#FFFFFF] transition-all ease-in duration-500 top-[59px] z-50 shadow-xl border-r border-red-300 w-[230px] min-h-[100vh] py-3 pr-3  ${open ? "left-[0px]" : "left-[-170px]"}`}>
                    <div className='max-h-[500px] overflow-y-auto'>
                        {data?.map((item, index) => (
                            <div className="">
                                {
                                    item?.option ? <div onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} className={`flex  ${open ? 'justify-between ml-2' : 'justify-end'} text-[#5F5F5F] cursor-pointer text-md hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                        <div className="flex justify-start items-center gap-2">
                                            <Icon icon={item.icon} width='20px' />
                                            <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                        </div>
                                        {item?.option && <RightArrow className={`${open ? '' : 'hidden'} transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : ''}`} />}
                                    </div>


                                        :


                                        <NavLink onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} to={`/${item?.route}`} className={`flex  ${open ? 'justify-between ml-2' : 'justify-end'} text-[#5F5F5F] text-md hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                            <div className="flex justify-start items-center gap-2">
                                                <Icon icon={item.icon} width='20px' />
                                                <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                            </div>
                                            {item?.option && <RightArrow className={`${open ? '' : 'hidden'} transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : ''}`} />}
                                        </NavLink>
                                }





                                {/* Child Route */}
                                <div className={`pl-2 overflow-hidden transition-all duration-700 ease-in-out ${selected?.id === item?.id ? "max-h-[500px]" : "max-h-0"}`}>
                                    {item?.items?.map((it) => (
                                        <NavLink key={index} to={`/${it?.route}`}
                                            onClick={() => { child?.id === it?.id ? setChaild({}) : setChaild(it) }}
                                            className={`flex ${child?.id === it?.id ? 'bg-blue-50 text-blue-500' : ''}
                                           text-[#5F5F5F] w-full mt-1 text-lg hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 pl-4 py-1.5`}>
                                            <div className="flex justify-start items-center gap-2">
                                                <Circle />
                                                <h1 className={`${open ? '' : 'hidden'} text-sm`}>{it.name}</h1>
                                            </div>
                                        </NavLink>
                                    ))}

                                </div>

                            </div>
                        ))}


                        <div className="mr-2.5">
                            <NavLink to={`/`} onClick={() => { localStorage.setItem('token', ''); isLoggedOut(false); }}
                                className={`flex ${open ? 'justify-start pl-4' : 'justify-end mr-2'} text-[#5F5F5F] font-roboto w-full text-lg hover:bg-blue-50 rounded justify-start items-center gap-2 py-1.5`}>
                                <Icon icon={"uiw:logout"} width='18px' />
                                <h1 className={`${open ? '' : 'hidden'} font-roboto font-normal text-[17px]`}>Logout</h1>
                            </NavLink>
                        </div>

                    </div>
                </div>
            }
        </div >
    )
};

export default Header;