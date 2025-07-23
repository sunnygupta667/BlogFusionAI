import React from 'react'
import { useAppContext } from '../context/AppContext'
import arrow from '../assets/arrow.svg'
import logo from '../assets/logo.png'
const Navbar = () => {

  const { navigate, token } = useAppContext();


  return (
    <div className = 'flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className='h-9' />
      <h1 className='text-xl   font-semibold'>BlogFusionAI</h1>
      </div>
  
   <button onClick={()=> navigate('/admin')} className=' text-sm  text-white bg-gray-900 hover:bg-purple-900 duration-300 transition ease-in-out py-2 px-5  rounded-sm flex gap-2 cursor-pointer '>
    {token ? 'Dashboard' : 'Login'}
   <img src={arrow} className='w-3' alt="arrow" />
   </button>
  

    </div>
  )
}

export default Navbar