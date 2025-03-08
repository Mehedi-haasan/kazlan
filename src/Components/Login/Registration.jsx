import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectComp';
import RoleSelector from './RoleSelector';
import Hide from '../Input/Hide';
import Show from '../Input/Show';


const Registration = () => {
  const [values, setValues] = useState({
    "rules": []
  });
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState([])
  const goToHome = useNavigate();
  let user = [{ id: 1, name: "User" }, { id: 2, name: "Customer" }, { id: 3, name: "Supplier" }]


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${BaseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (data && data.accessToken && data.success) {
      alert(data.message)
      goToHome('/')
    }

  }


  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch(`${BaseUrl}/api/get/state`);
      const data = await response.json();
      if (data && data?.items?.length > 0) {
        setState(data?.items || []);
      }
    }

    fetchState()
  }, [])

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/library-illustration-book-shelves-with-interior-wooden-furniture-education-knowledge_2175-18763.jpg?w=996')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl w-[800px]">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Registration</h2>
        <div className="space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-1">First Name</label>
            <input type="text" onChange={(e) => { setValues({ ...values, first_name: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Last Name</label>
            <input type="text" onChange={(e) => { setValues({ ...values, last_name: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Mobile</label>
            <input type="number" onChange={(e) => { setValues({ ...values, username: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Email</label>
            <input type="email" onChange={(e) => { setValues({ ...values, email: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
          </div>
          <div>
            <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={`Select State`} className='font-semibold' />
          </div>
          <div>
            <SelectionComponent options={user} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={`User Type`} className='font-semibold' />
          </div>
          <div className='relative'>
            <label className="block text-white text-sm font-semibold mb-1">Password</label>
            {
              showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(true); console.log("Hide") }} />
            }
            <input type={showPassword ? "text" : "password"} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
          </div>
          <div className=''>
            <RoleSelector rules={values.rules} onChange={(role) => setValues({ ...values, rules: role })} />
          </div>
        </div>
        <div className='pt-5'>
          <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all">
            Sign Up
          </button>
        </div>
        <p className="text-center text-sm text-gray-300 mt-4">
          Have an account? <a href="/" className="text-blue-400 hover:underline">Sign In</a>
        </p>
      </div>
    </div>

  )
}

export default Registration


// < div className = 'flex justify-center items-center' >
//   <div className='w-full md:w-[450px] pb-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl border px-7'>
//     <img src={Logo} alt="logo" className="w-[160px] h-[80px] mx-auto py-2" />
//     <form className="max-w-md">
//       <InputComponent onChange={(value) => { setValues({ ...values, first_name: value }) }} label={"First Name"} type={"text"} placeholder={"First Name"} />
//       <InputComponent onChange={(value) => { setValues({ ...values, last_name: value }) }} label={"Last Name"} type={"text"} placeholder={"Last Name"} />
//       <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Mobile"} type={"number"} placeholder={"Enter your mobile"} />
//       <InputComponent onChange={(value) => { setValues({ ...values, email: value }) }} label={"Email"} type={"email"} placeholder={"Enter your email"} />
//       <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={`Select State`} className='font-semibold' />
//       <RoleSelector rules={values.rules} onChange={(role) => setValues({ ...values, rules: role })} />
//       <div className='py-1 relative'>
//         {
//           showPassword ? <Show className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(true); console.log("Hide") }} />
//         }
//         <h1 for={"Password"} className={`mb-2 text-start text-sm font-semibold text-gray-900 dark:text-white`}>{"Password"}</h1>
//         <input type={showPassword ? "text" : "password"} value={values?.password} required={true} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={"Enter your password"} />
//       </div>
//       <button onClick={handleSubmit}
//         className="text-white bg-blue-700 my-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >Submit</button>
//     </form>
//   </div>
//   </div >