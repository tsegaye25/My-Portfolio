import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tsegaye Kebede</h3>
            <p className="mb-4">
              Software Engineer specializing in MERN stack development with a passion for creating
              modern, responsive web applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/tsegaye25" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/tsegaye-kebede-bb7a0a311/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="https://x.com/software34847" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="mailto:tdrag301@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-300 hover:text-white transition-colors">Skills</Link>
              </li>
              <li>
                <Link to="/experience" className="text-gray-300 hover:text-white transition-colors">Experience</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <p className="mb-2">Addis Ababa, Ethiopia</p>
            <p className="mb-2">Email: tsegaye.kebede@example.com</p>
            <p className="mb-2">Phone: +251 91 234 5678</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} Tsegaye Kebede. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Built with React, Node.js, Express, and MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
