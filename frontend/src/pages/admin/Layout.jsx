import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar.jsx';
import logo from '../../assets/logo.png';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Layout = () => {
  const {axios, navigate, setToken} = useAppContext(); 
   const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
    toast.success("Logged out successfully");
   }

  return (
    <>
    <div className='flex items-center justify-between  py-2 h-[90px] px-4 sm:px-12 border-b border-gray-200' >
      <img src={logo} alt="Logo"  className='w-11 sm:w-14 cursor-pointer' onClick={() => navigate('/')} />
      <button className='text-sm md:text-lg font-semibold px-5 md:px-7 py-1.5  md:py-2 bg-purple-800 hover:bg-purple-950 text-white rounded-sm cursor-pointer' onClick={logout}>Logout</button>
    </div>

    {/* Sidebar */}
    <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar/>
      <Outlet /> 
    </div>
    </>
  ) 
}

export default Layout