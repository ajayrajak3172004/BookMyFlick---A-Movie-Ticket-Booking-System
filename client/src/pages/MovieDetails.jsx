import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { MdOutlineStar } from "react-icons/md";
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { FaRegHeart } from "react-icons/fa";
import { TbDeviceVisionPro, TbPlayerPlay } from "react-icons/tb";
import DateSelect from '../components/DateSelect';
import toast from 'react-hot-toast';
import BlurCircle from '../components/BlurCircle';
import MovieCard from '../components/MovieCard';
import MovieCard_2 from '../components/MovieCard_2';
import Loading from '../components/Loading';
import { useAppContext } from '../context/AppContext';

export default function MovieDetails() {

  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [isLoading,setisloading] = useState(false)
  // const { isSignedIn, userId } = useAuth()


  //   const { openSignIn } = useClerk()

  const navigate = useNavigate()
  const {axios,shows,getToken,user,fetchfavoriteMovies,favoriteMovies} = useAppContext()

  const getdetails = async () => {
    try {

      const  {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/show/${id}`, { headers: { Authorization: `Bearer ${await getToken()}` } })

    if(data.success){
      setShow(data)
      // console.log(show)
    }
      
    } catch (error) {
      console.error(error)
    }


  }

  const handleFavorite = async(res,req)=>{
    try {
      if(!user){
        // alert('Please loging to proceed.')
         setisloading(false)
        return toast.error('Please loging to proceed.')
         
      }
      setisloading(true)
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/update-favorite`,{movieId:id},{ headers: { Authorization: `Bearer ${await getToken()}`,'userId':user.id } })
      if(data.success){
        await fetchfavoriteMovies()
        // alert(data.message)
        toast.success(data.message)
        setisloading(false)
        
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getdetails()
  }, [id])

  

  const handleBuy = () => {
    if (!user) {
      redirectToSignIn();
    } else {
      // Replace ":date" with actual date value
      navigate(`/movies/${show.movie._id}/${show.date}`);
    }
  };

 

  return show ? (
    <>

      <div className='text-white w-full   sm:flex  '>

        <BlurCircle top='8rem' left='280px' />
        <BlurCircle top='18rem' left='60px' />
        <div className='w-full sm:w-[60%]  lg:w-[40%] xl:w-[30%] h-auto mt-20 flex justify-start sm:justify-end px-5 items-center py-5'>
          <img src={show.movie.poster_path} width={250} className='rounded-2xl'  ></img>

        </div>

        <div className=' w-full md:w-[70%]  lg:w-[47%]  flex items-center mt-5'>
          <div className=' w-[100%] p-5'>
            <h2 className='font-semibold text-red-500 '>{show.movie.original_language.toUpperCase()}</h2>
            <h1 className=' text-sm md:text-md md:text-[30px] my-3 font-bold max-w-full'>{show.movie.title}</h1>
            <span className='flex gap-2'>
              <MdOutlineStar size={20} className='text-red-500' />
              <h2 className=''>{show.movie.averageRating}{' User Rating'}</h2>
            </span>
            <p className='flex flex-wrap text-sm text-gray-400 my-5'>{show.movie.overview}</p>
            <span className='font-semibold my-4'>{(Math.floor(show.movie.runtime / 60))}h : {(show.movie.runtime % 60)} m - {show.movie.genres.slice(0, 3).map(genres => genres).join(' | ')}  - {new Date(show.movie.release_date).getFullYear()}</span>

            <div className='  w-full lg:w-[80%] h-[5rem] flex justify-around items-center'>
              <Link to={show.movie.trailer} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-sm font-bold text-white px-8 sm:px-6  md:px-8 py-4 rounded-lg  transition-all duration-300 shadow-md cursor-pointer">
                <TbPlayerPlay size={20} />
                Watch Trailer
              </Link>
              <button onClick={() => document.getElementById('buytickets').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 text-sm font-bold text-white sm:px-6  px-8  md:px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                Buy Tickets
              </button>
              <div onClick={handleFavorite} className={`${favoriteMovies.find(movie =>movie._id==id)?'bg-red-500':'bg-gray-700 hover:bg-gray-800'}  transition-all duration-300 shadow-md cursor-pointer rounded-full flex justify-center items-center w-12 h-12`} >
               { !isLoading ? <FaRegHeart size={20} /> :
               <div className="loader-2"></div> }
              </div>

            </div>
          </div>
        </div>
      </div>



      <h1 className=' md:ml-30 text-lg md:text-2xl font-bold p-5 text-white mt-30'>Your Movie Cast [dummy]</h1>

      <div className='text-white w-full   flex justify-center items-center  '>



        <div className=' w-full  md:w-[80%] flex   items-center overflow-auto xl:overflow-visible hide-scrollbar'>


          {
            show.movie.casts.slice(0, 8).map((cast) => {
              return (
                <div key={cast.primaryImage} className='m-5 flex flex-col '>
                  <div className="w-[100px] h-[100px] rounded-full ">
                    <img
                      src={cast.primaryImage}
                      className="w-full h-full rounded-full object-cover"
                      alt="profile"

                    />
                  </div>
                  <h1 className='font-bold text-sm mt-5'>{cast.fullName}</h1>
                </div>
              )
            })


          }

        </div>


      </div>


      <DateSelect dateTime={show.dateTime} id={id} />


      <div className="flex gap-[2%]   flex-wrap justify-center content-start h-full w-full">

        <div className='w-full  flex justify-between'>

          <BlurCircle top='110rem' left='500px' />

          <h1 className=' md:ml-20  font-bold p-5 text-white mt-30'>You May Also Like</h1>
          <BlurCircle top='100rem' right='0px' />
          {/* <h1 onClick={() => navigate('/movies')} className='transition-transform duration-300 hover:translate-x-2  md:mr-10 cursor-pointer text-sm  hover:text-md font-semibold p-5 text-white mt-30 flex justify-between items-center'>View all <span><MdOutlineNavigateNext size={20} /></span></h1> */}
        </div>


        <div className="w-full    flex  gap-[2%] flex-wrap mx-5">

          {
            shows.filter((shows)=>  shows._id !== show.movie._id && shows.genres.some((genre)=>show.movie.genres.includes(genre))).slice(0, 4).map((shows) => (

              <MovieCard_2 key={shows._id} movie={shows} />



            ))
          }

        </div>

        <button onClick={() => { navigate(`/movies`); scroll(0, 0) }} className="m-8 bg-blue-600 font-bold  text-white px-4 py-1   lg:px-6 lg:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
          Show More
        </button>
      </div>

    </>
  )

    :

    (
      <Loading/>
    )



}
