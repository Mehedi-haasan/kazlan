import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import Noti from "../Input/Notification";


const Header = ({ auth, isLoggedOut, open, isOpen, notification, info = {}, lang = {}, darkMode, changeLan, changetheme, message = {} }) => {
    const [selected, setSelected] = useState({});
    const [child, setChaild] = useState({});
    const [isShowProfile, setIsShowProfile] = useState(false);
    const [lan, setLan] = useState(false);
    const [noti, setNoti] = useState([]);
    const [mood, setMode] = useState(true)
    const lan_ref = useRef(null)
    const wiz_pro = useRef(null)

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
        setMode(!darkMode);
    }, [])

    useEffect(() => {
        setNoti(notification)
    }, [notification, noti])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (lan_ref.current && !lan_ref.current.contains(event.target)) {
                setLan(false);
            }
            if (wiz_pro.current && !wiz_pro.current.contains(event.target)) {
                setIsShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);




    return (
        <div className={`w-full top-0 z-50 shadow fixed ${auth ? '' : 'hidden'}`}>
            <Noti message={message} />
            <div className="flex justify-between items-center z-50 w-[100%] px-2 mx-auto bg-[#FFFFFF] dark:bg-[#040404] dark:border-b py-2">
                <div></div>
                <div className="flex justify-end items-center gap-3">
                    {
                        auth && <div className="hidden md:block">
                            <NavLink to={`/purchase/product`} className="border font-thin hover:bg-blue-500 hover:text-white rounded-full px-5 py-1 text-md border-[#3A95EE] flex float-start items-center gap-1 text-[#3A95EE]"><Add />{lang?.purchase}</NavLink>
                        </div>
                    }

                    {auth && <NavLink to={`/sale/order`} className="border font-thin rounded-full px-4 py-1 border-green-600 flex float-start text-md items-center gap-1 text-green-600 hover:bg-green-600 hover:text-white"><Add />{lang?.sale}</NavLink>}
                    {/* {auth && <NavLink to={`/sales/update/`} className="border font-thin rounded-full px-2 py-1 border-green-500 bg-green-500 flex float-start text-md items-center gap-1 text-white"><Add />POS</NavLink>} */}
                    <div className="flex justify-start items-start gap-2 cursor-pointer relative">
                        <div ref={lan_ref} className={`absolute ${lan ? '' : 'hidden'} bg-[#FFFFFF] shadow h-20 w-32 top-8 rounded-lg`}>
                            <div className="">
                                <button onClick={() => { setLan(!lan); localStorage.setItem('lan', 'bn'); changeLan('bn'); }} className="flex justify-start items-center gap-1 border-b p-2">
                                    {/* <img src={flag} alt="flag" className="h-7 w-7 p-1 cursor-pointer" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#006a4d" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4z" /><circle cx="16" cy="17.5" r="7" fill="#f42a41" /></svg>
                                    <h1>Bangla</h1>
                                </button>
                                <button onClick={() => { setLan(!lan); localStorage.setItem('lan', 'en'); changeLan('en'); }} className="flex justify-start items-center gap-1 px-2 pb-2">
                                    <img src={flag} alt="flag" className="h-7 w-7 p-1 cursor-pointer" />
                                    <h1> English</h1>
                                </button>
                            </div>
                        </div>
                    </div>



                    <svg onClick={() => { setLan(!lan) }} className="h-[36px] w-[36px] p-1 cursor-pointer text-gray-600 hidden md:block"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1S1 5.925 1 12s4.925 11 11 11Zm0 0c3 0 4-5 4-11S15 1 12 1S8 6 8 12s1 11 4 11ZM2 16h20M2 8h20" />
                    </svg>
                    <div className="border-r pr-3 hidden md:block">
                        {
                            mood ? <svg onClick={() => { setMode(!mood); localStorage.setItem("theme", "dark"); changetheme("dark") }} className="h-10 w-10 p-1 cursor-pointer text-gray-600 rotate-[130deg]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 2q2.075 0 3.9.788t3.175 2.137T18.713 8.1T19.5 12t-.788 3.9t-2.137 3.175t-3.175 2.138T9.5 22q-1.325 0-2.588-.337T4.5 20.65Q6.825 19.3 8.163 17T9.5 12T8.162 7T4.5 3.35q1.15-.675 2.413-1.012T9.5 2" /></svg> :
                                <svg onClick={() => { setMode(!mood); localStorage.setItem("theme", "light"); changetheme("light") }} className="h-10 w-10 p-1 cursor-pointer text-gray-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="M19 9.199h-.98c-.553 0-1 .359-1 .801c0 .441.447.799 1 .799H19c.552 0 1-.357 1-.799c0-.441-.449-.801-1-.801M10 4.5A5.483 5.483 0 0 0 4.5 10c0 3.051 2.449 5.5 5.5 5.5c3.05 0 5.5-2.449 5.5-5.5S13.049 4.5 10 4.5m0 9.5c-2.211 0-4-1.791-4-4c0-2.211 1.789-4 4-4a4 4 0 0 1 0 8m-7-4c0-.441-.449-.801-1-.801H1c-.553 0-1 .359-1 .801c0 .441.447.799 1 .799h1c.551 0 1-.358 1-.799m7-7c.441 0 .799-.447.799-1V1c0-.553-.358-1-.799-1s-.801.447-.801 1v1c0 .553.359 1 .801 1m0 14c-.442 0-.801.447-.801 1v1c0 .553.359 1 .801 1c.441 0 .799-.447.799-1v-1c0-.553-.358-1-.799-1m7.365-13.234c.391-.391.454-.961.142-1.273s-.883-.248-1.272.143l-.7.699c-.391.391-.454.961-.142 1.273s.883.248 1.273-.143zM3.334 15.533l-.7.701c-.391.391-.454.959-.142 1.271s.883.25 1.272-.141l.7-.699c.391-.391.454-.961.142-1.274s-.883-.247-1.272.142m.431-12.898c-.39-.391-.961-.455-1.273-.143s-.248.883.141 1.274l.7.699c.391.391.96.455 1.272.143s.249-.883-.141-1.273zm11.769 14.031l.7.699c.391.391.96.453 1.272.143c.312-.312.249-.883-.142-1.273l-.699-.699c-.391-.391-.961-.455-1.274-.143s-.248.882.143 1.273" />
                                </svg>
                        }

                    </div>

                    {auth ? <div className="flex justify-start items-start gap-2 cursor-pointer relative">
                        <button className='font-bold text-sm xl:text-md cursor-pointer' onClick={() => setIsShowProfile(!isShowProfile)}>
                            <img src={info?.image} alt="profile" className="h-10 w-10 rounded-full cursor-pointer" />
                        </button>
                        <div onClick={() => setIsShowProfile(!isShowProfile)} className="hidden md:block dark:text-white">
                            <h1 className="text-sm font-semibold pt-1">{info?.name}</h1>
                            <p className="text-xs">{info?.role}</p>
                        </div>
                        <div ref={wiz_pro} className={`absolute ${isShowProfile ? '' : 'hidden'} bg-[#FFFFFF] shadow h-20 w-32 top-[52px] rounded-lg`}>
                            <div className="">
                                <NavLink to={`/profile`} onClick={() => setIsShowProfile(!isShowProfile)} className="flex justify-start items-center gap-2 border-b p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
                                    <h1>Profile</h1>
                                </NavLink>
                                <button className="flex justify-start items-center gap-2 ml-1 p-2" onClick={() => { setIsShowProfile(!isShowProfile); localStorage.setItem('token', ''); isLoggedOut(false); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.99 9.99 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.99 9.99 0 0 1-8-4" /></svg>
                                    <h1> Log out</h1>
                                </button>
                            </div>
                        </div>
                    </div> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}

                    <NavLink to='/notification' className="relative p-1 rounded-full mr-1">
                        <div className={`w-8 h-8 ${noti?.length === 0 ? 'hidden' : ''}`}>
                            {View}
                        </div>
                        <div className={`w-8 h-8 p-1 ${noti?.length === 0 ? '' : 'hidden'}`}>
                            <Notification />
                        </div>

                        <h1 className="text-red-600 absolute -top-1.5 right-[2px] font-semibold text-sm">{noti?.length > 0 ? noti?.length : null}</h1>
                    </NavLink>

                </div>
            </div>

            {
                auth && <div className={`absolute bg-[#FFFFFF] dark:bg-[#040404] dark:text-white transition-all top-0 ease-in duration-200 z-50 shadow-xl border-r border-red-300 w-[230px] min-h-[100vh]   ${open ? "left-[0px]" : "left-[-230px] md:left-[-170px]"}`}>
                    <div className={`flex items-center border-b py-2 ${open ? 'justify-between ml-3' : 'justify-end mr-2.5'}`} >
                        <div className="">
                            <NavLink className={`pb-1`} onClick={() => { isOpen(!open); setSelected({}) }}>
                                <img src={logo} alt="header" className="w-[40px] h-[40px]" />
                            </NavLink>
                        </div>
                        <div className={`${open ? 'mr-4' : 'hidden'} flex justify-end items-start relative`}>
                            {open ? <Icon icon={"mynaui:pin-solid"} width='28px' onClick={() => { isOpen(false); setSelected({}) }} className={`${open ? '' : 'hidden'} text-[#3C9DEA] cursor-pointer`} /> : <Icon icon={"mynaui:pin"} width='28px' onClick={() => { isOpen(false); setSelected({}) }} className={`${open ? '' : 'hidden'} text-[#3C9DEA] cursor-pointer`} />}


                        </div>
                    </div>


                    <div className='max-h-[100vh] overflow-y-auto hide-scrollbar pr-1.5 pt-1.5 pb-14 '>
                        {data?.map((item, index) => (
                            <div className="">
                                {
                                    item?.option ? <div onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} className={`flex  p-1 rounded ${open ? `${selected?.id === item?.id ? 'bg-blue-50 dark:bg-[#22262A] text-blue-500 dark:text-white' : ''} dark:hover:bg-[#22262A] justify-between ml-2 ${item?.className} hover:bg-blue-50` : 'justify-end'} text-[#5F5F5F] dark:text-white ${item?.name === "Warehouse" && info?.role === "admin" ? "hidden" : ""} cursor-pointer text-md  group hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                        <div className={`flex justify-start items-center gap-2 ${open ? '' : `${selected?.id === item?.id ? 'bg-blue-50 py-1.5 px-2 rounded' : ''} py-1.5 px-2 rounded`}`}>
                                            <Icon icon={item.icon} width='24px' className="group-hover:text-blue-500 h-[20px] w-[20px]" />
                                            <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                        </div>
                                        {item?.option && <RightArrow className={`${open ? '' : 'hidden'}  transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : 'rotate-180'}`} />}
                                    </div>


                                        :


                                        <NavLink onClick={() => { selected?.id === item?.id ? setSelected({}) : setSelected(item) }} key={index} to={`/${item?.route}`} className={`flex  group ${open ? `${selected?.id === item?.id ? 'bg-blue-50 dark:bg-[#22262A]' : ''} justify-between ml-2 dark:hover:bg-[#22262A] hover:bg-blue-50` : 'justify-end'} text-[#5F5F5F] dark:text-white ${item?.className} text-md hover:text-blue-500 rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                                            <div className={`flex justify-start items-center gap-2 ${open ? '' : `${selected?.id === item?.id ? 'bg-blue-50 py-1.5 px-2 rounded' : ''} py-1.5 px-2 rounded`}  `}>
                                                <Icon icon={item.icon} width='20px' className="group-hover:text-blue-500 h-[20px] w-[20px]" />
                                                <h1 className={`${open ? '' : 'hidden'}`}>{item.name}</h1>
                                            </div>
                                            {item?.option && <RightArrow className={`${open ? '' : 'hidden'} transition-transform duration-300 ${selected?.id === item?.id ? 'rotate-90' : ''}`} />}
                                        </NavLink>
                                }





                                {/* Child Route */}
                                <div className={`pl-2 overflow-hidden transition-all dark:text[#040404] duration-200 ease-in-out ${selected?.id === item?.id ? "max-h-[500px]" : "max-h-0"}`}>
                                    {item?.items?.map((it) => {
                                        return <div>
                                            {
                                                it?.isLink ? <a key={index} href={`${it?.route}`} target="_blank" rel="noopener noreferrer"
                                                    onClick={() => { child?.id === it?.id ? setChaild({}) : setChaild(it) }}
                                                    className={`flex ${child?.id === it?.id ? 'bg-blue-50 dark:bg-[#22262A] text-blue-500' : ''} text-[#5F5F5F] dark:text-white dark:hover:bg-[#22262A] w-full text-lg
                                                      ${it?.name === "Users and Roles" && info?.role === "admin" ? "hidden" : ""}
                                                       ${it?.name === "App Setting" && info?.role === "admin" ? "hidden" : ""}
                                                      hover:bg-blue-50 hover:text-blue-500 rounded justify-start items-center gap-2 pl-8 py-1.5`}>
                                                    <div className="flex justify-start items-center gap-2 ">
                                                        <Circle />
                                                        <h1 className={`${open ? '' : 'hidden'} text-sm`}>{it.name}</h1>
                                                    </div>
                                                </a> : <NavLink key={index} to={`/${it?.route}`}
                                                    onClick={() => { child?.id === it?.id ? setChaild({}) : setChaild(it) }}
                                                    className={`flex ${child?.id === it?.id ? 'bg-blue-50 dark:bg-[#22262A] text-blue-500' : ''}
                                               text-[#5F5F5F] dark:text-white dark:hover:bg-[#22262A] w-full mt-1 text-lg hover:bg-blue-50 hover:text-blue-500 rounded
                                                ${it?.name === "Users and Roles" && info?.role === "admin" ? "hidden" : ""}
                                                ${it?.name === "App Setting" && info?.role === "admin" ? "hidden" : ""}
                                                 justify-start items-center gap-2 pl-8 py-1.5`}>
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


                        <NavLink to={`/`} onClick={() => { localStorage.setItem('token', ''); isLoggedOut(false); }} className={`flex  group ${open ? 'justify-between ml-2 mt-4 hover:bg-blue-50' : 'justify-end'} text-[#5F5F5F] text-md hover:bg-blue-50 hover:text-blue-500 dark:text-white rounded justify-start items-center gap-2 py-1.5 px-2 mb-1`}>
                            <div className={`flex justify-start items-center gap-2 ${open ? '' : 'hover:bg-blue-50 lg:pl-1.6 pr-2 py-1.5 rounded'}`}>
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