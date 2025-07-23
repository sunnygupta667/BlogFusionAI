// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div>   
//       <NavLink end={true} to={'/admin'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer  ${isActive && 'bg-purple-900/10 border-r-4 border-purple-900'}`}>
//         <img src="./home.png" alt="Logo" className='min-w-4 w-5' />
//         <p className='hidden md:inline-block'>Dashboard</p>
//       </NavLink>


//       <NavLink  to={'/admin/addBlog'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer  ${isActive && 'bg-purple-900/10 border-r-4 border-purple-900'}`}>
//         <img src="./add_icon.png" alt="Logo" className='min-w-4 w-5' />
//         <p className='hidden md:inline-block'>Add Blog</p>
//       </NavLink>

//       <NavLink  to={'/admin/listBlog'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer  ${isActive && 'bg-purple-900/10 border-r-4 border-purple-900'}`}>
//         <img src="./list_icon.png" alt="Logo" className='min-w-4 w-5' />
//         <p className='hidden md:inline-block'>Blog List</p>
//       </NavLink>


//       <NavLink  to={'/admin/comments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3  md:px-9 md:min-w-64 cursor-pointer  ${isActive && 'bg-purple-900/10 border-r-4 border-purple-900'}`}>
//         <img src="./comment.png" alt="Logo" className='min-w-4 w-5' />
//         <p className='hidden md:inline-block'>Comments</p>
//       </NavLink>


//     </div>
//   )
// }

// export default Sidebar

import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../../assets/home.png';
import addIcon from '../../assets/add_icon.png';
import listIcon from '../../assets/list_icon.png';
import commentIcon from '../../assets/comment.png';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: home },
  { to: '/admin/addBlog', label: 'Add Blog', icon: addIcon },
  { to: '/admin/listBlog', label: 'Blog List', icon: listIcon },
  { to: '/admin/comments', label: 'Comments', icon: commentIcon },
];

const Sidebar = () => {
  return (
    <div className="bg-white min-h-screen shadow-md border-r border-gray-200">
      <div className="py-6 px-4 text-xl font-bold text-purple-800 hidden md:block">
        Admin Panel
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            end={item.to === '/admin'}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 md:px-6 md:py-3.5 transition-all duration-200 hover:bg-purple-50 text-gray-700 font-medium 
              ${isActive ? 'bg-purple-100 border-r-4 border-purple-700 text-purple-900' : ''}`
            }
          >
            <img src={item.icon} alt={`${item.label} icon`} className="w-5 h-5" />
            <span className="hidden md:inline-block">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
