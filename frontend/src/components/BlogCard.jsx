import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';


const BlogCard = ({ blog }) => {

  const {title, description , category , image, _id } = blog;
  const navigate = useNavigate();

  return (
<div onClick={() => navigate(`/blog/${_id}`)}  className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-gray-900/25 duration-300 cursor-pointer'>
  <img src={image} alt={title} className='aspect-video' />
  <span className='ml-5 mt-4 px-3 py-1 inline-block bg-purple-700/20 rounded-full text-purple-700 text-xs'> {category} </span>
 <div className='p-5'>
<h5 className=' mb-2 text-lg text-gray-900 font-medium'>{title}</h5>
<p className='mb-3 text-sm text-gray-600 ' dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}></p>
 </div>
</div>

  )
} 

export default BlogCard