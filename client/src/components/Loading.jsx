import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Loading() {

    const {nextUrl} = useParams()
    const navigate  = useNavigate()

    useEffect(()=>{
        if(nextUrl){
         setTimeout(()=>{
            navigate('/'+nextUrl)
         },5000)
        }
    },[])

    return (
        <div className=' h-[24rem] w-full   flex justify-center items-center'>

            <div className="loader"></div>
        </div>
    )
}
