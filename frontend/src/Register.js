import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('https://8klehurecb.execute-api.us-east-1.amazonaws.com/dev/reg', {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reg`, {
                username,
                email,
                password,
            });
            alert(response.data);
            navigate('/login'); 
        } catch (error) {
            alert('Error registering user');
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-navy-blue">Register  to BlogSphere!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-navy-blue text-sm font-semibold">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-navy-blue text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-navy-blue text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-navy-blue text-white py-2 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Already have an account?</p>
                    <button
                        onClick={handleLoginClick}
                        className="text-orange-500 hover:text-orange-600 font-semibold"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
