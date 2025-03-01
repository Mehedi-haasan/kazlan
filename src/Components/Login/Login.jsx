import React, { useState } from 'react'
import InputComponent from '../Input/InputComponent';
import BaseUrl from '../../Constant';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import Logo from '../Logo/logu (2).png'


const Login = ({ auth }) => {

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
    if (data && data.accessToken && data.success) {
      alert(data.message)
      localStorage.setItem('token', data.accessToken);
      auth(true)
    }


  }



  return (
    <div className='flex justify-center items-center bg-white'>
      <div className='w-full md:w-[420px] pb-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl border p-5'>
        <img src={Logo} alt="logo" className="w-[160px] h-[80px] mx-auto pb-2" />
        <div className="">
          <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Your email or phone number"} type={"text"} placeholder={"Enter your email or phone number"} />
          <div className='py-1 relative'>
            {
              showPassword ? <Show className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(true); console.log("Hide") }} />
            }
            <h1 for={"Password"} className={`mb-2 text-start text-sm font-semibold text-gray-900 dark:text-white`}>{"Password"}</h1>
            <input type={showPassword ? "text" : "password"} value={values?.password} required={true} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={"Enter your password"} />
          </div>


          <div className="flex items-start mb-5 mt-1">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>


          <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login
