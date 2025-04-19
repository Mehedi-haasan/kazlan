import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../../Constant';




const ForgetPassword = () => {
  const goToHome = useNavigate();
  const [email, setEmail] = useState("")





  const handleSubmit = async () => {
    const response = await fetch(`${BaseUrl}/api/forget/password`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ email: email }),
    })
    const data = await response.json()
    goToHome('/OTP/varification')
  }


  return (
    <div className="relative flex items-center justify-center min-h-screen pb-12 bg-cover bg-center"
      style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/library-illustration-book-shelves-with-interior-wooden-furniture-education-knowledge_2175-18763.jpg?w=996')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Forget Password</h2>

        <div className='my-5'>
          <label className="block text-white text-sm font-semibold mb-1">Email your email</label>
          <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300" placeholder="Enter your email" />
        </div>
        <button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all">
          Submit
        </button>
      </div>

    </div>
  )
}

export default ForgetPassword
