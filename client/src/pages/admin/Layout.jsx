import React from 'react'
import AdminNavBar from '../../components/admin/AdminNavBar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import Dashboard from './Dashboard'
import ListShows from './ListShows'
import ListBookings from './ListBookings'
import AddShows from './AddShows'
import { Outlet } from 'react-router-dom'
import BlurCircle from '../../components/BlurCircle'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import Loading from '../../components/Loading'


export default function Layout() {
 
  const {isAdmin,fetchIsAdmin} = useAppContext()

  useEffect(()=>{
    fetchIsAdmin()
  },[])

  return isAdmin ? (
   <>
   <AdminNavBar/>
   
   <div className="flex gap-[2%]  fixed  content-start w-full  text-white ">
    <AdminSidebar/>
   
     <div className=' w-[80%]   text-white '>
     <BlurCircle top='2rem' left='250px' />
     <BlurCircle top='23rem' left='250px' />
     <Outlet/>
     </div>
     
   </div>
   </>
  )
  :
    (
           <div className='grow h-full w-[90%] md:mr-30  flex justify-center items-center '>
      
              <Loading />
            </div>
      
    
    
        )
  
}
