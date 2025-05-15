import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import {motion} from 'framer-motion'
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {

   const [state,setState]=useState('Log in');

   const {setShowLogin,backendUrl,setToken,setUser}=useContext(AppContext);
   const [name,setName]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");

   const onSubmitHandler=async(e)=>{
      e.preventDefault();
      try {
        if(state==='Log in'){
         const res= await axios.post(backendUrl+'/api/user/login',{email,password})

         if(res.data.success){
          setToken(res.data.token)
          setUser(res.data.user)
          localStorage.setItem('token',res.data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
        }else{
          const res= await axios.post(backendUrl+'/api/user/register',{name,email,password})

          if(res.data.success){
           setToken(res.data.token)
           setUser(res.data.user)
           localStorage.setItem('token',res.data.token)
           setShowLogin(false)
         }else{
           toast.error(data.message)
         }
        }
        
      } catch (error) {
        toast.error(error.message)
      }
   }

   useEffect(()=>{
    document.body.style.overflow='hidden';
    return()=>{
        document.body.style.overflow='unset'
    }
   },[])


  return (
    <div className= 'fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'
      initial={{opacity:0.2,y:50}}
      transition={{duration:0.3}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! please sign in to continue</p>
         
         {state!=='Log in' &&
           <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
           <img src={assets.user} alt="" width={10}/>
           <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name' required />
       </div>
         }
        

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.email_icon} alt="" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email id' required />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password' required />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password?</p>

        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Log in'?'Log in':'Create Account'}</button>
        

        {state==='Log in'?
         <p className='mt-5 text-center'>Don't have an account?
         <span onClick={()=>setState('Sign up')} className='text-blue-600 cursor-pointer'>Sign up</span>
         </p>  :
        
        <p className='mt-5 text-center'>Already have an account?
        <span onClick={()=>setState('Log in')} className='text-blue-600 cursor-pointer'>Log in</span>
        </p>
        }
        
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' alt="" />
      </motion.form>
    </div>
  )
}

export default Login
