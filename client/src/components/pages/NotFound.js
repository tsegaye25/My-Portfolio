import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="pt-16">
      <section className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <FaHome className="mr-2" /> Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
