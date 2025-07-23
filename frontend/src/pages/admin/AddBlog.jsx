import React, {useState , useEffect, useRef} from 'react'
import Quill from 'quill';
import { blogCategories } from '../../assets/assets.js';
import upload_area from '../../assets/upload_area.png';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {
  
  const editorRef = useRef(null);
  const quill = useRef(null);

  const {axios} = useAppContext();
  const[isAdding, setIsAdding] = useState(false);
  const [loading , setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent= async () => {
    if(!title ) return toast.error("Please enter a title to generate content")  ;
    try {
      setLoading(true);
      const {data} = await axios.post('/api/blogs/generate', {prompt: title});
      if(data.success){
        quill.current.root.innerHTML = parse(data.content );
        toast.success("Content generated successfully");
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
      try {
        e.preventDefault();
        setIsAdding(true);
        const blog ={
          title, subTitle, category, description: quill.current.root.innerHTML, isPublished
        }
        const formData = new FormData();
        formData.append('blog', JSON.stringify(blog));
        formData.append('image', image);
        const {data} = await axios.post('/api/blogs/add', formData)
        if(data.success){
          toast.success(data.message);
          setImage(false);
          setTitle('');
          quill.current.root.innerHTML = '';
          setCategory('Startup');

        }
        else{
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(error.message)
      }
      finally{
        setIsAdding(false);
      }
  };

  useEffect(() => {
    if (!quill.current && editorRef.current) {
      quill.current = new Quill(editorRef.current, {
        theme: 'snow'      });
    }
  } , []);
 
  return (
    <form onSubmit={onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
  <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
    
    <p>Upload thumbnail</p>
    
    <label htmlFor="image">
      <img
        src={image ? URL.createObjectURL(image) : upload_area}
        alt=""
        className="mt-2 h-16 rounded cursor-pointer hover:opacity-80 object-cover"
      />
      <input
        type="file"
        id="image"
        hidden
        required
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
       <p className='mt-4'>Blog title</p>
<input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setTitle(e.target.value)} value={title}/>

<p className='mt-4'>Sub title</p>
<input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e) => setSubTitle(e.target.value)} value={subTitle}/>

   <p className='mt-4'>Blog Description</p>
<div className='max-w-lg h-72 pb-16 sm:pb-10 pt-2 relative'>
  <div
    ref={editorRef}
    className="h-48 overflow-y-auto border border-gray-300 rounded p-2 bg-white"
  ></div>

  {loading && (
    <div className="absolute inset-0 bg-white/70 flex justify-center items-center rounded">
      <div className="w-8 h-8 border-r-3 border-b-3  border-purple-600  rounded-full animate-spin"></div>
    </div>
  )}
  <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:bg-purple-900 duration-200 transition cursor-pointer'>Generate with AI</button>
</div>

  <p className='mt-4'>Blog Category</p>
  <select name="category"  onChange={(e) => setCategory(e.target.value)} className=' mt-2 px-3  py-2 border text-gray-500 border-gray-300 outline-none rounded'>
    <option value="">Select Category</option>
       {blogCategories.map((item, index) => (
         <option key={index} value={item}>{item}</option>
       )) }
  </select>

     {/* Publish Now */}
  <div className='flex items-center gap-2 mt-4'>
    <input type="checkbox" id="publish" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
    <label htmlFor="publish" className='text-sm'>Publish Now</label>  
    </div>

  <button disabled={isAdding} type='submit' className='mt-4 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-900 hover:scale-105 ease-in-out duration-200'>{isAdding ? "Adding..." : "Add Blog"}</button>

  </div>
</form>

  )
}

export default AddBlog