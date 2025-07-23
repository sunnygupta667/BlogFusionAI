import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quill from 'quill';
import upload_area from '../../assets/upload_area.png';
import { blogCategories } from '../../assets/assets.js';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const UpdateBlog = ({ blog: blogProp, fetchBlogs, onClose }) => {
  const { id: routeId } = useParams();
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [id, setId] = useState(routeId || blogProp?._id || '');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quill = useRef(null);

  useEffect(() => {
    if (!quill.current && editorRef.current) {
      quill.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  useEffect(() => {
    const loadBlog = async () => {
      if (blogProp) {
        setId(blogProp._id);
        setTitle(blogProp.title);
        setSubTitle(blogProp.subTitle);
        setCategory(blogProp.category);
        setIsPublished(blogProp.isPublished);
        setPreviewImage(blogProp.image);
        setTimeout(() => {
          if (quill.current) {
            quill.current.root.innerHTML = blogProp.description;
          }
        }, 100);
      } else if (routeId) {
        try {
          const { data } = await axios.get(`/api/blogs/${routeId}`);
          if (data.success) {
            const blog = data.blog;
            setId(blog._id);
            setTitle(blog.title);
            setSubTitle(blog.subTitle);
            setCategory(blog.category);
            setIsPublished(blog.isPublished);
            setPreviewImage(blog.image);
            setTimeout(() => {
              if (quill.current) {
                quill.current.root.innerHTML = blog.description;
              }
            }, 100);
          } else {
            toast.error(data.message || 'Failed to load blog');
          }
        } catch (err) {
          console.error('Error fetching blog:', err);
          toast.error('Error loading blog data');
        }
      }
    };

    loadBlog();
  }, [blogProp, routeId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const description = quill.current?.root.innerHTML;

    const blogData = {
      title,
      subTitle,
      description,
      category,
      isPublished,
    };

    const formData = new FormData();
    formData.append('blog', JSON.stringify(blogData));
    if (image) {
      formData.append('image', image);
    }

    try {
      const { data } = await axios.put(`/api/blogs/${id}`, formData);
      if (data.success) {
        toast.success('Blog updated!');
        fetchBlogs?.();
        if (onClose) onClose();
        else navigate('/admin-dashboard');
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update blog. Please try again later.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded relative">
        <p className="font-semibold text-lg mb-2">Update Blog</p>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : previewImage || upload_area}
            alt="thumbnail"
            className="mt-2 h-16 rounded cursor-pointer hover:opacity-80 object-cover"
          />
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input
          type="text"
          required
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="mt-4">Sub title</p>
        <input
          type="text"
          required
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
        </div>

        <p className="mt-4">Blog Category</p>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="publish" className="text-sm">
            Publish Now
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-900 hover:scale-105 ease-in-out duration-200"
          >
            Update Blog
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 hover:scale-105 ease-in-out duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default UpdateBlog;
