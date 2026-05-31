import React from 'react'
import HeroSection from '../components/HeroSection'
import FeatureSection from '../components/FeatureSection'
import TrailerSection from '../components/TrailerSection'
import Loading from '../components/Loading'
import { useAppContext } from '../context/AppContext'

export default function Home() {

  const { shows } = useAppContext()

  return shows.length > 0 ? (
    <>
    <HeroSection/>
    <FeatureSection/>
    <TrailerSection/>
    </>
  ) :
  (
    <div className='grow h-2/2  w-full  flex justify-center items-center '>
            
                    <Loading />
              </div>
  )
}
