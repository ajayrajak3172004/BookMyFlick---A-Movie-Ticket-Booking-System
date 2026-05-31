import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { NavLink, useParams } from 'react-router-dom'
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import Logo from '../Logo';
import { useAppContext } from '../../context/AppContext';
import { useUser } from '@clerk/clerk-react';



export default function AdminSidebar() {

  
 const {user} = useUser()
  const [isActive, setIsActive] = useState('/admin')

  const User = {
    firstName: user.firstName ||'Admin',
    lastname: user.lastName ||'User',
    imageUrl: user.imageUrl || assets.profile,
  }
 
  const url = useParams()
  useEffect(()=>{
    if(url['*']==''){
     setIsActive('/admin')
    }else{
      setIsActive('/admin/'+url['*'])
    }
    // console.log(url)
  },[url])

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: < LuLayoutDashboard /> },
    { name: 'Add Shows', path: '/admin/add-shows', icon: <MdOutlineAddBox /> },
    { name: 'List Shows', path: '/admin/list-shows', icon: <RiPlayList2Fill /> },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: <LuListTodo /> },
  ]


  return (
    <>

      <div className="  w-1/6 md:w-[15rem] h-3/4">
       {/* <Logo  /> */}
        <div className='w-full h-full flex flex-col items-center justify-center mt-10  py-5 gap-4 md:py-0 '>
          <img src={User.imageUrl} alt='adminimg' className='h-10 md:h-12 w-10 md:w-12 rounded-full mx-auto'></img>
          <p className=' text-sm max-md:hidden'>{User.firstName} {User.lastname}</p>
        </div>

        <div className='w-full flex flex-col items-center justify-center my-10  gap-5  '>

          {adminNavLinks?.map((adminLinks, i) => (

            <NavLink key={i}   to={adminLinks.path}  className={` ${(isActive === adminLinks.path ) ? 'bg-blue-500/20 text-blue-600' : ''}  w-full rounded-r-2xl flex justify-center items-center   py-2 `}>
              <div className='md:ml-5 w-[9rem] flex gap-2 justify-center  md:justify-start items-center  '>
                <span className='text-2xl md:text-xl'>{adminLinks.icon}</span>
                <h1 className=' hidden md:block'>{adminLinks.name}</h1>
              </div>

            </NavLink>
          ))

          }

        </div>


      </div>


    </>
  )
}
