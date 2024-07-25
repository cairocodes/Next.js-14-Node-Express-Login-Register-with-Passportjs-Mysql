"use client";

import { useState } from 'react'
import axios  from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {

    const [loginUsername, setLoginUsername] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')  
    const[message, setMessage]= useState('');

    const router = useRouter();

    const login = () => {
        axios({
        method: 'post',
        data: {
            username: loginUsername,
            password: loginPassword
        },
        withCredentials: true,
        url: 'http://localhost:3001/login'
        })
        .then(res => {
          console.log(res)
          if (res.data == "success") {
              router.push('/users/profile')
          }else {
              setMessage(res.data); 
          }
        })
        .catch(err => {console.log(err)})
    }

    return (
    <div className="flex justify-center relative">
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
        <h1 className="text-center text-3xl">Login </h1>
        <div className="rounded-2xl bg-white shadow-xl">
          <div className="lg:p-11 p-7 mx-auto">
            <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-center text-base font-medium leading-6">Let’s get started with your 30 days free trail</p>
            </div>
            <input type="text" className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6" 
                placeholder="Username" 
                name="username"
                onChange={e => setLoginUsername(e.target.value )}
                />
            <input type="text" className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-1" 
                placeholder="Password" 
                name="password"
                onChange={e => setLoginPassword(e.target.value )}
                />
            <Link href="#" className="flex justify-end mb-6">
              <span className="text-indigo-600 text-right text-base font-normal leading-6">Forgot Password?</span>
            </Link>
            <button  onClick={login} className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">Login</button>
            <p className="text-red-700"><b>{ message }</b></p>
            <Link href="/users/register" className="flex justify-center text-gray-900 text-base font-medium leading-6"> Don’t have an account? <span className="text-indigo-600 font-semibold pl-3"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div> 
    </div>
  );
}
