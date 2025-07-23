import express from 'express';
import { adminLogin, approvedCommentById, getAllBlogsAdmin, getAllComments, getDashboard, deleteCommentById  } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.post('/approve-comment', auth, approvedCommentById);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/dashboard', auth, getDashboard);
adminRouter.delete('/delete-comment', auth, deleteCommentById);

export default adminRouter; 