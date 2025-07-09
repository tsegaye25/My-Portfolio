import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLock } from 'react-icons/fa';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const Contact = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  
  // If user is authenticated, pre-fill the form with their information
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Check if user is authenticated (admin)
    if (isAuthenticated) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'As an admin, you cannot send messages to yourself. Please use another communication method.' }
      });
      return;
    }
    
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      // Create a new message object with a timestamp
      const newMessage = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      
      // Get existing messages from localStorage or initialize empty array
      const existingMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
      
      // Add new message to the beginning of the array
      const updatedMessages = [newMessage, ...existingMessages];
      
      // Save updated messages to localStorage
      localStorage.setItem('portfolioMessages', JSON.stringify(updatedMessages));
      
      // Update status on successful submission
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: 'Message sent successfully! I will get back to you soon.' }
      });
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      // Handle errors
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Something went wrong. Please try again later.' }
      });
    }
  };

  return (
    <div className="pt-16">
      {/* Contact Header */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Me</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Have a question or want to work together? Feel free to get in touch with me.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                I'm interested in freelance opportunities – especially ambitious or large projects. 
                However, if you have other requests or questions, don't hesitate to contact me using the form.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Location</h3>
                    <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email</h3>
                    <p className="text-gray-600">tdrag301@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Phone</h3>
                    <p className="text-gray-600">+251925480393</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              {isAuthenticated && (
                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
                  <div className="flex items-center">
                    <FaLock className="mr-2" />
                    <span className="font-medium">Admin Notice:</span>
                  </div>
                  <p className="mt-2 text-sm">
                    As an admin, you cannot send messages to yourself through this form. 
                    This form is intended for visitors to contact you.
                  </p>
                </div>
              )}
              <h2 className="text-3xl font-bold mb-6">Send Message</h2>
                
              {status.info.error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                  <p>{status.info.msg}</p>
                </div>
              )}
                
              {status.submitted && !status.info.error && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                  <p>{status.info.msg}</p>
                </div>
              )}
                
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                    disabled={isAuthenticated}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                    disabled={isAuthenticated}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                    disabled={isAuthenticated}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                    disabled={isAuthenticated}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full md:w-auto disabled:opacity-70"
                  disabled={status.submitting || isAuthenticated}
                >
                  {status.submitting ? 'Sending...' : (
                    <>
                      Send Message <FaPaperPlane className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-lg overflow-hidden h-96 shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39805562324!2d38.68707754450877!3d9.006559985874354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1683992651749!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Addis Ababa, Ethiopia"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
