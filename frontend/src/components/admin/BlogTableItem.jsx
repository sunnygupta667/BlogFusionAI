import React, { useState } from 'react';
import cross_icon from '../../assets/cross_icon.png';
import edit_icon from '../../assets/edit_icon.png'; // 
import UpdateBlog from '../../pages/admin/UpdateBlog'; // 
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const [showUpdate, setShowUpdate] = useState(false);

  const deleteBlog = async()=>{
    const confirm = window.confirm( "Are you sure you want to delete this blog?");
    if(confirm){
      try { 
        const { data } = await axios.delete('/api/blogs/delete', { data: { id: blog._id } });

        if (data.success) {
          toast.success(data.message || "Blog deleted successfully");
          await fetchBlogs();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to delete blog");
      }
    }
    else{
      toast.error("Blog deletion cancelled");
      return;
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blogs/toggle-publish', { id: blog._id });
      if (data.success) {
        toast.success("Blog publish status updated");
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to toggle publish status");
    }
  };

  return (
    <>
      <tr className="border-y border-gray-200">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4 max-sm:hidden">
          <p className={`${blog.isPublished ? 'text-green-500' : 'text-red-500'}`}>
            {blog.isPublished ? 'Published' : 'Unpublished'}
          </p>
        </td>
        <td className="px-2 py-4 flex text-xs gap-3 items-center">
          <button onClick={togglePublish}
            className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          >
            {blog.isPublished ? 'Unpublish' : 'Publish'}
          </button>

          {/* ✅ Edit icon */}
          <img
            src={edit_icon}
            alt="Edit"
            title="Edit Blog"
            onClick={() => setShowUpdate(true)}
            className="w-6 hover:scale-110 transition-all cursor-pointer"
          />

          {/* ❌ Delete icon */ }
          <img
            src={cross_icon}
            alt="Delete"
            title="Delete Blog"
            className="w-6 hover:scale-105 transition-all cursor-pointer"
            onClick={deleteBlog}
          />
        </td>
      </tr>

      {/* ✅ Conditionally show UpdateBlog modal/component */}
      {showUpdate && (
        <tr>
          <td colSpan="5">
            <UpdateBlog blog={blog} fetchBlogs={fetchBlogs} onClose={() => setShowUpdate(false)} />
          </td>
        </tr>
      )}
    </>
  );
};

export default BlogTableItem;
