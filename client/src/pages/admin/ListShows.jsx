import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import AdminTitle from '../../components/admin/AdminTitle'
import { BookingTimeFormat } from '../../lib/BookingTimeFormat'
import { useAppContext } from '../../context/AppContext'

export default function ListShows() {


  const  [Shows ,setShows] = useState([])
  const [isLoading,setisloading] = useState(true)

  const { user, axios, getToken } = useAppContext()

const getAllShows = async()=>{
  try {

    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/all-shows`,{ headers: { Authorization: `Bearer ${await getToken()}`,'userId':user.id } })

     if(data.success){
       setShows(data.shows)
       setisloading(false);
     }else{
      // alert(data.message)
      toast.error(data.message)
     }
   
  } catch (error) {
    console.log(error)
  }
}

// console.log(Shows)

useEffect(()=>{
  if(user){
  getAllShows()
  }
},[user])

  return  !isLoading ? (
    <>

     
       <div className="w-full  grow  h-[36rem]   ">
        <AdminTitle text1={'List'} text2={'Shows'} />
      

        <div className='max-w-4xl mt-6 h-[28rem]  overflow-x-auto overflow-auto  text-nowrap ml-10 custom-scrollbar-2'>
          <table className='w-full border-collapse rounded-md '>
           <thead>
             <tr className='bg-blue-500/20 text-left text-white'>
                  <th className='p-2 font-medium pl-5'>Movie Name</th>
                   <th className='p-2 font-medium '>Show Time</th>
                    <th className='p-2 font-medium '>Total Bookings</th>
                     <th className='p-2 font-medium '>Earnings</th>

             </tr>

           </thead>

           <tbody className='text-sm font-light text-white'>
              {
                Shows.map((show,i)=>(

                     <tr key={i} className='border-b border-blue-500/10 bg-blue-500/5 even:bg-blue-500/10'>

                      <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                       <td className='p-2 '>{BookingTimeFormat(show.showDateTime)}</td>
                        <td className='p-2 '>{Object.keys(show.occupiedSeats).length}</td>
                         <td className='p-2 '>${Object.keys(show.occupiedSeats).length*show.showPrice}</td>

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
