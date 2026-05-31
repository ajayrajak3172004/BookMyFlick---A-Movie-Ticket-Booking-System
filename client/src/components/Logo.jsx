import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <>
    
    <div className='text-white flex justify-center items-center'>
            <Link to={'/'}  onClick={() => document.getElementById('homeTop').scrollIntoView({ behavior: 'smooth' })} >

              {/* <img src={'/B.png'} alt='logo' onClick={() => { navigate('/'); scroll(0, 0) }} className=' text-white relative w-20 my-5 h-auto' /> */}
              <span className='text-4xl sm:text-5xl font-serif text-red-500 font-bold'>B</span>
              <span className='sm:text-xl font-bold'>ook</span>
              <span className='sm:text-2xl font-bold text-green-300'>M</span>
              <span className='sm:text-xl font-bold'>y</span>
              <span className='sm:text-2xl font-bold text-blue-400'>F</span>
              <span className='sm:text-xl font-bold'>lick</span>


            </Link>
          </div>
    
    </>
  )
}
