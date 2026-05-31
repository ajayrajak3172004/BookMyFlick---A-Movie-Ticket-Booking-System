import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData, assets } from '../assets/assets'
import { LuClock3 } from 'react-icons/lu'
import inToTimeFormat from '../lib/inToTimeFormat'

import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


export default function SeatLayout() {

  const groupRows = [['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J'],]

  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const { axios, user, getToken, shows } = useAppContext()

  const navigate = useNavigate()

  const getdetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/show/${id}`)
      if (data.success) {
        setShow(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/booking/seats/${selectedTime.showId}`)
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats)
      } else {
        // alert(data.message)
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const bookTickets = async () => {
   
    try {

      if (!user) {
        // return alert('Please login to proceed.')
        return toast.error('Please login to proceed.')
      }


      if (selectedSeats.length === 0 || !selectedTime) {
        // return alert('Please select a time & seats')
         return toast.error('Please select a time & seats !')
      }

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/booking/create`, { showId: selectedTime.showId, selectedSeats }, { headers: { Authorization: `Bearer ${await getToken()}`, 'userId': user.id } })
        // console.log('data',data)
      if (data.success) {

        
        window.location.href = data.url

      } else {
        alert(data.message)
      }

    } catch (error) {
      alert(error.message)
    }
  }


  useEffect(() => {
    getdetails()
  }, [])


  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats()
    }
  }, [selectedTime])



  const handleClickSeat = (seatId) => {
    if (!selectedTime) {
      // return alert("Please Selct Time First!")
      return toast.error("Please Select Time First !")
    }
    if (occupiedSeats.includes(seatId)) {
      // return alert("This seat is already booked.")
      return toast.error("This seat is already booked.")
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      // return alert('You Can Only Select 5 Seats')
      return toast.error('You Can Only Select 5 Seats')
    }

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 9) => (


    <div key={row} className=' w-full gap-2 flex flex-wrap  justify-center'>

      {
        Array.from({ length: count }, (_, i) => {

          const seatId = `${row}${i + 1}`
          return (

            <button key={seatId} onClick={() => handleClickSeat(seatId)} className={`${selectedSeats.includes(seatId) && 'bg-blue-500'} ${occupiedSeats.includes(seatId) && 'opacity-50'} hover:shadow hover:shadow-blue-200 py-1 px-1 text-sm rounded border border-blue-500 cursor-pointer`}>{seatId}</button>
          )
        })

      }

    </div>
  )




  return show ? (
    <>


      <div className='w-full  text-white lg:flex justify-between mt-10'>

        <BlurCircle top='4' left='250px' />
        <BlurCircle top='500px' left='1100px' />
        <BlurCircle top='400px' left='800px'  />
        <div className=' md:w-[20rem] lg:w-[30rem] h-[70%]  mt-20 mx-4 flex justify-center items-center'>

          <div className=' w-[20rem] mx-2 sm:mx-0 sm:w-[25rem] md:w-[20rem] h-60  text-sm bg-blue-600/10 border border-blue-600 rounded-md '>

            <p className='mt-6  sm:text-lg  mx-18 font-bold'>Available Timings</p>

            <div className='w-full h-[76%]  sm:h-44 mt-2 b overflow-auto hide-scrollbar'>


              {

                show?.dateTime[date]?.map((item) => (
                  <div key={item.time} onClick={() => setSelectedTime(item)} className={` ${selectedTime === item ? 'bg-blue-500' : 'hover:bg-blue-600/30 '}  w-[40%] my-4 px-3 py-1 font-semibold rounded-r-sm  cursor-pointer flex justify-center items-center gap-2`}>
                    <LuClock3 size={16} />
                    {inToTimeFormat(item.time)}
                  </div>
                ))
              }

            </div>

          </div>

        </div>

        {/* sear Layout */}
        <div className=' w-full lg:w-[80%] xl:w-[62%]   mt-10  flex flex-col  items-center  '>
          <h1 className='text-2xl font-bold mb-4'>Select Your Seats</h1>
          <img src={assets.screenImage} alt='screen'></img>
          <p className=' text-gray-400 text-sm mb-10 '>SCREEN SIDE</p>

          {/* Row 1 */}
          <div className='flex flex-col gap-3 m-2   xl:w-full items-center'>
            {
              groupRows[0].map((row) => renderSeats(row))
            }
          </div>

          {/* Row 2 & 3 */}
          <div className='flex justify-evenly gap-5 items-center'>

            {/* Row2 */}
            <div className='flex flex-col gap-3 m-2    '>
              {
                groupRows[1].map((row) => renderSeats(row))
              }

            </div>

            {/* Row3 */}
            <div className='flex flex-col gap-3 m-4    '>
              {
                groupRows[2].map((row) => renderSeats(row))
              }

            </div>

          </div>


          {/* Row 4 & 5 */}
          <div className='flex justify-evenly gap-5 items-center'>

            {/* Row4 */}
            <div className='flex flex-col gap-3 m-4  '>
              {
                groupRows[3].map((row) => renderSeats(row))
              }

            </div>

            {/* Row5 */}
            <div className='flex flex-col gap-3 m-4 '>
              {
                groupRows[4].map((row) => renderSeats(row))
              }

            </div>

          </div>


          <button onClick={bookTickets} className="bg-blue-600 mt-20 text-sm font-bold text-white sm:px-6  px-8  md:px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
            Proceed To Checkout
          </button>

        </div>

      </div>

    </>
  )
    :
    (
      <>
        <Loading />
      </>
    )
}
