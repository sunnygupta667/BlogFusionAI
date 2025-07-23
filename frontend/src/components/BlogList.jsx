import React from 'react'
import {motion } from 'motion/react'
import { blog_data, blogCategories } from '../assets/assets'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'


const BlogList = () => {

  const [menu, setMenu] = React.useState("All");
  const {blogs, input} = useAppContext(); 
   const filteredBlogs = blogs.filter((blog) => {
  if (input === '') return true; // show all blogs
  return (
    blog.title.toLowerCase().includes(input.toLowerCase()) ||
    blog.category.toLowerCase().includes(input.toLowerCase())
  );
});



  return (
    <div>

      {/* Categories Links */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative ' >
            <button  onClick={()=>setMenu(item)} className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5  bg-purple-700 rounded-full '}`}>{item}
              {menu===item && (<motion.div   animate={{ rotate: 180 }}
  transition={{ type: 'spring', restSpeed: 0.5 }} className='absolute left-0 right-0 top-0 h-7 -z-1 bg-purple-700 rounded-full'></motion.div>)}
            </button>
          </div>  
        ))}
      </div>

      {/* Blog Card */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 sm:px-16 xl:px-24'>
       {filteredBlogs.filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => (
         <BlogCard key={blog._id} blog={blog} />
       ))}
        
      </div>
    </div>
  )
} 

export default BlogList 