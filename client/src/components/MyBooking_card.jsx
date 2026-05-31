import React from 'react'
import { BookingTimeFormat } from '../lib/BookingTimeFormat'
import { ImCheckboxChecked } from "react-icons/im";
import { Link } from 'react-router-dom';

export default function MyBooking_card({booking}) {


    const currency = import.meta.env.VITE_CURRRENCY

    return (
        <>

            <div className="flex gap-[2%] flex-wrap   ml-20  sm:ml-28 w-[90%] sm:w-[60%]  md:mx-5">

            

                <div className={` w-[90%]  sm:w-[50rem] sm:mx-2 lg:mx-10 flex justify-center items-center md:h-[80%] p-3 bg-gray-900/70 border border-blue-400/20 my-2 rounded-2xl  transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                    <div className=' w-full md:w-[48rem]  text-white  md:flex   justify-between items-center '>


                        <div className=' md:flex md:w-[30rem] gap-2 text-white items-center'>


                            <img src={booking.show.movie.poster_path} className=' w-full md:max-w-[12rem] aspect-video object-cover h-auto my-2  rounded-xl'></img>

                            <div className='flex flex-col md:w-full mx-2 h-full   justify-center'>
                               <Link to={`/movies/${booking.show?.movie?._id}`}> <h1 onClick={scroll(0,0)} className=' text-xl  font-bold'>{booking.show.movie.title}</h1></Link>
                                <span className='text-sm font-semibold text-gray-400 mb-2'>{ (Math.floor(booking?.show?.movie?.runtime/60))}h { (booking.show.movie.runtime%60)}m</span>
                                <span className='text-sm font-semibold text-gray-400 mt-2'>{BookingTimeFormat(booking?.show?.showDateTime)}</span>

                            </div>
                        </div>





                        <div className='flex flex-col  py-4  mx-2 md:items-end md:w-[20rem] '>

                            <div className='flex  items-center mt-2 md:mt-0 '>
                                <h1 className='text-2xl font-bold'>{currency||'$'}{booking?.amount}</h1>
                               { 
                                 !booking?.isPaid ? <Link to={booking.paymentLink} className="mx-5 mb-2 sm:mb-0 bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                                      Pay Now
                                    </Link>

                                    :
                                    <ImCheckboxChecked className='text-green-400 mx-5 mb-2 sm:mb-0 0 shadow-md ' />
                                 }

                            </div>

                            <div className='flex flex-col   h-[4rem] justify-end mt-2 md:mt-0'>
                                <span className='text-sm font-semibold text-gray-400  flex  items-center gap-2'><p>Total Ticket:</p>
                                    <p className='text-white text-lg font-semibold'>{booking.bookedSeats.length}</p>
                                </span>
                                <span className='text-sm font-semibold text-gray-400  flex gap-2'>
                                    <p>Seats Numbers:</p>
                                    <p className='text-white font-semibold'>{booking.bookedSeats.join(',')}</p>
                                    
                                   
                                </span>
                                 <p className='text-gray-400 text-[10px] '>{BookingTimeFormat(booking.updatedAt)}</p>

                            </div>

                        </div>

                    </div>


                </div>



            </div>
        </>
    )
}
