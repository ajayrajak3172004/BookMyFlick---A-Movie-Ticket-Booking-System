import React, { useEffect, useState } from 'react'
import BlurCircle from './BlurCircle'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player';
import { useAppContext } from '../context/AppContext';


export default function TrailerSection() {

    const { shows } = useAppContext()

    const [CurrentTrailer, setCurrentTrailer] = useState(null)
    const [trailersNUm, setTrailerSNUm] = useState(8)

useEffect(() => {
  if (shows.length > 0) {
    setCurrentTrailer(shows[Math.floor(Math.random()*shows.length)]?.trailer);
  }
}, [shows]);
    // console.log("url", CurrentTrailer)
   

    function getYouTubeVideoId(url) {
        if (typeof url !== 'string') return null;

        const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
        const match = url?.match(regExp);
        return match && match[1] ? match[1] : null;
    }

    return (
        <>

            <div id='trailer-section' className="flex flex-col  gap-[20px] flex-wrap w-full  h-full justify-center items-center  mt-20">

                <BlurCircle top='145rem' left='130px' />
                <BlurCircle top='160rem' right='120px' />
                <h1 className='  font-bold p-5 text-white mt-30'>Trailers</h1>

                <div className=" w-full lg:w-[60%] p-5 rounded-4xl bg-gray-500/30 flex justify-center ">


                    <iframe
                        className='rounded-2xl'
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(CurrentTrailer)}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen

                    ></iframe>

                </div>

                <div id='trailers' className='flex flex-wrap w-full justify-evenly items-center'>

                    {
                        shows.slice(0, trailersNUm).map((show) => (
                            <img key={show.trailer} src={show.backdrop_path} onClick={() => setCurrentTrailer(show.trailer)} alt="trailerimg" className='cursor-pointer aspect-video object-cover transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg rounded-2xl py-2 w-[40%] sm:w-[22%]' />
                        ))
                    }



                </div>



            </div >
            <div className='w-full  flex justify-center my-2'>
              { trailersNUm <shows.length ? <button onClick={()=>setTrailerSNUm(prev=>prev+4)} className="m-8 bg-blue-600 font-bold  text-white px-4 py-1   lg:px-6 lg:py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer">
                    Show More
                </button>
                :
                <button onClick={()=>{setTrailerSNUm(8); document.getElementById('trailers').scrollIntoView({ behavior: 'smooth' }) }} className="m-8 text-white hover:shadow shadow-blue-500 p-2 cursor-pointer">
                    Show Less
                </button>
               }
            </div>


        </>
    )
}
