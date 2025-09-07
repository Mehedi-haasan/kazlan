import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../../Constant';
import Show from '../Input/Show';
import Hide from '../Input/Hide';




const OtpVarification = () => {
    const goToHome = useNavigate();
    const [values, setValues] = useState('');
    const [showPassword, setShowPassword]=useState(false)


    const handleSubmit = async () => {
        const response = await fetch(`${BaseUrl}/api/otp/varification`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ values: values }),
        })
        const data = await response.json()
        goToHome('/')
    }


    return (
        <div className="relative flex items-center justify-center min-h-screen pb-12 bg-cover bg-center"
            style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/library-illustration-book-shelves-with-interior-wooden-furniture-education-knowledge_2175-18763.jpg?w=996')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl w-96">
                <h2 className="text-2xl font-bold text-white text-center mb-6">OTP Varification</h2>

                <div className='my-5'>
                    <label className="block text-white text-sm font-semibold mb-1">Enter your OTP</label>
                    <input type="number" onChange={(e) => { setValues(e.target.value) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your OTP" />
                </div>
                <div className='relative mb-5'>
                    <label className="block text-white text-sm font-semibold mb-1">New Password</label>
                    {
                        showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(false); }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(true); }} />
                    }
                    <input type={showPassword ? "text" : "password"} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
                </div>
                <div className='relative mb-5'>
                    <label className="block text-white text-sm font-semibold mb-1">Confirm Password</label>
                    {
                        showPassword ? <Show className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(false); }} /> : <Hide className='absolute right-2 top-[35px] cursor-pointer text-white' onClick={() => { setShowPassword(true); }} />
                    }
                    <input type={showPassword ? "text" : "password"} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit() } }} onChange={(e) => { setValues({ ...values, password: e.target.value }) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your password" />
                </div>
                <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all">
                    Submit
                </button>
            </div>

        </div>
    )
}

export default OtpVarification
