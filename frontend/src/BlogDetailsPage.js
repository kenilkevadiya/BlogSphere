import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetailsPage = ({ username }) => {
  const { blog_id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        if (!blog_id) {
          console.error("No blog_id found in params");
          return;
        }

        //const response = await axios.get('https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/get-blog-by-id', {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-blog-by-id`, {
          params: { blog_id }
        });
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog details:', err);
      }
    };

    fetchBlogDetails();
  }, [blog_id]); 

  const handleSaveBlog = async () => {
    try {
      //const response = await axios.post('https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/save-blog',
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/save-blog`,
        { blog_id: blog.blog_id },
        { headers: { username } }
      );
      if (response.status === 201) {
        alert('Blog saved successfully');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Blog already saved');
      } else {
        console.error('Error saving blog:', err);
        alert('An error occurred while saving the blog');
      }
    }
  };

  const handleSavedBlogsClick = () => {
    navigate('/saved-blogs');
  };

  const navigateToHomepage = () => {
    navigate('/');
  };

  if (!blog) return <p className="text-center text-gray-600">Loading...</p>;

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="flex justify-between items-center mb-8 bg-navy-blue text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={navigateToHomepage}>BlogSphere</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleSavedBlogsClick} className="bg-white text-navy-blue border-2 border-navy-blue hover:bg-gray-100 hover:border-navy-blue focus:outline-none focus:ring-2 focus:ring-navy-blue rounded-md px-4 py-2 transition"><strong>Saved Blogs</strong></button>

          <div className="w-10 h-10 bg-white border-2 border-navy-blue flex items-center justify-center rounded-full">
            <span className="text-navy-blue text-xl font-bold">{firstLetter}</span>
          </div>
        </div>
      </header>
      <h1 className="text-3xl font-bold mb-4 text-navy-blue">{blog.title}</h1>
      <p className="text-gray-600 mb-2">By {blog.username} on {new Date(blog.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">Category: {blog.category}</p>
      <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-6">
        <p className="text-gray-800">{blog.description}</p>
      </div>
      <button onClick={handleSaveBlog} className="bg-orange-600 text-white hover:bg-orange-700  focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md px-4 py-2 transition">Save</button>
    </div>
  );
};

export default BlogDetailsPage;
