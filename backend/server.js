import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

const app = express();


await connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());


// import routes
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

// routes
app.use('/api/admin', adminRouter);
app.use('/api/blogs', blogRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;