import React, { useEffect, useState } from 'react'
import AdminTitle from '../../components/admin/AdminTitle'
import BlurCircle from '../../components/BlurCircle'
import { MdOutlineStar } from 'react-icons/md'
import { BookingTimeFormat } from '../../lib/BookingTimeFormat'
import { dummyDashboardData, dummyShowsData } from '../../assets/assets'
import { IoCheckbox } from "react-icons/io5";
import Loading from '../../components/Loading'
import { FaDeleteLeft } from "react-icons/fa6";
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import AddShowCart from '../../components/AddShowCart'


export default function AddShows() {


  const { user, axios, getToken } = useAppContext()

  const [NowPlayingMovies, setNowPlayingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [dateTimeSelection, setdateTimeSelection] = useState({})
  const [dateTimeInput, setDateTimeInput] = useState("")
  const [showPrice, setShowPrice] = useState('')
  const [isAddingshow, setIsAddingShow] = useState(false)


  const fetchNowPlayingMovies = async () => {
    // setNowPlayingMovies(dummyShowsData)
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/show/now-playing`, { headers: { Authorization: `Bearer ${await getToken()}`, 'userId': user.id } })

      if (data.success) {
        setNowPlayingMovies(data.movies)
      }
    } catch (error) {
      console.error('Error in fetching Movies:', error)
    }
  }

  // console.log(NowPlayingMovies)

  useEffect(() => {
    if (user) {
      fetchNowPlayingMovies()
    }
  }, [user])


  const handleDateTimeAdd = () => {

    if (!dateTimeInput) return

    const [date, time] = dateTimeInput.split('T')

    if (!date || !time) return

    setdateTimeSelection((prev) => {
      const times = prev[date] || []
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] }
      }

      return prev
    })

    // console.log(dateTimeSelection)
  }


  const handleRemoveTime = (date, time) => {

    setdateTimeSelection((prev) => {
      const times = prev[date];


      // Filter out the time to remove
      const filteredTimes = times?.filter((t) => t !== time);

      // If no times left, remove the date key itself
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [date]: filteredTimes }

    })
  }


  const handleAddshow = async () => {
    try {
      setIsAddingShow(true)

      if (!selectedMovie || !Object.keys(dateTimeSelection).length > 0 || !showPrice || showPrice === '') {
        // console.log(selectedMovie)
        // return alert('Missing required fields.')
        setIsAddingShow(false)
        return toast.error('Missing required fields.')
      }

      const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({ date, time }))
      const payload = {
        movieId: selectedMovie.id,
        showsInput,
        showPrice: Number(showPrice)
      }

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/show/add`, payload, { headers: { Authorization: `Bearer ${await getToken()}`, 'userId': user.id } })
      if (data.success) {
        // alert(data.message)
        toast.success(data.message)
        setSelectedMovie(null)
        setdateTimeSelection({})
        setShowPrice('')

      } else {
        // alert(date.message)
        toast.error(data.message)
        setIsAddingShow(false)
      }


    } catch (error) {
      console.error("Submission Error:", error)
      // alert("An Error Occured,Try again.")
      toast.error("An Error Occured,Try again.")
    }

    setIsAddingShow(false)

  }


  return NowPlayingMovies.length > 0 ? (

    <div className="w-full   grow  h-[36rem]  overflow-auto custom-scrollbar-2">

      {/* <BlurCircle top='2rem' left='250px' />
      <BlurCircle top='23rem' left='250px' /> */}

      <AdminTitle text1={'Add'} text2={'Shows'} />



      {/* Active shows */}


      <div className="flex flex-col gap-[2%] flex-wrap  content-start  pb-10 w-[98%] ">

        <div className='w-full  flex justify-between'>

          {/* <BlurCircle top='40rem' left='150px' /> */}

          <h1 className=' md:ml-5  font-bold p-5 text-white'>Now Playing Showing</h1>
          <BlurCircle top='28rem' right='-100px' />

        </div>


        <div className="flex  gap-[2%] flex-wrap w-[98%] mx-5">

          <div className='w-full h-auto  flex  justify-evenly items-center py-4    overflow-auto custom-scrollbar-2'>


            {
              NowPlayingMovies.map((movie, i) => (
                <div key={i} onClick={() => { setSelectedMovie(movie) }} className={` w-[10rem] pb-2  mx-2 cursor-pointer flex justify-center    bg-blue-500/20   rounded-2xl  transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg`}>
                  <div className=' relative  w-[12rem]     text-white flex flex-col  '>
                    <img src={movie.primaryImage} className='w-full  mb-1  object-cover cursor-pointer rounded-t-2xl'></img>


                    <div className='absolute w-full   flex flex-col justify-between h-[85%]'>


                      <div className=' flex justify-between items-end w-full py-3 rounded-t-2xl   px-3'>

                        {
                          <IoCheckbox size={20} className={`${movie?.id == selectedMovie?.id ? 'block' : 'hidden'}  text-blue-500`} />
                        }

                      </div>

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
              ))
            }


          </div>

          <div className={` lg:flex justify-between ${selectedMovie ? 'flex-row-reverse w-[85%]':''}`}>


            {selectedMovie && <AddShowCart movie={selectedMovie} />}



            <div className=''>



              <div className='w-[80%] sm:mx-4 sm:w-full  p-5 flex flex-col gap-2'>
                <h1 className='font-bold'>Show Price</h1>
                <span className='border sm:w-[20rem] px-1 py-1 flex justify-center items-center rounded-2xl'>
                  $ <input type='number' min={0} value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder='Enter show price' className='w-full outline-none rounded-2xl px-2 h-10'>
                  </input></span>

              </div>

              <div className=' w-[80%] sm:mx-4 sm:w-full  p-5 flex flex-col gap-2'>
                <h1 className='font-bold'>Select Date & Time</h1>
                <span className='border py-3 sm:w-[20rem]   sm:h-[4rem] px-1 sm:py-1 flex flex-col  sm:flex-row  sm:justify-center sm:items-center rounded-2xl'>
                  <input type='datetime-local' value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)} placeholder='Enter show price' className='   outline-none sm:w-full   rounded-2xl px-2 h-10'>
                  </input>

                  <button onClick={handleDateTimeAdd} className=" py-2 text-sm  bg-blue-600 text-white  w-[6rem] rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                    Add Time
                  </button>

                </span>

              </div>


              <div className='w-[80%] sm:w-full sm:mx-4  p-5 flex flex-col  gap-6'>
                <h1 className='font-bold text-sm'>Selected Date-Time</h1>

                {Object.entries(dateTimeSelection).map(([date, times], i) => (

                  <div key={date} className=' flex flex-col gap-2 '>
                    <h2 className='font-bold'>{date}</h2>

                    <div className=' flex flex-wrap '>

                      {
                        times.map((time) => (
                          <span key={time} className='border mr-4 h-[3rem] border-blue-400 font-bold w-[6rem] px-1 py-1 flex justify-evenly items-center rounded-xl'>
                            {time}
                            <FaDeleteLeft size={20} onClick={() => handleRemoveTime(date, time)} className='cursor-pointer text-red-500' />
                          </span>
                        ))
                      }

                    </div>
                  </div>
                ))

                }

              </div>


            </div>
          </div>

        </div>

        <button onClick={handleAddshow} disabled={isAddingshow} className=" flex justify-center mx-8 sm:my-5 sm:mx-15 w-[10rem] bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
          {!isAddingshow ? 'Add Shows' : <div className="loader-2"></div>}
        </button>


      </div>




    </div >

  )
    :
    (
      <div className='grow h-2/2  md:w-[80%]   flex justify-center items-center '>

        <Loading />
      </div>


    )

}
