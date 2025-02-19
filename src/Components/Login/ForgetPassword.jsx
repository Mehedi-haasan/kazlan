import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
    const [login, setLogin]=useState(false);
    const goToHome=useNavigate();
    const [values, setValues]=useState({
      email:"",
})

const [errorMessage, setErrorMessage]=useState("")


    

      const handleSubmit =(e)=>{
        e.preventDefault();
        // axios.post('http://localhost:5000/forgetPassword/',values)
        // .then(res=> {
        //   console.log(res.data)
        //   if(res.data === "Success"){
        //     alert("Login Successfull")
        //   }else{
        //     setErrorMessage(res.data);
        //   }
        // })
        // .catch(err => setErrorMessage(err))
        
      }
  return (
    <div className='bg-white'>
    <div className='bg-white'>
      <h1 className='py-5'>{}</h1>
     

          <div className='grid col-span-12 md:col-span-6 rounded-xl pr-5'>
          {
              login ?  <div className='w-full md:w-[40%] mx-auto'>
              <h1 className='text-center text-xl font-semibold py-6 '>Recover your password</h1>
                  
                <div className='mt-5 mx-auto w-[95%]'>
                  <label className='text-xl font-semibold pt-4'>Enter your OTP</label>
                  <input type='text' placeholder='Enter your OTP' className='border-b py-1 w-full focus:outline-none'/>
                </div>

                  <div className='mt-5 mx-auto w-[95%]'>
                  <label className='mt-2 text-xl font-semibold pt-4'>New password</label>
                  <input type='text' placeholder='Enter your new password' className='border-b py-1 w-full focus:outline-none'/>
                  </div>

                 <div className='mt-5 mx-auto w-[95%]'>
                 <label className='text-xl font-semibold pt-4'>Confirm Password</label>
                  <input type='text' placeholder='Enter your confirm password' className='border-b py-1 w-full focus:outline-none'/>
                 </div>

                   
                  <div className='flex my-6 mx-auto w-[95%]'>
                      <button onClick={()=>{goToHome("/")}} className='border block font-semibold bg-[#1B80E0] text-white mx-auto px-6 h-10 rounded-xl w-full'>Submit</button>
                  </div>
            </div>:<div className='w-full md:w-[40%] mx-auto'>
              <h1 className='text-center text-xl font-semibold py-6 '>Forget Password</h1>
                  
                  
                   <h1 className='text-center p-2'>Lost your password? Please enter your username or email address.<br/> You will receive a link to create a new password via email.</h1>
                  <div className='mt-5 mx-auto w-[95%]'>
                    <label className='mt-2 text-xl font-semibold pt-4'>E-mail Address</label>
                    <input type='text' placeholder='Enter your email' onChange={(e)=>{setValues({...values, email:e.target.value})}} className='border-2 p-1 w-full rounded focus:outline-none'/>
                  </div>


                  <div className='flex my-6 mx-auto w-[95%]'>
                      <button onClick={handleSubmit} className='border block font-semibold bg-[#1B80E0] w-full text-white mx-auto px-8 h-10 rounded-xl'>Send OTP</button>
                  </div>
                
         </div>
          }

         </div>
       </div>
       <h1 className='py-5'>{}</h1>
     </div>
  
  )
}

export default ForgetPassword
