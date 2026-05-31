import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import AdminTitle from '../../components/admin/AdminTitle'
import Loading from '../../components/Loading'
import { BookingTimeFormat } from '../../lib/BookingTimeFormat'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

export default function ListBookings() {


  const [Bookings,setBookings] = useState([])
  const [isLoading,setisloading] = useState(true)

  const { user, axios, getToken } = useAppContext()

  const getBookingData = async()=>{

    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/all-bookings`,{ headers: { Authorization: `Bearer ${await getToken()}`,'userId':user.id } })

     if(data.success){
       setBookings(data.bookings)
       setisloading(false);
     }else{
      // alert(data.message)
       toast.error(data.message)
     }
     
    } catch (error) {
      console.error(error)
    }

  }

  

  useEffect(()=>{
    if(user){
    getBookingData()
    }
  },[user])

  return  !isLoading ? (
      <>
  
       
         <div className="w-full  grow  h-[36rem] ">
          <AdminTitle text1={'List'} text2={'Bookings'} />
        
  
          <div className='max-w-4xl mt-6 overflow-x-auto text-nowrap ml-10'>
            <table className='w-full border-collapse rounded-md overflow-hidden'>
             <thead>
               <tr className='bg-blue-500/20 text-left text-white'>
                   <th className='p-2 font-medium pl-5'>User Name</th>
                    <th className='p-2 font-medium '>Movie Name</th>
                     <th className='p-2 font-medium '>Show Time</th>
                      <th className='p-2 font-medium '>Seats</th>
                       <th className='p-2 font-medium '>Amount</th>
  
               </tr>
  
             </thead>
  
             <tbody className='text-sm font-light text-white'>
                {
                  Bookings.map((booking,i)=>(
  
                       <tr key={i} className='border-b border-blue-500/10 bg-blue-500/5 even:bg-blue-500/10'>
  
                        <td className='p-2 min-w-45 pl-5'>{booking?.user?.fullName}</td>
                        <td className='p-2 min-w-45 pl-5'>{booking.show.movie.title}</td>
                         <td className='p-2 '>{BookingTimeFormat(booking.show.showDateTime)}</td>
                          <td className='p-2 '>{booking.bookedSeats.join(', ')}</td>
                           <td className='p-2 '>${booking.amount}</td>
  
                       </tr>
                  ))
                }
  
             </tbody>
  
            </table>
  
  
          </div>
         </div>
      </>
    )
  
    :
    (
          <div className='grow h-2/2  md:w-[80%]   flex justify-center items-center '>
         
                 <Loading />
          </div>
    
    
        )
}
