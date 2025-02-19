import React, { useState } from 'react'
import InputComponent from '../Input/InputComponent';
import BaseUrl from '../../Constant';

const Login = ({auth}) => {

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    const response = await fetch(`${BaseUrl}/api/auth/signin`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    alert(data.message)
    localStorage.setItem('token', data.accessToken);
    auth(true)

  }



  return (
    <div className='flex justify-center items-center bg-white'>
      <div className='w-full md:w-[420px] py-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl border p-5'>
        <div className="">
          <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Your email or phone number"} type={"text"} placeholder={"Enter your email or phone number"} />
          <InputComponent onChange={(value) => { setValues({ ...values, password: value }) }} label={"Your password"} type={"password"} placeholder={"Password"} />


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
