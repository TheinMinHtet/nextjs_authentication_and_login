"use client"

import Link from 'next/link';
import { useState } from 'react';
import {signIn} from "next-auth/react";
import { useRouter } from 'next/navigation';

const LoginForm = () => {

const [email , setEmail] = useState("");
const [password , setPassword] = useState("");
const [error , setError] = useState("");
const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if(!email || !password){
    setError("All fields are required");
    return;
  } 

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response.error) {
      setError("Invalid email or password");
      return;
    }

    router.replace('/dashboard');
  } catch (error) {
    console.error("Login failed:", error);
  }

}

  return (
    <div className='grid place-items-center h-screen'>
      <div className='w-100 p-6 border border-black-400 rounded-lg shadow-xl border-t-3'>
        <h2 className='text-xl font-bold mb-4 text-center'>Log In</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email'/>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password'/>
          <button className='bg-black border rounded-lg text-white font-bold cursor-pointer px-6 py-2'>Log In</button>
          {
            error && (
              <div className='text-white text-sm bg-red-600 rounded-lg w-fit px-2 py-1'>{error}</div>
            )
          }
          <div className='text-sm text-right'>
            Don&#39;t have an account?
            <Link href={"./register"}>
             <span className='underline underline-offset-3'> Sign Up </span>
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default LoginForm
