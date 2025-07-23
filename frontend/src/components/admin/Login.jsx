import React from 'react';
import { MdEmail, MdLockOutline } from 'react-icons/md';
import { FaUserShield } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const Login = () => {

  // State variables for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {axios , setToken} = useAppContext();


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/admin/login', { email, password });
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);

        axios.defaults.headers.common['Authorization'] =  data.token;
        toast.success("Login successful");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/950241/pexels-photo-950241.jpeg)',
      }}
    >
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-300/40 transition-all duration-300 hover:shadow-purple-300/40 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <FaUserShield className="text-purple-700 text-5xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-purple-900 mb-1">Admin Login</h1>
          <p className="text-sm text-gray-700">Access your admin dashboard securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Email Address</label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-xl" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Password</label>
            <div className="relative">
              <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-xl" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2.5 rounded-md transition duration-300 shadow-md shadow-purple-400/30 hover:shadow-lg"
          >
            🔐 Login Securely
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
