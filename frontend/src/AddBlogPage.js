import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBlogPage = ({ username }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post('https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/add-blog',
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/add-blog`,
        { title, description, category },
        { headers: { username } }
      );
      navigate('/');
    } catch (err) {
      console.error('Error adding blog:', err);
    }
  };

  const navigateToHomepage = () => {
    navigate('/')
  }

  const firstLetter = username ? username.charAt(0).toUpperCase() : '';


  return (
    <>
    <header className="flex justify-between items-center mb-8 bg-navy-blue text-white p-6 mt-8 mr-36 ml-36 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <span className="text-3xl font-extrabold cursor-pointer hover:text-gray-300 transition" onClick={navigateToHomepage}>BlogSphere</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-white border-2 border-navy-blue flex items-center justify-center rounded-full">
            <span className="text-navy-blue text-xl font-bold">{firstLetter}</span>
          </div>
        </div>
      </header>
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-navy-blue">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-navy-blue mb-2">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
            placeholder="Enter blog title"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-blue mb-2">Category</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
            placeholder="Enter blog category"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-blue mb-2">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 p-2" 
            placeholder="Enter blog description"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-navy-blue text-white hover:bg-navy-blue/80 focus:outline-none focus:ring-2 focus:ring-navy-blue/50 rounded-md px-4 py-2 transition"
        >
          Submit
        </button>
      </form>
    </div>
    </>
    
  );
};

export default AddBlogPage;
