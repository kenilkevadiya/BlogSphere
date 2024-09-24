import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const SavedBlogsPage = ({ username }) => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedBlogs();
  }, []);

  const fetchSavedBlogs = async () => {
    try {
      //const response = await axios.get('https://8klehurecb.execute-api.us-east-1.amazonaws.com/dev/saved-blogs', {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/saved-blogs`, {
        headers: { username: username }
      });
      console.log('Fetched saved blogs:', response.data);
      setSavedBlogs(response.data);
    } catch (err) {
      console.error('Error fetching saved blogs:', err);
    }
  };

  const navigateToHomepage = () => {
    navigate('/')
  }

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8 bg-navy-blue text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={navigateToHomepage}>BlogSphere</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white border-2 border-navy-blue flex items-center justify-center rounded-full">
            <span className="text-navy-blue text-xl font-bold">{firstLetter}</span>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedBlogs.length > 0 ? (
          savedBlogs.map((blog) => (
            <BlogCard key={blog.blog_id} blog={blog} username={username} isSavedPage={true} fetchSavedBlogs={fetchSavedBlogs} />
          ))
        ) : (
          <p>No saved blogs found</p>
        )}
      </div>
    </div>
  );
};

export default SavedBlogsPage;
