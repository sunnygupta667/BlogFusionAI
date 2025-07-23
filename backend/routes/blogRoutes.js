import express from 'express';
import { addBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog, togglePublish, addComment, getBlogComments , generateContent} from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();
blogRouter.post('/add', auth, upload.single('image'), addBlog);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments); // <-- use POST to allow req.body
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId',  getBlogById);
blogRouter.delete('/delete', auth, deleteBlog);
blogRouter.put('/:blogId', auth, upload.single('image'), updateBlog);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/generate', auth, generateContent);

export default blogRouter;