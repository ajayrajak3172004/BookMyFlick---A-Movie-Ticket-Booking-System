import React, { useState } from 'react'
import { MdNavigateNext } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";

import BlurCircle from './BlurCircle';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function DateSelect({dateTime,id}) {

const [selectedDate,setSelectedDate] = useState(null)
const navigate = useNavigate()
const [backwardCount, setBackwardCount] = useState(0);
const [forwardCount, setForwardCount] = useState(4);



const onBookhandler=()=>{
    if(selectedDate===null){
       toast.error("Pleae Select Date !")
        // alert("Pleae Select Date")
    }else{
navigate(`/movies/${id}/${selectedDate}`);
scroll(0,0)
    }
    
}
// console.log(dateTime)

const forward_backward_handle = (click) => {
  const totalDates = Object.keys(dateTime).length;

  if (click === 'next') {
    if (forwardCount >= totalDates) return;

    setBackwardCount(prev => prev + 1);
    setForwardCount(prev => prev + 1);
   
  }

  if (click === 'prev') {
    if (backwardCount === 0) return;

    setBackwardCount(prev => prev - 1);
    setForwardCount(prev => prev - 1);
   
  }
};


  return (
    <>
    
    <div id='buytickets' className='w-full h-[30rem]  flex justify-center items-center'>

       <BlurCircle top='68rem' left='0px' />
       
        <div  className="container h-[15rem] w-[80%] text-white md:h-[12rem] rounded-2xl border bg-blue-600/10 border-blue-600 mx-5   items-center">

          <h1 className=' md:ml-10 text-lg md:text-xl font-bold p-5 text-white mt-4'>Choose Date</h1>

          <div className="container md:h-[5rem]  flex flex-col md:flex md:flex-row justify-around  items-center">

            <div className="container h-[5rem]  w-full md:w-[50%] flex items-center">

              
              { backwardCount >0 &&   <IoChevronBackOutline className='cursor-pointer' onClick={()=>forward_backward_handle('prev')} size={30} /> }

              <div className='container flex overflow-auto justify-evenly items-center   w-[90%]'>

                {

                Object.keys(dateTime).length >0 ? Object.keys(dateTime).sort((a, b) => new Date(a) - new Date(b))?.slice(backwardCount,forwardCount).map((date) =>
                    (
                    <div key={date} onClick={()=>setSelectedDate(date)} className={` ${selectedDate===date ? 'bg-blue-500':''} item w-14 h-14 rounded text-sm cursor-pointer border border-blue-600  flex flex-col justify-center items-center`}>
                      <span className='font-bold'>{new Date(date).getDate()}</span>
                      <span className='font-bold'>{new Date(date).toLocaleDateString("en-us",{month:'short'})}</span>
                    </div>
                    )
                  )
                  :(
                    <h1 className='text-red-500 text-xl'>No Date !</h1>

                  )


                }






              </div>

            { forwardCount < Object.keys(dateTime).length && <MdNavigateNext className='cursor-pointer' onClick={()=>forward_backward_handle('next')} size={40}/> }

            </div>


            <button onClick={onBookhandler} className="bg-blue-600 md:text-sm font-bold text-white px-6  py-2  m-2 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
              Book Now
            </button>

            
          </div>

        </div>

      </div>

    
    </>
  )
}
