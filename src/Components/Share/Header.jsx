import { NavLink } from "react-router-dom";
import Notification from "../../icons/Notification";
import MessageBar from "./MessageBar";
import logo from '../Logo/library.png'


const Header = ({ auth }) => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  return (
    <div className="sticky top-0 z-50 shadow">

      <div className="flex justify-between items-center sticky top-0 z-50 w-[100%] px-2 mx-auto bg-white py-1">

        <div className="">
          <NavLink className={`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#FB923C] py-2`} to="/">
          <img src={logo} alt="dhyfg" className="w-[70px] h-[50px] p-1"/>
          </NavLink>
        </div>


        <div className="flex justify-end items-center gap-3">
          {auth ? <NavLink to='/profile' className='font-bold text-sm xl:text-md mr-2'>My Account</NavLink> : <NavLink to={`/`} className='font-semibold text-sm lg:text-md'>LOGIN</NavLink>}
          <NavLink to='/notification' className="relative hover:bg-slate-200 p-2 rounded-full">
            <Notification />
            <h1 className="text-red-600 absolute top-0 right-[2px] font-semibold text-sm">{generateRandomNumber()}</h1>
          </NavLink>
        </div>
      </div>

      <MessageBar userId={1} />
    </div >
  )
};

export default Header;

