"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { logoutUser, logSession } from '../../lib/actions/session';
import useAuth from '@/app/hooks/useAuth';
import { BsSearch, BsArrowRightCircle } from "react-icons/bs";

const Page = () => {

  const session = useAuth();

  if (session === null) {
    return <div>Loading...</div>;
  }

  return (
    // TOP PADDING BECAUSE OF NAVBAR
    <div className='bg-slate-400 h-screen w-[screen] pt-[40px] pl-[20px] pr-[20px] pb-[40px] flex flex-col md:flex-row'>
      {/* POSTS CONTAINER */}
      <div className='container w-[75%] flex flex-col'>
        {/* SEARCH */}
        <div className='w-full p-3 flex flex-col gap-1 rounded-xl'>
          <div className='flex flex-row items-center justify-center rounded-lg p-2 gap-2'>
            <BsSearch className='text-xl'/>
            <input className='input w-[350px]'/>
            <button><BsArrowRightCircle className='text-xl'/></button>
          </div>
          <p className='rounded-lg p-2 text-center shadow-xl'>Artículos Recientemente Publicados</p>
        </div>

        {/* POSTS */}
        <div className='h-full p-3'>

        </div>
      </div>
      
      {/* POST NEW ITEM CONTAINER */}
      <div className='container w-[25%]'>

      </div>
    </div>
  )
}

export default Page