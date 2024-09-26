// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             //const response = await axios.post('https://8klehurecb.execute-api.us-east-1.amazonaws.com/dev/login', { username, password });
//             const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, { username, password });
//             if (response.status === 200) {
//                 onLogin(username); 
//                 navigate('/'); 
//             }
//         } catch (err) {
//             setError('Invalid username or password');
//         }
//     };

//     const handleSignUpClick = () => {
//         navigate('/register'); 
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//                 <h1 className="text-2xl font-bold mb-6 text-center text-navy-blue">LogIn to BlogSphere!</h1>
//                 <h2 className="text-2xl font-bold mb-6 text-center text-navy-blue"></h2>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-navy-blue text-sm font-semibold">Username</label>
//                         <input
//                             type="text"
//                             className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-navy-blue text-sm font-semibold">Password</label>
//                         <input
//                             type="password"
//                             className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-navy-blue text-white py-2 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <div className="mt-4 text-center">
//                     <p className="text-gray-600">Don't have an account?</p>
//                     <button
//                         onClick={handleSignUpClick}
//                         className="text-orange-500 hover:text-orange-600 font-semibold"
//                     >
//                         Register
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await Auth.signIn(username, password);
            console.log('Login successful:', user);
            onLogin(username);
            navigate('/');
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Invalid username or password');
        }
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-navy-blue">LogIn to BlogSphere!</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        onClick={handleSignUpClick}
                        className="text-orange-500 hover:text-orange-600 font-semibold"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
