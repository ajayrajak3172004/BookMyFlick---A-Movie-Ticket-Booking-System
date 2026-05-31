import React from 'react'
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineStar } from 'react-icons/md'

export default function AddShowCart({ movie }) {
  return (
    <>
      <div className={`w-[9rem] h-[18rem] my-5  lg:w-[10rem] lg:h-[20rem]  mx-2 cursor-pointer flex justify-center    bg-blue-500/10   rounded-2xl  transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg`}>
        <div className=' relative  w-[12rem]    text-white flex flex-col  '>
          <img src={movie.primaryImage} className='w-full  mb-1  object-cover cursor-pointer rounded-t-2xl'></img>


          <div className='absolute w-full   flex flex-col justify-end h-[72%]'>


            

            <div className=' flex justify-between items-end w-full py-3  bg-black/40  px-3'>
              <span className='flex justify-center text-sm font-bold items-center'>
                <MdOutlineStar size={20} className='text-blue-700' />
                <h2>{movie.averageRating.toFixed(1)}</h2>
              </span>

              <h1 className=' text-sm'> {movie.numVotes >= 1000 ? (movie.numVotes / 1000).toFixed(1) + 'K' : movie.numVotes} voters</h1>


            </div>

          </div>

          <h1 className=' text-[0.9rem] font-bold px-3  text-bold'>{movie.originalTitle.length > 14 ? movie.originalTitle.slice(0, 14) + ". . ." : movie.originalTitle}</h1>

          <span className='text-[0.8rem] font-bold text-gray-400 px-3  '>{movie.releaseDate}</span>



        </div>



      </div>

    </>
  )
}
