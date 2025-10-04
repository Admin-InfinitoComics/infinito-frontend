import React, { useState } from 'react';
import LoginBackground from '../../../assets/Images/LoginBackground.jpg';
import LoginLogo from '../../../assets/Images/LoginLogo.png';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/userServices';
import { addUser } from '../../redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');

      // ✅ login request with cookies enabled
      const data = await loginUser(email, password); 

      // ✅ store user info in redux only (token is now in HTTP-only cookie)
      dispatch(addUser(data.data));

      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      console.error('Login failed:', err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="h-[70%] w-full relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${LoginBackground})` }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #310303, #000000)', opacity: 0.7 }} />
        </div>
        <div className="h-[30%] w-full" style={{ background: 'linear-gradient(to bottom, #111111, #663939)' }} />
      </div>

      {/* Login card */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="w-[540px] bg-white bg-opacity-95 px-8 py-10 rounded shadow-md">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex justify-center">
              <img src={LoginLogo} alt="Login Logo" className="w-[160px] object-contain m-5" />
            </div>

            <div className="flex pl-7 flex-col gap-1 text-left">
              <h2 className="font-semibold text-2xl">Log-in to our universe</h2>
              <p className="text-sm mt-2 text-gray-600">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-blue-600 font-medium">Create one!</Link>
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col pl-7 gap-1">
              <label className="text-sm text-red-600 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Please type your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-7/8 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 pl-7 relative">
              <label className="text-sm text-red-600 font-semibold">Password</label>
              <div className="relative w-7/8">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-400'} rounded pr-10 focus:outline-none focus:ring-2 focus:ring-red-500`}
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-600 mt-1 ml-1">{error}</p>
              )}
            </div>

            <Link to="/forgot-password" className="text-sm text-blue-600 cursor-pointer pl-7 text-left">Forgot password?</Link>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-[100px] bg-red-600 text-white py-2 hover:bg-red-700 transition uppercase text-[10px] tracking-widest"
              >
                Continue &gt;
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </div>
  );
};

export default Login;
