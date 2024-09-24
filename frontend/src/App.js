import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import SavedBlogsPage from './SavedBlogsPage';
import BlogDetailsPage from './BlogDetailsPage';
import AddBlogPage from './AddBlogPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <HomePage username={username} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/saved-blogs" element={<SavedBlogsPage username={username} onLogout={handleLogout} />} />
      <Route path="/add-blog" element={<AddBlogPage username={username} />} />
      <Route path="/blog/:blog_id" element={<BlogDetailsPage username={username} />} />

    </Routes>
  );
}

export default App;
