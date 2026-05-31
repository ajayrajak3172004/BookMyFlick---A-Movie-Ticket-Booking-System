import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { IoSearch } from "react-icons/io5";
import { TiThList } from "react-icons/ti";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import Logo from './Logo.jsx';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
import { useAppContext } from '../context/AppContext.jsx';

export default function NavBar() {

  const [isShowList, setisShowList] = useState(false)
  const [isSearch, setisSearch] = useState(false)
  const [inputVal,setInputVal] = useState('')

  const { user } = useUser()
  const { openSignIn } = useClerk()

  // console.log('user',user)

  const navigate = useNavigate()


const { setShowsBySearch,shows,fetchShows} = useAppContext()

 useEffect(()=>{
  if(inputVal.trim()===''){
    fetchShows()
  }else{
    setShowsBySearch(inputVal)
  }
},[inputVal])


const searchMovieHandle = ()=>{
setShowsBySearch(inputVal)
}

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setisShowList(true); // sm: and above => always show

      } else {
        setisShowList(false)
        setisSearch(false)
      }


    };

    handleResize(); // initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 flex gap-[1%] flex-wrap content-start  sm:justify-evenly items-center ">

        <div className=" w-[50%]   sm:w-[70%]  h-[5%] bg-green sm:flex justify-evenly items-center text-white ">

          <Logo/>


          {isShowList && <div className={`
           absolute top-10 z-10 sm:m-5 sm:z-0 sm:static w-full h-[400px]   sm:h-[50%]
          sm:text-sm sm:w-[80%] md:w-[60%] lg:w-[40%] sm:rounded-4xl bg-black/80  sm:bg-white/10 backdrop-blur-4xl 
          border-green-300/20 flex flex-col sm:flex-row items-center justify-center font-serif text-white`}>



            {!isSearch && <Link to={'/'}  onClick={() => document.getElementById('homeTop').scrollIntoView({ behavior: 'smooth' })} className='p-4 hover:text-green-200 ' >Home</Link>}
            {!isSearch && <Link to={'/movies'} onClick={() => { navigate('/movies'); scroll(0, 0) }} className='p-4 hover:text-green-200' >Movies</Link>}
            {!isSearch && <Link to={'/Favorites'} onClick={() => { navigate('/Favorites'); scroll(0, 0) }} className='p-4 hover:text-green-200' >Favorites</Link>}
            {!isSearch && <Link to={'/'} onClick={() => document.getElementById('trailer-section').scrollIntoView({ behavior: 'smooth' })} className='p-4 hover:text-green-200' >Trailers</Link>}

            {isSearch && <input onChange={(e)=>setInputVal(e.target.value)} onClick={()=>{navigate(`/movies`); scroll(0, 0)}}  value={inputVal} className='w-[80%]  rounded-4xl  h-full p-4  focus:outline-none hidden sm:block' placeholder='search movie' ></input>}
           {isSearch && <IoSearch  size={25} className='hidden sm:block cursor-pointer text-white  '  onClick={ searchMovieHandle} />}

          </div>
          }
        </div>



        <div className="w-[45%] sm:w-[20%] h-[5%] flex justify-evenly items-center ">
         {!isSearch && <IoSearch  size={25} className='hidden sm:block cursor-pointer text-white '  onClick={() => { setisSearch(!isSearch); navigate(`/movies`); scroll(0, 0) }} />}
       {  isSearch && <RxCross2 size={25} className='hidden sm:block cursor-pointer text-white ' onClick={() => { setisSearch(!isSearch); setInputVal(''); fetchShows()}} />}
          {
            !user ? (<button onClick={openSignIn} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
              Login
            </button>) :

              (<UserButton>
                <UserButton.MenuItems >
                  <UserButton.Action label='My Bookings' labelIcon={<BsTicketPerforatedFill />} onClick={() => navigate('/my-bookings')} ></UserButton.Action>
                </UserButton.MenuItems>
              </UserButton>

              )
          }



          <TiThList size={25} className=' sm:hidden cursor-pointer text-white' onClick={() => { setisShowList(!isShowList); setisSearch(false) }} />
        </div>
      </div>
    </>
  )
}
