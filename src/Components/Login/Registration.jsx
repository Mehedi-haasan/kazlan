import { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import SelectionComponent from '../Input/SelectComp';
import Hide from '../Input/Hide';
import Show from '../Input/Show';
import logo from '../Logo/photo.png'
import Notification from '../Input/Notification';
import { useNavigate } from 'react-router-dom';
import EscapeRedirect from '../Wholesale/EscapeRedirect';


const Registration = ({ state }) => {
  const goto = useNavigate()
  const [message, setMessage] = useState({ id: '', mgs: '' });
  const [image_url, setImage_Url] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [warehouses, setWarehouses] = useState([])
  const [values, setValues] = useState({
    "rules": ["admin"],
    usertype: "Wholesaler",
    compId: 1,
    stateId: 1
  });
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    if (!values?.username || !values?.name) {
      setMessage({ id: Date.now(), mgs: "Phone Number and Full Name Are required" });
      return
    }
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
    setMessage({ id: Date.now(), mgs: data?.message });
    if (data && data?.success) {
      goto(`/users`)
    }

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage_Url(file);
      setImageFile(URL.createObjectURL(file));
    }
  };

  EscapeRedirect('/users')

  return (
    <div className="min-h-screen pb-12 py-5 px-4">
      <Notification message={message} />
      <div className='bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded-xl shadow-lg'>
        <div className='border-b'>
          <h1 className='py-4 pl-8'>User Details</h1>
        </div>
        <div className="z-10 p-8 w-full">
          <div className="space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex justify-start items-center gap-5">
              <div>
                <p className='pb-2 font-semibold'>User Picture</p>
                <img src={imageFile ? imageFile : logo} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-red-500 p-1" />
              </div>
              <div>
                <div className='flex justify-start items-center gap-2 pt-10'>
                  <div className='border rounded-lg px-4 py-1'>
                    <label>
                      <h1 className="font-semibold pt-1 pb-2">Browse</h1>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className='border rounded-lg px-4 py-1.5'>
                    <h1 className="font-semibold py-1">Reset</h1>
                  </div>

                </div>
                <p className='font-thin py-1 text-sm'>Allowed JPG, GIF or PNG. Max size of 1MB</p>
              </div>
            </div>
            <div className=''>
              <label className="block  text-sm  mb-1 font-thin">Full Name</label>
              <input type="text" onChange={(e) => { setValues({ ...values, name: e.target.value }) }} className="w-full p-3 rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 dark:bg-[#040404] dark:text-white" placeholder="Enter your first name" />
            </div>
            <div>
              <label className="block  text-sm  mb-1 font-thin">Phone</label>
              <input type="text" onChange={(e) => { setValues({ ...values, username: e.target.value }) }} className="w-full p-3 dark:bg-[#040404] dark:text-white rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your last name" />
            </div>
            <div>
              <label className="block  text-sm  mb-1 font-thin">Bank Name</label>
              <input type="text" onChange={(e) => { setValues({ ...values, bankname: e.target.value }) }} className="w-full p-3 dark:bg-[#040404] dark:text-white rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your mobile number" />
            </div>
            <div>
              <label className="block  text-sm  mb-1 font-thin">Account Name</label>
              <input type="text" onChange={(e) => { setValues({ ...values, accountname: e.target.value }) }} className="w-full p-3 dark:bg-[#040404] dark:text-white rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your whatsapp number" />
            </div>
            <div>
              <label className="block  text-sm  mb-1 font-thin">Account Number</label>
              <input type="number" onChange={(e) => { setValues({ ...values, accountnumber: e.target.value }) }} className="w-full p-3 dark:bg-[#040404] dark:text-white rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your address" />
            </div>
            <div>
              <label className="block  text-sm  mb-1 font-thin">Address</label>
              <input type="email" onChange={(e) => { setValues({ ...values, address: e.target.value }) }} className="w-full p-3 dark:bg-[#040404] dark:text-white rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your email" />
            </div>
            <div>
              <label className="block  text-sm  mb-1 font-thin">Email</label>
              <input type="email" onChange={(e) => { setValues({ ...values, email: e.target.value }) }} className="w-full p-3 dark:bg-[#040404] dark:text-white rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your email" />
            </div>
            <div>
              <SelectionComponent options={warehouses} onSelect={(v) => { setValues({ ...values, compId: v?.id }) }} label={`Select Warehouse`} className='' />
            </div>
            <div>
              <SelectionComponent options={[{ id: 1, name: "admin" }, { id: 2, name: "superadmin" }]} onSelect={(v) => { setValues({ ...values, rules: [v?.name] }) }} label={`User Role`} className='' />
            </div>
            <div className='relative'>
              <label className="block  text-sm  mb-1 font-thin">Password</label>
              {
                showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer ' onClick={() => { setShowPassword(false); }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer ' onClick={() => { setShowPassword(true); }} />
              }
              <input type={showPassword ? "text" : "password"} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 bg-white/20  rounded-lg focus:outline-none border font-thin focus:ring-2 focus:ring-blue-400 " placeholder="Enter your password" />
            </div>

          </div>
          <div className='pt-5'>
            <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600  text-white py-3 rounded-lg transition-all">
              Sign Up
            </button>
          </div>
          <p className="text-center text-sm text-gray-300 mt-4">
            Have an account? <a href="/" className="text-blue-400 hover:underline">Sign In</a>
          </p>
        </div>
      </div>

    </div>

  )
}

export default Registration

