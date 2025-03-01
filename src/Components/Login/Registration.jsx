import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectionComponent';
import RoleSelector from './RoleSelector';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import Logo from '../Logo/logu (2).png'


const Registration = () => {
  const [values, setValues] = useState({
    "rules": []
  });
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState([])
  const goToHome = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${BaseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const result = await response.json();
    alert(result.message)
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
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-[450px] pb-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rounded-2xl border px-7'>
        <img src={Logo} alt="logo" className="w-[160px] h-[80px] mx-auto py-2" />
        <form className="max-w-md">
          <InputComponent onChange={(value) => { setValues({ ...values, first_name: value }) }} label={"First Name"} type={"text"} placeholder={"First Name"} />
          <InputComponent onChange={(value) => { setValues({ ...values, last_name: value }) }} label={"Last Name"} type={"text"} placeholder={"Last Name"} />
          <InputComponent onChange={(value) => { setValues({ ...values, username: value }) }} label={"Mobile"} type={"number"} placeholder={"Enter your mobile"} />
          <InputComponent onChange={(value) => { setValues({ ...values, email: value }) }} label={"Email"} type={"email"} placeholder={"Enter your email"} />
          <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={`Select State`} className='font-semibold' />
          <RoleSelector rules={values.rules} onChange={(role) => setValues({ ...values, rules: role })} />
          <div className='py-1 relative'>
            {
              showPassword ? <Show className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(false); console.log("Hide") }} /> : <Hide className='absolute right-2 top-[38px] cursor-pointer' onClick={() => { setShowPassword(true); console.log("Hide") }} />
            }
            <h1 for={"Password"} className={`mb-2 text-start text-sm font-semibold text-gray-900 dark:text-white`}>{"Password"}</h1>
            <input type={showPassword ? "text" : "password"} value={values?.password} required={true} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={"Enter your password"} />
          </div>
          <button onClick={handleSubmit}
            className="text-white bg-blue-700 my-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Submit</button>
        </form>
      </div>
    </div>

  )
}

export default Registration
