import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectComp';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = ({ state }) => {

  const [warehouses, setWarehouses] = useState([])
  const [values, setValues] = useState({
    "rules": ["admin"],
    usertype: "Wholesaler",
    compId: 1,
    stateId: 1
  });
  const [showPassword, setShowPassword] = useState(false)

  let user = [{ id: 1, name: "Wholesaler" }, { id: 2, name: "Retailer" }]

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    toast(data.message)
  }

  const GetWarehouse = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BaseUrl}/api/get/all/company`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    });
    const data = await response.json();
    setWarehouses(data?.items)
  }


  useEffect(() => {
    document.title = "Registration - KazalandBrothers";
    GetWarehouse()
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('${BaseUrl}/uploads/bg.png')` }}>
      <ToastContainer />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl w-[800px]">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Registration</h2>
        <div className="space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='grid col-span-2'>
            <label className="block text-white text-sm font-semibold mb-1">Full Name</label>
            <input type="text" onChange={(e) => { setValues({ ...values, name: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your first name" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Phone</label>
            <input type="text" onChange={(e) => { setValues({ ...values, username: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your last name" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Bank Name</label>
            <input type="text" onChange={(e) => { setValues({ ...values, bankname: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your mobile number" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Account Name</label>
            <input type="text" onChange={(e) => { setValues({ ...values, accountname: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your whatsapp number" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Account Number</label>
            <input type="number" onChange={(e) => { setValues({ ...values, accountnumber: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your address" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Address</label>
            <input type="email" onChange={(e) => { setValues({ ...values, address: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Email</label>
            <input type="email" onChange={(e) => { setValues({ ...values, email: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
          </div>
          <div>
            <SelectionComponent options={warehouses} onSelect={(v) => { setValues({ ...values, compId: v?.id }) }} label={`Select Warehouse`} className='font-semibold' />
          </div>
          <div>
            <SelectionComponent options={state} onSelect={(v) => { setValues({ ...values, stateId: v?.id }) }} label={`Select State`} className='font-semibold' />
          </div>
          <div>
            <SelectionComponent options={user} onSelect={(v) => { setValues({ ...values, usertype: v?.name }) }} label={`User Type`} className='font-semibold' />
          </div>
          <div className='relative'>
            <label className="block text-white text-sm font-semibold mb-1">Password</label>
            {
              showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(false); }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(true); console.log("Hide") }} />
            }
            <input type={showPassword ? "text" : "password"} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
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

