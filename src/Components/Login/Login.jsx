import React, { useState, useEffect, useRef } from 'react'
import BaseUrl from '../../Constant';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import { useNavigate } from 'react-router-dom';
import Notification from '../Input/Notification'
import logo from '../Logo/logo_delta.png'
import login_logo from '../Logo/login-cover.svg'


const Login = ({ auth }) => {
  const goto = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
  const pass = useRef()
  const handleSubmit = async () => {

    try {
      const response = await fetch(`${BaseUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setMessage({ ...message, id: Date.now(), mgs: data?.message })
      if (data && data.accessToken && data.success) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('name', data.name);
        localStorage.setItem('image', data.image);
        localStorage.setItem('role', data.role);
        localStorage.setItem('id', data.id);
        localStorage.setItem('usertype', data.usertype);
        localStorage.setItem('logo', data.logo);
        localStorage.setItem('shopname', data.shopname);
        localStorage.setItem('compId', data?.compId);
        localStorage.setItem('shopcode', data?.shopcode);
        auth(true)
        goto('/dashboard')
      }
    } catch (error) {
      setMessage({ ...message, id: Date.now(), mgs: error?.message })
    }
  }

  useEffect(() => {
    document.title = "Login - KazalandBrothers";
  }, []);


  return (
    <div>
      <Notification message={message} />
      <div className='grid grid-cols-1 lg:grid-cols-3 min-h-[95vh] h-full bg-white dark:bg-[#040404] dark:text-white'>

        <div className='grid lg:col-span-2 lg:bg-[#F7F7FF] dark:bg-[#040404] dark:text-white'>
          <div className='hidden lg:block'>
            <div className='flex justify-center items-center h-full min-h-[95vh]'>
              <img src={login_logo} alt='login_logu' className='w-[550px] h-full' />
            </div>
          </div>
        </div>

        <div className='grid col-span-1 border-l'>
          <div className=' flex justify-center items-center '>
            <div className="z-10 p-8 rounded-2xl w-full">
              <img src={logo} alt='image' className='h-12 w-12 rounded mx-auto' />
              <h2 className="text-xl font-semibold text-center mt-2">Kazal and Brothers</h2>
              <p className="text-center mt-2 font-normal pb-10">Please login to your account</p>

              <div className='mb-2'>
                <label className="block  text-sm font-semibold mb-1">Email / Phone Number</label>
                <input type="email" onKeyDown={(e) => {
                  if (e.key === "Enter") { pass.current.focus() }
                }} onChange={(e) => { setValues({ ...values, username: e.target.value }) }} className="w-full p-3 font-thin rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border placeholder-gray-300 dark:bg-[#040404] dark:text-white" placeholder="Enter your email" />
              </div>
              <div className='relative mb-5'>
                <label className="block text-sm font-semibold mb-1">Password</label>
                {
                  showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer ' onClick={() => { setShowPassword(false); }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer' onClick={() => { setShowPassword(true); }} />
                }
                <input type={showPassword ? "text" : "password"} ref={pass} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 rounded-lg focus:outline-none dark:bg-[#040404] dark:text-white font-thin border focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
              </div>

              <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

