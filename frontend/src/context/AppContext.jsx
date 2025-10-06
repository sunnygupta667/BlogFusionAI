import React, {useState,useEffect, createContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; 
import  toast  from 'react-hot-toast';
import { use } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'blog-fusion-ai.vercel.app';
const AppContext = createContext();



export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState('');

const fetchBlogs = async () => {
  try {
    const response = await axios.get('/api/blogs/all');
    if (response.data.success) {
      setBlogs(response.data.blogs);
    } else {
      toast.error(response.data.message || "Failed to fetch blogs");
    }
  } catch (error) {
    toast.error("Failed to fetch blogs");
  }
};


  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
      navigate('/');
    }
  }, []);

  return (
    <AppContext.Provider value={{ axios,navigate,token, setToken, blogs, setBlogs, input, setInput }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}