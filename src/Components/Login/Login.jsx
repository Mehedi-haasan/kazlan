import React, { useState, useEffect } from 'react'
import BaseUrl from '../../Constant';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Logo/logo_delta.png'
import login_logo from '../Logo/login-cover.svg'
import us from '../Logo/united.png'
import bn from '../Logo/bangladesh.png'


const Login = ({ auth }) => {
  const goto = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    const response = await fetch(`${BaseUrl}/api/auth/signin`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    toast(data?.message)
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
      auth(true)
      goto('/dashboard')
    }


  }

  useEffect(() => {
    document.title = "Login - KazalandBrothers";
  }, []);


  return (
    <div>
      <ToastContainer />
      <div className='grid grid-cols-1 lg:grid-cols-3 min-h-[95vh] h-full bg-white'>

        <div className='grid lg:col-span-2 lg:bg-[#F7F7FF]'>
          <div className='hidden lg:block'>
            <div className='flex justify-center items-center h-full min-h-[95vh]'>
              <img src={login_logo} alt='login_logu' className='w-[550px] h-[550px]' />
            </div>
          </div>
        </div>

        <div className='grid col-span-1 border-l'>
          <div className=' flex justify-center items-center '>
            <div className="z-10 p-8 rounded-2xl w-full">
              <img src={logo} alt='image' className='h-12 w-12 rounded mx-auto' />
              <h2 className="text-xl font-semibold text-center mt-2">KazalandBrothers</h2>
              <p className="text-center mt-2 font-normal">Please Login to your account</p>

              <div className='mb-2'>
                <label className="block  text-sm font-semibold mb-1">Email</label>
                <input type="email" onChange={(e) => { setValues({ ...values, username: e.target.value }) }} className="w-full p-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border placeholder-gray-300" placeholder="Enter your email" />
              </div>
              <div className='relative mb-5'>
                <label className="block text-sm font-semibold mb-1">Password</label>
                {
                  showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer ' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer' onClick={() => { setShowPassword(true); console.log("Hide") }} />
                }
                <input type={showPassword ? "text" : "password"} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 rounded-lg focus:outline-none border focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
              </div>
              <div className='flex justify-between items-center mb-3'>
                <p className="text-center text-sm text-gray-300 flex justify-start items-center gap-1">
                  Remenber me<input type='checkbox' />
                </p>
                <p className="text-center text-sm text-gray-300 ">
                  <a href="/forget/password" className="text-blue-400 hover:underline">Forgot Password</a>
                </p>
              </div>
              <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all">
                Log In
              </button>

              <div>
                <p className="text-center text-sm text-gray-300 mt-4">
                  Don't have an account? <a href="/registration" className="text-blue-400 hover:underline">Sign Up</a>
                </p>
              </div>
              <div className='flex justify-center items-center gap-3 mt-3 font-normal text-sm'>
                <div className='flex justify-start items-center gap-1'>
                  <img src={us} alt='flag' className='h-4 w-4' />
                  <h1>English</h1>
                </div>
                <div className='flex justify-start items-center gap-1'>
                  <img src={bn} alt='flag' className='h-5 w-5' />
                  <h1>Bangla</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login



{/* <div className="relative flex items-center justify-center min-h-screen pb-12 bg-cover bg-center" style={{ backgroundImage: `url('${BaseUrl}/uploads/bg.png')` }}>


  <div>
    <ToastContainer />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl w-96">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>

      <div className='mb-2'>
        <label className="block text-white text-sm font-semibold mb-1">Email</label>
        <input type="email" onChange={(e) => { setValues({ ...values, username: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
      </div>
      <div className='relative mb-5'>
        <label className="block text-white text-sm font-semibold mb-1">Password</label>
        {
          showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(true); console.log("Hide") }} />
        }
        <input type={showPassword ? "text" : "password"} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
      </div>
      <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all">
        Sign In
      </button>

      <div>
        <p className="text-center text-sm text-gray-300 mt-4">
          Don't have an account? <a href="/registration" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
        <p className="text-center text-sm text-gray-300 mt-4">
          <a href="/forget/password" className="text-blue-400 hover:underline">Forgot Password</a>
        </p>
      </div>
    </div>
  </div>


</div> */}