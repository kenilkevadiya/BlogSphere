import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCard = ({ blog, username, isSavedPage, fetchSavedBlogs }) => {
  const navigate = useNavigate();

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


  const handleRemoveBlog = async () => {
    try {
      //await axios.delete('https://29lwt4da4h.execute-api.us-east-1.amazonaws.com/dev/remove-saved-blog', {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/remove-saved-blog`, {
        headers: { username: username },
        data: { blog_id: blog.blog_id }
      });

      alert('Blog removed successfully');
      if (fetchSavedBlogs) fetchSavedBlogs();
    } catch (err) {
      console.error('Error removing blog:', err.response?.data || err.message);
    }
  };

  const handleMoreDetails = () => {
    navigate(`/blog/${blog.blog_id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-navy-blue mb-2">{blog.title || 'No Title'}</h2>
        <p className="text-gray-600 mb-2"><strong>By {blog.username || 'Unknown'}</strong> on {new Date(blog.date).toLocaleDateString()}</p>
        <p className="text-gray-600 mb-4"><strong>Category: </strong>{blog.category || 'Uncategorized'}</p>
        <div className="flex justify-end space-x-2">
          {isSavedPage ? (
            <button
              onClick={handleRemoveBlog}
              className="bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md px-4 py-2 transition"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleSaveBlog}
              className="bg-orange-600 text-white hover:bg-orange-700  focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md px-4 py-2 transition"
            >
              Save
            </button>
          )}
          <button
            onClick={handleMoreDetails}
            className="bg-navy-blue text-white hover:bg-navy-blue/80 focus:outline-none focus:ring-2 focus:ring-navy-blue/50 rounded-md px-4 py-2 transition"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
