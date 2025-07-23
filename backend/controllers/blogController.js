import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import fs from 'fs';
import imageKit from '../config/imageKit.js';
import main from '../config/gemini.js'; // Import the Gemini AI function


  // Function to add a new blog
  export const addBlog = async (req, res) => {
    try {
      const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
      const newBlog = new Blog({ title, subTitle, description, category, isPublished });
      const imageFile = req.file;

      // check if all field are present
      if (!title || !description || !category || !imageFile) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
      // Upload image to ImageKit
      const fileBuffer = fs.readFileSync(imageFile.path);
        const imageUploadResponse = await imageKit.upload({
          file: fileBuffer, // the file buffer
          fileName: imageFile.originalname, // the name of the file
          folder: "/blogs", // optional: folder path in ImageKit
        });
      
        // optimize the image using imageKit
        const optimizedImageUrl = imageKit.url({
          path: imageUploadResponse.filePath,
          transformation: [{ width: "1280", format: "webp", quality: "auto" }] // example transformations
        });
        const imageUrl = optimizedImageUrl || imageUploadResponse.url; // use optimized image URL if available
        await Blog.create({title, subTitle, description, category, image: imageUrl, isPublished});

        // delete the local file after upload
        fs.unlinkSync(imageFile.path);

      return res.status(201).json({ success: true, message: "Blog added successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


// Function to get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to delete a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
     await Blog.findByIdAndDelete(id);

     // Delete associated comments
    await Comment.deleteMany({ blog: id });
    
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Toggle publish
export const togglePublish = async (req, res) => {
  try {
    const { id } = req. body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    return res.status(200).json({ success: true, message: "Blog publish status updated", blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    if (!req.body.blog) {
      return res.status(400).json({ success: false, message: "Missing blog data" });
    }

    const parsedData = JSON.parse(req.body.blog);
    const { title, subTitle, description, category, isPublished } = parsedData;

    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const imageUploadResponse = await imageKit.upload({
        file: fileBuffer,
        fileName: req.file.originalname,
        folder: "/blogs",
      });

      const optimizedImageUrl = imageKit.url({
        path: imageUploadResponse.filePath,
        transformation: [{ width: "1280", format: "webp", quality: "auto" }],
      });

      blog.image = optimizedImageUrl || imageUploadResponse.url;
      fs.unlinkSync(req.file.path);
    }

    blog.title = title ?? blog.title;
    blog.subTitle = subTitle ?? blog.subTitle;
    blog.description = description ?? blog.description;
    blog.category = category ?? blog.category;
    blog.isPublished = isPublished ?? blog.isPublished;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
 await Comment.create({ blog, name, content });

    return res.status(201).json({
      success: true,
      message: "Comment added for review"
    });
  } catch (error) {
  return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


// get comments for a blog
export const getBlogComments = async (req, res) => {
  try {
    const { blog } = req.body; // <== fix here
    const comments = await Comment.find({ blog, isApproved: true }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Get blog comments error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
const response = await main(`
  Write a professional, well-structured, and engaging blog post on the topic: "${prompt}".

  Guidelines:
  - The main heading should be bold and large in size.
  - All the sub heading should be also bold and large but not larger than main heading 
  - Keep the content informative and easy to read.
  - Use bold titles for each section.
  - Use dotted bullet points (e.g., "-") where appropriate.
  - Avoid using any special symbols or code formatting (like "#", "*", ">", or backticks).
  - Return only plain text content suitable for direct display in a blog.

  Structure:
  - Catchy introduction
  - Main content divided into clear sections
  - Conclusion or takeaway

  Language should be clear, concise, and suitable for a general audience.
`);

    return res.status(200).json({ success: true, content: response });
  } catch (error) {
    console.error(error); // helpful for debugging
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
