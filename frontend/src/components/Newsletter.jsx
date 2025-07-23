import React from 'react'

const Newsletter  = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-24 '>
      <h1 className='md:text-4xl text-2xl font-semibold '> Never Miss a Blog</h1>
      <p className='md:text-lg text-gray-600/90 pb-4 mx-2'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
      <form className='flex justify-between max-w-lg max-sm:scale-90 mx-auto border mt-2 border-gray-300 bg-white rounded overflow-hidden w-full'>
       <input type="email" placeholder='Enter your email' required className='w-full pl-3 outline-none' />
        <button type="submit" className='bg-purple-700 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter 