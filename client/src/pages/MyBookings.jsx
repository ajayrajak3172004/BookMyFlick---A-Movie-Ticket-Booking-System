import React, { useEffect, useState } from 'react'
import { dummyBookingData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import MovieCard from '../components/MovieCard'
import MyBooking_card from '../components/MyBooking_card'
import { useAppContext } from '../context/AppContext'

export default function MyBookings() {

  const currency = import.meta.env.VITE_CURRRENCY
  const [bookings, setBooking] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {axios,user,getToken,shows} = useAppContext()
  
  const getBookingData = async () => {

    try {
       
      const  {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/bookings`, { headers: { Authorization: `Bearer ${await getToken()}`,'userId':user?.id } })
      setBooking(data.bookings)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      
    }
   
  }

  

  useEffect(() => {
    if(user){
    getBookingData()
    }
  }, [shows])

  return !isLoading  ?
    (
      <>


        <div className="flex gap-[2%]  flex-wrap  xl:ml-20 content-start h-full w-full xl:w-[90%]">

          <div className='w-full  flex justify-between'>

            <BlurCircle top='10rem' left='20px' />

            <h1 className=' md:ml-10  font-bold p-5 text-white mt-10'>Your Bookings</h1>
            <BlurCircle top='20rem' right='600px' />
            {/* <h1 onClick={() => navigate('/movies')} className='transition-transform duration-300 hover:translate-x-2  md:mr-10 cursor-pointer text-sm  hover:text-md font-semibold p-5 text-white mt-30 flex justify-between items-center'>View all <span><MdOutlineNavigateNext size={20} /></span></h1> */}
          </div>


          {
           bookings.length >0 ? bookings.slice().map((booking) => (
              // <MovieCard key={shows._id} movie={shows} />
              <MyBooking_card key={booking._id} booking={booking} />

            )) :
            (
        <>
        <div className='w-full h-[20rem] flex justify-center items-center '>
            <h1 className='text-xl sm:text-2xl font-bold text-white'>No Bookings Available !</h1>
        </div>
        </>
    )
          }


          




        </div>




      </>
    )


    : (
      <Loading />
    )
}
