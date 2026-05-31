import React, { useEffect, useState } from 'react'
import { dummyDashboardData, dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import AdminTitle from '../../components/admin/AdminTitle';
import { GoGraph } from "react-icons/go";
import { LuCircleDollarSign } from "react-icons/lu";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import BlurCircle from '../../components/BlurCircle';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { MdOutlineStar } from "react-icons/md";

import MovieCard from '../../components/MovieCard';
import { BookingTimeFormat } from '../../lib/BookingTimeFormat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function Dashboard() {

  const [DashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
  });


   const { user, axios, getToken } = useAppContext()

  const [isLoading, setIsLoading] = useState(true);

  const dashboardContent = [

    { title: 'Total Bookings', value: DashboardData.totalBookings || 0, icon: <GoGraph /> },
    { title: 'Total Revenue', value: `$${DashboardData.totalRevenue || '0'}`, icon: <LuCircleDollarSign />, },
    { title: 'Active Shows', value: DashboardData.activeShows.length || 0, icon: <AiOutlinePlayCircle /> },
    { title: 'Total Users', value: DashboardData.totalUsers || 0, icon: <LuUsers /> },

  ];


  const fetchdashboardData = async () => {
    try {
     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`,{ headers: { Authorization: `Bearer ${await getToken()}`,'userId':user.id } })

     if(data.success){
       setDashboardData(data.dashboardData)
       setIsLoading(false);
     }else{
      // alert(data.message)
      toast.error(data.message)
     }
      
      // console.log(DashboardData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }
  

  useEffect(() => {
    if(user){
    fetchdashboardData()
    }
  }, [user])

  return !isLoading ? (
    <>


      <div className="w-full  grow  h-[36rem]  overflow-auto custom-scrollbar-2 ">

        {/* <BlurCircle top='2rem' left='250px' />
        <BlurCircle top='23rem' left='250px' /> */}

        <AdminTitle text1={'Admin'} text2={'Dashboard'} />


        <div className='w-[80%]   flex flex-wrap gap-4 ml-8'>

          {

            dashboardContent.map((content,i) => (
              <div key={i+1} className='w-[12rem] h-[5rem] bg-blue-500/30 flex justify-around rounded-lg border border-blue-500 '>

                <div className=' flex flex-col justify-center font-semibold'>
                  <h1 className='text-[0.8rem]'>{content?.title}</h1>
                  <h1>{content?.value}</h1>
                </div>

                <div className=' text-2xl font-bold flex flex-col  justify-center'>
                  {content?.icon}
                </div>

              </div>
            ))

          }

        </div>

        {/* Active shows */}


        <div className="flex gap-[2%] flex-wrap content-start h-full w-full ">

          <div className='w-full  flex justify-between'>

            {/* <BlurCircle top='40rem' left='150px' /> */}

            <h1 className=' md:ml-20  font-bold p-5 text-white mt-20'>Active Shows</h1>
            <BlurCircle top='28rem' right='-100px' />
          
          </div>


          <div className="flex gap-[2%] flex-wrap w-[90%]    mx-5">

            {
                 DashboardData?.activeShows.length > 0 ?

                DashboardData?.activeShows.slice().map((shows,i) => (
                <div key={i} className={` w-[13rem]    flex justify-center  h-auto  bg-blue-500/20 border border-blue-500 my-2 rounded-2xl  transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg`}>
                  <div className='w-[100%]  text-white flex flex-col gap-2'>
                    <img src={shows.movie.poster_path} className='w-full h-[15rem]  object-cover cursor-pointer rounded-t-2xl'></img>
                    <h1 className=' text-sm font-bold px-3  text-bold'>{shows?.movie.title.length > 25 ? shows?.movie.title.slice(0,25)+". . ." : shows?.movie.title}</h1>
                   
                    <div className='flex justify-between items-center  px-3'>
                      <h1 className=' text-lg font-bold  text-bold'>${shows.showPrice}</h1>
                      <span className='flex justify-center text-sm font-bold items-center'>
                        <MdOutlineStar size={20} className='text-blue-700' />
                        <h2>{shows.movie.averageRating}</h2>
                      </span>

                    </div>

                     <span className='text-[0.7rem] font-bold text-gray-400 px-3 py-2 '>{BookingTimeFormat(shows?.showDateTime) || ''}</span>

                  </div>


                </div>
              ))
              :
              (<h1 className='text-red-500'>No Shows are activated for current dates !</h1>)
            }



          </div>


        </div>





      </div>
    </>

  ) :
    (
       <div className='grow h-full w-[90%] md:mr-30  flex justify-center items-center '>
  
          <Loading />
        </div>
  


    )
}
