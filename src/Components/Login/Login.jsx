import React, { useState } from 'react'
import BaseUrl from '../../Constant';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import { useNavigate } from 'react-router-dom';


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
    alert(data?.message)
    if (data && data.accessToken && data.success) {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('name', data.name);
      localStorage.setItem('role', data.role);
      localStorage.setItem('id', data.id);
      auth(true)
      goto('/dashboard')
    }


  }


  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/library-illustration-book-shelves-with-interior-wooden-furniture-education-knowledge_2175-18763.jpg?w=996')" }}>
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
  )
}

export default Login



// <div className='flex justify-center items-center bg-white'>
//   <div className='w-full md:w-[420px] pb-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl border p-5'>
//     <img src={Logo} alt="logo" className="w-[160px] h-[80px] mx-auto pb-2" />
//     <div className="">
//       <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Your email or phone number"} type={"text"} placeholder={"Enter your email or phone number"} />
//       <div className='py-1 relative'>
//         {
//           showPassword ? <Show className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(true); console.log("Hide") }} />
//         }
//         <h1 for={"Password"} className={`mb-2 text-start text-sm font-semibold text-gray-900 dark:text-white`}>{"Password"}</h1>
//         <input type={showPassword ? "text" : "password"} value={values?.password} required={true} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={"Enter your password"} />
//       </div>


//       <div className="flex items-start mb-5 mt-1">
//         <div className="flex items-center h-5">
//           <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
//         </div>
//         <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
//       </div>


//       <button onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//     </div>
//   </div>
// </div>