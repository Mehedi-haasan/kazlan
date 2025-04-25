import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Notification from "../../icons/Notification";
import data from '../Dashboard/data.json'
import logo from '../Logo/logo_delta.png'
import { Icon } from "@iconify/react";
import Add from "../../icons/Add";
import RightArrow from "../../icons/RightArrow";
import Circle from '../../icons/Circle';
import flag from '../Logo/united.png'
import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../lotti/Animation - 1745262361506.json";


const Header = ({ auth, isLoggedOut, open, isOpen, notification, info = {} }) => {
    const [selected, setSelected] = useState({});
    const [child, setChaild] = useState({});
    const [isShowProfile, setIsShowProfile] = useState(false);
    const [lan, setLan] = useState(false);
    const [noti, setNoti] = useState([])

    const options = {
        animationData: groovyWalkAnimation,
        loop: true,
        style: {
            width: 40,
            height: 40,
        },
    };

    const { View } = useLottie(options);

    useEffect(() => {
        setNoti(notification)
    }, [notification, noti])



    return (
        <div className="w-full top-0 z-40 shadow fixed">

            <div className="flex justify-between items-center z-40 w-[100%] px-2 mx-auto bg-[#FFFFFF] py-2">
                <div></div>
                <div className="flex justify-end items-center gap-3">
                    {
                        auth && <div className="hidden md:block">
                            <NavLink to={`/update/product`} className="border font-thin rounded-full px-2 py-1 text-md border-[#3A95EE] flex float-start items-center gap-1 text-[#3A95EE]"><Add />Purchase</NavLink>
                        </div>
                    }

                    {auth && <NavLink to={`/sale/order`} className="border font-thin rounded-full px-2 py-1 border-red-500 flex float-start text-md items-center gap-1 text-red-500"><Add />Sale</NavLink>}
                    {auth && <NavLink to={`/sale/order`} className="border font-thin rounded-full px-2 py-1 border-green-500 bg-green-500 flex float-start text-md items-center gap-1 text-white"><Add />POS</NavLink>}
                    <div className="flex justify-start items-start gap-2 cursor-pointer relative">
                        <div className={`absolute ${lan ? '' : 'hidden'} bg-[#FFFFFF] shadow h-20 w-32 top-8 rounded-lg`}>
                            <div className="">
                                <button onClick={() => { setLan(!lan) }} className="flex justify-start items-center gap-1 border-b p-2">
                                    <img src={flag} alt="flag" className="h-7 w-7 p-1 cursor-pointer" />
                                    <h1>Bangla</h1>
                                </button>
                                <button onClick={() => { setLan(!lan) }} className="flex justify-start items-center gap-1 ml-1 p-2">
                                    <img src={flag} alt="flag" className="h-7 w-7 p-1 cursor-pointer" />
                                    <h1> English</h1>
                                </button>
                            </div>
                        </div>
                    </div>


                    <img src={flag} alt="flag" onClick={() => { setLan(!lan) }} className="h-10 w-10 p-1 cursor-pointer" />
                    {auth ? <div className="flex justify-start items-start gap-2 cursor-pointer relative">
                        <button className='font-bold text-sm xl:text-md cursor-pointer' onClick={() => setIsShowProfile(!isShowProfile)}>
                            <img src={info?.image} alt="profile" className="h-10 w-10 rounded-full cursor-pointer" />
                        </button>
                        <div onClick={() => setIsShowProfile(!isShowProfile)}>
                            <h1 className="text-sm font-semibold pt-1">{info?.name}</h1>
                            <p className="text-xs">{info?.role}</p>
                        </div>
                        <div className={`absolute ${isShowProfile ? '' : 'hidden'} bg-[#FFFFFF] shadow h-20 w-32 top-[52px] rounded-lg`}>
                            <div className="">
                                <NavLink to={`/profile`} onClick={() => setIsShowProfile(!isShowProfile)} className="flex justify-start items-center gap-2 border-b p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                                    <h1>Profile</h1>
                                </NavLink>
                                <button className="flex justify-start items-center gap-2 ml-1 p-2" onClick={() => { setIsShowProfile(!isShowProfile); localStorage.setItem('token', ''); isLoggedOut(false); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.99 9.99 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.99 9.99 0 0 1-8-4" /></svg>
                                    <h1> Log out</h1>
                                </button>
                            </div>
                        </div>
                    </div> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}
                    <NavLink to='/notification' className="relative hover:bg-slate-200 p-1 rounded-full">
                        <div className={`w-8 h-6 ${noti?.length === 0 ? 'hidden' : ''}`}>
                            {View}
                        </div>
                        <div className={`w-10 h-10 ${noti?.length === 0 ? '' : 'hidden'}`}>
                            <Notification />
                        </div>

                        <h1 className="text-red-600 absolute -top-1.5 right-[2px] font-semibold text-sm">{noti?.length > 0 ? noti?.length : null}</h1>
                    </NavLink>

                </div>
            </div>

            {
                auth && <div
                    // onMouseEnter={() => isOpen(true)}
                    className={`absolute bg-[#FFFFFF] transition-all top-0 ease-in duration-200 z-50 shadow-xl border-r border-red-300 w-[230px] min-h-[100vh]   ${open ? "left-[0px]" : "left-[-170px]"}`}>
                    <div className={`flex items-center border-b py-2 ${open ? 'justify-between ml-3' : 'justify-end mr-2.5'}`} >
                        <div className="">
                            <NavLink className={`pb-1`} onClick={() => { isOpen(!open); setSelected({}) }}>
                                <img src={logo} alt="header" className="w-[40px] h-[40px]" />
                            </NavLink>
                        </div>
                        <div className={`${open ? 'mr-4' : 'hidden'} flex justify-end items-start relative`}>
                            <Icon icon={"mingcute:arrow-left-line"} width='24px' onClick={() => { isOpen(false); setSelected({}) }} className={`${open ? '' : 'hidden'} text-[#3C9DEA] cursor-pointer`} />
                        </div>
                    </div>


                    <div className='max-h-[100vh] overflow-y-auto hide-scrollbar pr-1.5 pt-1.5 pb-14'>
                        {data?.map((item, index) => (
                            <div className="">
                                {
                                    item?.option ? <div onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} className={`flex  p-1 rounded ${open ? `${selected?.id === item?.id ? 'bg-blue-50 text-blue-500' : ''} justify-between ml-2 hover:bg-blue-50` : 'justify-end'} text-[#5F5F5F] cursor-pointer text-md  group hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                        <div className={`flex justify-start items-center gap-2 ${open ? '' : `${selected?.id === item?.id ? 'bg-blue-50 py-1.5 px-2 rounded' : ''} py-1.5 px-2 rounded`}`}>
                                            <Icon icon={item.icon} width='24px' className="group-hover:text-blue-500 h-[20px] w-[20px]" />
                                            <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                        </div>
                                        {item?.option && <RightArrow className={`${open ? '' : 'hidden'}  transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : 'rotate-180'}`} />}
                                    </div>


                                        :


                                        <NavLink onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} to={`/${item?.route}`} className={`flex  group ${open ? `${selected?.id === item?.id ? 'bg-blue-50' : ''} justify-between ml-2 hover:bg-blue-50` : 'justify-end'} text-[#5F5F5F] text-md hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                            <div className={`flex justify-start items-center gap-2 ${open ? '' : `${selected?.id === item?.id ? 'bg-blue-50 py-1.5 px-2 rounded' : ''} py-1.5 px-2 rounded`}  `}>
                                                <Icon icon={item.icon} width='20px' className="group-hover:text-blue-500 h-[20px] w-[20px]" />
                                                <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                            </div>
                                            {item?.option && <RightArrow className={`${open ? '' : 'hidden'} transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : ''}`} />}
                                        </NavLink>
                                }





                                {/* Child Route */}
                                <div className={`pl-2 overflow-hidden transition-all duration-200 ease-in-out ${selected?.id === item?.id ? "max-h-[500px]" : "max-h-0"}`}>
                                    {item?.items?.map((it) => {
                                        return <div>
                                            {
                                                it?.isLink ? <a key={index} href={`${it?.route}`} target="_blank" rel="noopener noreferrer"
                                                    onClick={() => { child?.id === it?.id ? setChaild({}) : setChaild(it) }}
                                                    className={`flex ${child?.id === it?.id ? 'bg-blue-50 text-blue-500' : ''} text-[#5F5F5F] w-full mt-1 text-lg hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 pl-4 py-1.5`}>
                                                    <div className="flex justify-start items-center gap-2">
                                                        <Circle />
                                                        <h1 className={`${open ? '' : 'hidden'} text-sm`}>{it.name}</h1>
                                                    </div>
                                                </a> : <NavLink key={index} to={`/${it?.route}`}
                                                    onClick={() => { child?.id === it?.id ? setChaild({}) : setChaild(it) }}
                                                    className={`flex ${child?.id === it?.id ? 'bg-blue-50 text-blue-500' : ''}
                                               text-[#5F5F5F] w-full mt-1 text-lg hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 pl-4 py-1.5`}>
                                                    <div className="flex justify-start items-center gap-2">
                                                        <Circle />
                                                        <h1 className={`${open ? '' : 'hidden'} text-sm`}>{it.name}</h1>
                                                    </div>
                                                </NavLink>
                                            }
                                        </div>
                                    })}

                                </div>

                            </div>
                        ))}


                        <NavLink to={`/`} onClick={() => { localStorage.setItem('token', ''); isLoggedOut(false); }} className={`flex  group ${open ? 'justify-between ml-2 hover:bg-blue-50' : 'justify-end'} text-[#5F5F5F] text-md hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                            <div className={`flex justify-start items-center gap-2 ${open ? '' : 'hover:bg-blue-50 p-1.5 rounded'}`}>
                                <Icon icon={"uiw:logout"} width='18px' className="group-hover:text-blue-500" />
                                <h1 className={`${open ? '' : 'hidden'} font-roboto group-hover:text-blue-500 font-normal text-[17px]`}>Logout</h1>
                            </div>
                        </NavLink>


                    </div>
                </div>
            }

        </div >
    )
};

export default Header;