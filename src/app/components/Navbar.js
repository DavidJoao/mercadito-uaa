"use client"
import React from 'react'
import { logoutUser } from '../lib/actions/session'
import { IoIosLogOut } from 'react-icons/io'

const Navbar = () => {
  return (
    <div className='border-[1px] border-black w-screen h-[40px] fixed pl-[20px] pr-[20px] flex flex-row-reverse items-center'>
      <button><IoIosLogOut className='text-xl float' onClick={() => logoutUser()}>Logout</IoIosLogOut></button>
    </div>
  )
}

export default Navbar