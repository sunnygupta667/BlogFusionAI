import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import gradientBackground from '../assets/gradientBackground.png';
import user_icon from '../assets/user_icon.svg';
import deleteIcon from '../assets/deleteIcon.png';
import {
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const commentSectionRef = useRef(null);

  // Fetch blog content
  const fetchBlogData = async () => {
    try {
      const {data}  =await axios.get(`/api/blogs/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch blog data. Please try again later.");
    }
  };

  // Fetch blog comments
  const fetchComments = async () => {
    try {
      const {data} = await axios.post(`/api/blogs/comments`, { blog: id });
      data.success
        ? setComments(data.comments)
        : toast.error(data.message);
    } catch (error) {
      toast.error("Failed to fetch comments. Please try again later.");
    }
  };
  
const addComment = async (e) => {
  e.preventDefault();
  try {
    const {data} = await axios.post("/api/blogs/add-comment", {
      blog: id,
      name,
      content,
    });
    if (data.success) {
      toast.success(data.message);
      setName("");
      setContent("");
    } else {
      toast.error(data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Add Comment Error:", error);
    toast.error("Failed to add comment. Please try again later.");
   }
};


  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  if (!data) return <Loader />;



  // Delete comment from UI only (backend delete optional)
  const deleteComment = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId));
    // Optional backend delete call here
  };

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(data.title);

  return (
    <div className="relative min-h-screen bg-white">
      <img
        src={gradientBackground}
        alt="Gradient Background"
        className="absolute top-0 left-0 w-full opacity-50 -z-10"
      />

      <Navbar />

      <div className="mt-20 text-center text-gray-700 px-4">
        <p className="text-sm text-purple-800 font-medium mb-2">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold max-w-3xl mx-auto text-gray-900 leading-tight">
          {data.title}
        </h1>
        <h2 className="mt-4 mb-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 italic">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-4 rounded-full border border-purple-600/30 bg-purple-100/50 text-sm text-purple-700 font-medium">
          Michael Brown
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-12">
        <img
          src={data.image}
          alt="Blog Cover"
          className="w-full h-auto rounded-2xl shadow-xl mb-8"
        />
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>

      {/* Share Section */}
      <div className="max-w-3xl mx-auto mt-10 px-4 text-center">
        <p className="text-lg font-semibold text-gray-700 mb-4">Share this blog:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition duration-300 shadow-md"
            title="Share on Facebook"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition duration-300 shadow-md"
            title="Share on WhatsApp"
          >
            <FaWhatsapp className="text-xl" />
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full transition duration-300 shadow-md"
            title="Share on Telegram"
          >
            <FaTelegramPlane className="text-xl" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-full transition duration-300 shadow-md"
            title="Share on LinkedIn"
          >
            <FaLinkedinIn className="text-xl" />
          </a>
          <a
            href={`https://www.instagram.com/`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:brightness-110 text-white p-3 rounded-full transition duration-300 shadow-md"
            title="Visit Instagram"
          >
            <FaInstagram className="text-xl" />
          </a>
        </div>
      </div>

      {/* Comments Section */}
      <div ref={commentSectionRef} className="mt-12 mb-12 max-w-3xl mx-auto px-4">
        <p className="text-2xl font-bold text-gray-900 mb-6">
          Comments <span className="text-purple-600">({comments.length})</span>
        </p>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-4 transition hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={user_icon}
                      alt="User Icon"
                      className="h-8 w-8 rounded-full border border-gray-300"
                    />
                    <h2 className="text-md font-semibold text-gray-800">
                      {comment.name}
                    </h2>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center gap-2">
                    {Moment(comment.createdAt).format('MMMM Do YYYY, h:mm A')}
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="ml-2 cursor-pointer opacity-85"
                      aria-label="Delete Comment"
                      title="Delete Comment"
                    >
                      <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
                    </button>
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed break-words">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="max-w-md mx-4 md:mx-auto mt-16 mb-12 px-4 md:px-0">
        <p className="text-xl font-semibold mb-4 text-gray-800">Leave a Comment</p>
        <form
          className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 space-y-4"
          onSubmit={addComment}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <textarea
            rows="3"
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
          ></textarea>
          <button
            type="submit"
            disabled={!name.trim() || !content.trim()}
            className={`bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 px-6 rounded-md shadow-sm transition w-fit ${
              (!name.trim() || !content.trim()) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            Post Comment
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
