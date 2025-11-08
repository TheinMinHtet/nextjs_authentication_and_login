"use client";

import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";

const UserInfo = () => {
const {data: session} = useSession();

  return (
    <div className='grid place-items-center h-screen'>
          <div className='w-100 p-6 border border-black-400 rounded-lg shadow-xl border-t-3'>
            <h2 className='text-2xl font-bold mb-4'>User Information</h2>
            <p className='mb-2'><strong>Name:</strong>{session?.user?.name}</p>
            <p className='mb-2'><strong>Email:</strong>{session?.user?.email}</p>
            <button onClick={() => signOut()} className='mt-4 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition duration-400 cursor-pointer'>
                Log Out
            </button>
          </div>
        </div>
  )
}

export default UserInfo;
