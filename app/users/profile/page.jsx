"use client";

import { useState } from 'react'
import axios  from 'axios'

export default function Home() {

    const [ user, setUser ] = useState(null)

    const getUser  = () => {
        axios({
        method: 'get',
        withCredentials: true,
        url: 'http://localhost:3001/getUser'
        }).then(res => {setUser(res.data.username)}).catch(err => {console.log(err)})
    }

    return (
    <div className="flex justify-center relative">
      <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
        <h1 className="text-center text-3xl">Profile </h1>
        <div className="rounded-2xl bg-white shadow-xl">
          <button onClick={getUser} className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11">Submit</button>
          {user ? <h1>{user}</h1> : null}
        </div>
      </div> 
    </div>
  );
}
