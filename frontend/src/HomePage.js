import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ username, onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      fetchBlogsByCategory(category);
    } else {
      fetchBlogs();
    }
  }, [category]);

  const fetchBlogs = async () => {
    try {
      //const response = await axios.get('https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/blogs');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs`);
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      //const response = await axios.get(`https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/search-blogs?query=${searchQuery}`);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search-blogs?query=${searchQuery}`);
      setBlogs(response.data);
    } catch (err) {
      console.error('Error searching blogs:', err);
    }
  };

  const fetchBlogsByCategory = async (selectedCategory) => {
    try {
      //const response = await axios.get(`https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/filter-blogs?category=${selectedCategory}`);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/filter-blogs?category=${selectedCategory}`);
      setBlogs(response.data);
    } catch (err) {
      console.error('Error filtering blogs:', err);
    }
  };

  const handleSavedBlogsClick = () => {
    navigate('/saved-blogs');
  };

  const handleAddBlogClick = () => {
    navigate('/add-blog');
  };

  const navigateToHomepage = () => {
    navigate('/')
  }

  // const onLogout = () => {
  //   navigate('/login')
  // }

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';


  return (
    <div className="container mx-auto p-8 min-h-screen">
      <header className="flex justify-between items-center mb-8 bg-navy-blue text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={navigateToHomepage}>BlogSphere</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onLogout} className="bg-white text-navy-blue border-2 border-navy-blue hover:bg-gray-100 hover:border-navy-blue focus:outline-none focus:ring-2 focus:ring-navy-blue rounded-md px-4 py-2 transition"><strong>Logout</strong></button>
          <button onClick={handleAddBlogClick} className="bg-white text-navy-blue border-2 border-navy-blue hover:bg-gray-100 hover:border-navy-blue focus:outline-none focus:ring-2 focus:ring-navy-blue rounded-md px-4 py-2 transition"><strong>Add Blog</strong></button>
          <button onClick={handleSavedBlogsClick} className="bg-white text-navy-blue border-2 border-navy-blue hover:bg-gray-100 hover:border-navy-blue focus:outline-none focus:ring-2 focus:ring-navy-blue rounded-md px-4 py-2 transition"><strong>Saved Blogs</strong></button>

          <div className="w-10 h-10 bg-white border-2 border-navy-blue flex items-center justify-center rounded-full">
            <span className="text-navy-blue text-xl font-bold">{firstLetter}</span>
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm px-4 py-2 w-full md:w-1/2"
        />
        <button
          onClick={handleSearch}
          style={{ backgroundColor: '#001f3f', color: 'white' }}
          className="hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-4 py-2 transition w-full md:w-auto"
        >
          Search
        </button>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="select bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm px-4 py-2 w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Software">Software</option>
          <option value="Business">Business</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.blog_id} blog={blog} username={username} />
          ))
        ) : (
          <p className="text-gray-600">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
