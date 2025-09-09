import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLock, FaUser, FaComments, FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
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
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-purple-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaComments className="text-purple-400" />
              <span className="text-purple-100 font-medium">Let's Connect</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Get In Touch
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 bg-clip-text text-transparent">
                & Let's Collaborate
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Ready to bring your ideas to life? Let's discuss your next 
              <span className="text-white font-semibold">amazing project</span>
            </motion.p>
            
            {/* Quick Contact Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.a
                href="mailto:your.email@example.com"
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <FaEnvelope className="text-3xl text-purple-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="text-purple-100 text-sm font-medium">Email Me</div>
                <div className="text-white text-xs mt-1">Quick Response</div>
              </motion.a>
              
              <motion.a
                href="tel:+251912345678"
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <FaPhone className="text-3xl text-blue-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="text-blue-100 text-sm font-medium">Call Me</div>
                <div className="text-white text-xs mt-1">Direct Contact</div>
              </motion.a>
              
              <motion.div
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <FaMapMarkerAlt className="text-3xl text-pink-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="text-pink-100 text-sm font-medium">Location</div>
                <div className="text-white text-xs mt-1">Addis Ababa, ET</div>
              </motion.div>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-purple-200 text-sm font-medium">Send Me a Message</span>
              <motion.div
                className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-purple-300 rounded-full mt-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Let's Start a Conversation
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to turn your ideas into reality? I'm here to help bring your vision to life.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Why Work With Me?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  As a recent Software Engineering graduate, I bring fresh perspectives, modern technologies, and 
                  a passion for creating innovative solutions. I'm eager to collaborate on exciting projects and 
                  help bring your ideas to life.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4 mb-8">
                  <motion.a
                    href="#"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-4">
                {[
                  { icon: FaMapMarkerAlt, title: 'Location', value: 'Addis Ababa, Ethiopia', color: 'from-pink-500 to-rose-500' },
                  { icon: FaEnvelope, title: 'Email', value: 'tdrag301@gmail.com', color: 'from-purple-500 to-indigo-500' },
                  { icon: FaPhone, title: 'Phone', value: '+251925480393', color: 'from-blue-500 to-cyan-500' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center">
                      <div className={`bg-gradient-to-r ${item.color} text-white p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                  <p className="font-semibold">Admin Notice:</p>
                  <p>Contact form is disabled for authenticated users.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <FaUser className="text-purple-500" />
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Your full name"
                      required
                      disabled={isAuthenticated}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-blue-500" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="your.email@example.com"
                      required
                      disabled={isAuthenticated}
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <FaComments className="text-indigo-500" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="What's this about?"
                    required
                    disabled={isAuthenticated}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                    <FaComments className="text-green-500" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Tell me about your project or idea..."
                    required
                    disabled={isAuthenticated}
                  ></textarea>
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  disabled={status.submitting || isAuthenticated}
                  whileHover={{ scale: isAuthenticated ? 1 : 1.02 }}
                  whileTap={{ scale: isAuthenticated ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {status.submitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaPaperPlane />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-slate-700 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Find Me Here
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-4 rounded-full" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Located in the heart of Addis Ababa, Ethiopia
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-3xl p-2 shadow-2xl border border-white/20 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden h-96 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126766.39805562324!2d38.68707754450877!3d9.006559985874354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1683992651749!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Addis Ababa, Ethiopia"
                className="rounded-2xl"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
