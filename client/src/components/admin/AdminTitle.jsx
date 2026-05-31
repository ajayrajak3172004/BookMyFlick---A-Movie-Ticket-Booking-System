import React from 'react'

export default function AdminTitle({text1, text2}) {
  return (
    // <div className='w-full bg-green-400 text-white'>
      <h1 className=' h-fit font-medium text-2xl m-10'>{text1}
        <span className='m-2 underline text-blue-500'>{text2}</span>
      </h1>
    // </div>
  )
}
