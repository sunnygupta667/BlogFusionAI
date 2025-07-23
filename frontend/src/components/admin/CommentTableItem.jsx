import React from 'react';
import bin from '../../assets/bin.png';
import tick from '../../assets/tick.png';
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, isApproved, name, content } = comment;
  const { axios } = useAppContext();

  const BlogDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',    
  });

  const deleteComment = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
      if (!confirmDelete) return;
      const { data } = await axios.delete('/api/admin/delete-comment', { data: { id: _id } }); // ✅ important fix
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to approve comment");
    }
  };

  return (
    <>
      {/* ✅ Card layout for small screens */}
      <div className="block md:hidden bg-white shadow rounded-lg p-4 mb-4 border border-gray-200">
        <p className="text-sm text-gray-600 mb-2"><b>Blog:</b> {blog?.title}</p>
        <p className="text-sm text-gray-600"><b>Name:</b> {name}</p>
        <p className="text-sm text-gray-600 mb-2"><b>Comment:</b> {content}</p>
        <p className="text-xs text-gray-400 mb-2">📅 {BlogDate}</p>

        <div className="flex items-center justify-between mt-3">
          {!isApproved ? (
            <button
              onClick={approveComment}
              className="flex items-center gap-2 text-green-600 hover:text-green-800"
            >
              <img src={tick} alt="Approve" className="w-4" />
              Approve
            </button>
          ) : (
            <span className="text-xs border border-green-600 bg-green-100 text-green-600 px-3 py-1 rounded-full">
              Approved
            </span>
          )}
          <button
            onClick={deleteComment}
            className="text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <img src={bin} alt="Delete" className="w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* ✅ Table layout for larger screens */}
      <tr className="hidden md:table-row border-b border-gray-200 hover:bg-gray-50 transition-all">
        <td className="px-6 py-4 text-sm text-gray-700">
          <p><b>Blog:</b> {blog?.title}</p>
          <p><b>Name:</b> {name}</p>
          <p><b>Comment:</b> {content}</p>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{BlogDate}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            {!isApproved ? (
              <button onClick={approveComment} className="hover:scale-105 transition">
                <img src={tick} alt="Approve" className="w-5" />
              </button>
            ) : (
              <span className="text-xs border border-green-600 bg-green-100 text-green-600 px-3 py-1 rounded-full">
                Approved
              </span>
            )}
            <button onClick={deleteComment} className="hover:scale-105 transition">
              <img src={bin} alt="Delete" className="w-5" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CommentTableItem;
