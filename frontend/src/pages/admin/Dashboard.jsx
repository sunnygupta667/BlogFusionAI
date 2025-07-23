import React, { useEffect } from 'react'
import { useState } from "react"
import { dashboard_data} from '../../assets/assets.js'
import BlogTableItem from '../../components/admin/BlogTableItem.jsx'
import dashboard1 from '../../assets/dashboard1.png';
import dashboard2 from '../../assets/dashboard2.png';
import dashboard4 from '../../assets/dashboard4.png';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import drafts from '../../assets/drafts.png';

const Dashboard = () => {
    
  const [dashboardData, setDashboardData] = useState({
      totalBlogs:0,
      totalComments:0,
      drafts:0,
      recentBlogs:[]

  });
  const { axios } = useAppContext();

  const fetchDashboard = async () => {
   try {
     const { data } = await axios.get('/api/admin/dashboard');
     data.success? setDashboardData(data.dashboardData ) : toast.error(data.message);
   } catch (error) {
     toast.error("Failed to fetch dashboard data");
   }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
               <img src={dashboard1} alt="" />
               <div>
                <p className='text-xl font-semibold text-gray-600'>{ dashboardData.totalBlogs}</p>
                <p className='text-gray-400 font-light'>Blogs</p>
               </div>
            </div>

           <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
               <img src={dashboard2} alt="" />
               <div>
                <p className='text-xl font-semibold text-gray-600'>{ dashboardData.totalComments}</p>
                <p className='text-gray-400 font-light'>Comments</p>
               </div>
            </div>

           <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
               <img src={drafts} alt="" />
               <div>
                <p className='text-xl font-semibold text-gray-600'>{ dashboardData.drafts}</p>
                <p className='text-gray-400 font-light'>Drafts </p>
               </div>
            </div>
      </div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
        <img src={dashboard4} alt="" />
        <p>Latest Blog</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white '>
           <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase '>
       <tr>
         <th scope='col' className='px-2 py-4 xl:px-6'> #</th>
         <th scope='col' className='px-2 py-4 '> Blog Title</th>
         <th scope='col' className='px-2 py-4 max-sm:hidden'> Date</th>
         <th scope='col' className='px-2 py-4 max-sm:hidden'> Status</th>
         <th scope='col' className='px-2 py-4 '> Actions</th>
       </tr>
            </thead>

            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })}
            </tbody>
           </table>
        </div>
    </div>
  )
}

export default Dashboard