import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
dotenv.config();
export const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body; 
    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({success: false, message: "Invalid credentials"});
    }
    // If credentials are valid, set a session or token (not implemented here)
    const token = jwt.sign({email}, process.env.JWT_SECRET);
    return res.status(200).json({success: true, token});

  } catch (error) {
    return res.status(500).json({success: false, message: "Internal server error"});
  }

}

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate('blog').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//get a dashboard
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const totalBlogs = await Blog.countDocuments();
    const totalComments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      totalBlogs,
      totalComments,
      drafts,
      recentBlogs
    };
    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}



export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const approvedCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    return res.status(200).json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
} 