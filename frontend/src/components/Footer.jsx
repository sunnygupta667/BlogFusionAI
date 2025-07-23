import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logo from '../assets/logo.png'; // Adjust the path as necessary


const Footer = () => {
  return (
    <footer className="bg-gray-100/80 text-gray-700 px-6 py-6 sm:px-12 md:px-20 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:36 lg:gap-56">

        {/* Logo & About Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BlogFusionAI" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-purple-700">BlogFusionAI</h1>
          </div>
          <p className="text-sm text-gray-600">
            Your daily dose of tech insights and AI innovations. Discover tutorials, trends, and AI breakthroughs shaping tomorrow.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-all transform hover:scale-110">
              <FaInstagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-all transform hover:scale-110">
              <FaFacebookF size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-all transform hover:scale-110">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-purple-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-purple-600 transition">About Us</a></li>
            <li><a href="/blogs" className="hover:text-purple-600 transition">Blogs</a></li>
            <li><a href="/contact" className="hover:text-purple-600 transition">Contact</a></li>
            <li><a href="/privacy-policy" className="hover:text-purple-600 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2"><FiMail /> sg7472209@gmail.com</li>
            <li className="flex items-center gap-2"><FiPhone /> +91 6283099081</li>
            <li className="flex items-center gap-2"><FiMapPin /> Dehradun, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-500">
        © 2025 <span className="font-semibold text-purple-700">BlogFusionAI</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
