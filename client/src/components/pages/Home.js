import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaLaptopCode, FaServer, FaDatabase, FaReact, FaNodeJs, FaUser } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import { FiArrowDown } from 'react-icons/fi';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const { profileImage } = useContext(AuthContext);
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Mouse movement effect for hero section
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;
    
    const elements = heroRef.current.querySelectorAll('.parallax-element');
    elements.forEach((el, i) => {
      const factor = (i + 1) * 10;
      el.style.transform = `translate(${xPercent * factor}px, ${yPercent * factor}px)`;
    });
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-16 sm:pt-20 md:pt-0"
        onMouseMove={handleMouseMove}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Enhanced gradient overlays */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
          
          {/* Decorative blurred circles */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Enhanced floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full parallax-element ${i % 4 === 0 ? 'bg-blue-400/30' : i % 4 === 1 ? 'bg-purple-400/30' : i % 4 === 2 ? 'bg-indigo-400/30' : 'bg-cyan-400/30'}`}
              style={{
                width: `${Math.random() * 150 + 30}px`,
                height: `${Math.random() * 150 + 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(12px)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.1 + (Math.random() * 0.2), 
                scale: 0.6 + (Math.random() * 0.4),
                y: [0, Math.random() * 40 * (Math.random() > 0.5 ? 1 : -1), 0],
                x: [0, Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1), 0]
              }}
              transition={{ 
                duration: 8 + (Math.random() * 12), 
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-12 md:py-0">
          <motion.div 
            className="hero-content text-white max-w-full sm:max-w-3xl lg:max-w-2xl text-center lg:text-left w-full lg:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-4 sm:mb-6">
                <motion.div 
                  className="relative inline-block mb-4 sm:mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/30 rounded-full blur-sm animate-pulse"></div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-blue-200 text-xs sm:text-sm font-medium">
                    <span className="mr-1 sm:mr-2">👋</span> Hello, I'm
                  </div>
                </motion.div>
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Tsegaye Kebede
                  </span>
                </motion.h1>
                <motion.h2 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  Full Stack Developer & Problem Solver
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-full sm:max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  I create modern, responsive web applications using the MERN stack. 
                  Passionate about clean code, exceptional user experiences, and transforming innovative ideas into reality.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/projects" 
                  className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center">View My Work <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/contact" 
                  className="relative overflow-hidden group border-2 border-white/30 backdrop-blur-sm text-white hover:text-blue-600 transition-all font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center hover:shadow-2xl transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center">Let's Connect <FaEnvelope className="ml-2" /></span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-6 sm:mt-8 flex justify-center lg:justify-start gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.a 
                href="https://github.com/tsegaye25" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-blue-400 hover:bg-white/20 transition-all transform hover:-translate-y-1 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/tsegaye-kebede-bb7a0a311/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-blue-400 hover:bg-white/20 transition-all transform hover:-translate-y-1 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a 
                href="https://x.com/software34847" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-blue-400 hover:bg-white/20 transition-all transform hover:-translate-y-1 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
              <motion.a 
                href="mailto:tdrag301@gmail.com" 
                className="p-2.5 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:text-blue-400 hover:bg-white/20 transition-all transform hover:-translate-y-1 hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope size={20} className="sm:w-6 sm:h-6" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Profile Image */}
          <motion.div 
            className="profile-image-container relative flex-shrink-0 order-first lg:order-last mt-4 sm:mt-6 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
              {/* Enhanced animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-spin" style={{animationDuration: '25s'}}></div>
              <div className="absolute inset-3 rounded-full border-2 border-purple-400/40 animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
              <div className="absolute inset-6 rounded-full border border-cyan-400/40 animate-spin" style={{animationDuration: '15s'}}></div>
              
              {/* Gradient background blur */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl"></div>
              
              {/* Profile image container */}
              <div className="absolute inset-10 rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Tsegaye Kebede" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                      T
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ⚡
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
              >
                🚀
              </motion.div>
              <motion.div 
                className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-xl shadow-lg"
                animate={{ x: [0, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              >
                💻
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced Scroll indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 flex flex-col items-center cursor-pointer hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ opacity }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Explore More</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section Preview */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-80 sm:h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              About Me
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>
            <motion.p 
              className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I'm a passionate Software Engineer specializing in MERN stack development. 
              I create modern, scalable web applications with exceptional user experiences and clean, maintainable code.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="relative group">
                {/* Background gradient blur */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Image container */}
                <div className="relative bg-white p-2 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Tsegaye Kebede" 
                      className="rounded-xl w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="rounded-xl w-full aspect-[4/3] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <FaUser size={80} className="text-white" />
                    </div>
                  )}
                </div>
                
                {/* Floating badges */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Available for hire
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                Full Stack Developer
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-8 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                I graduated with a degree in Software Engineering and specialize in MERN stack development. 
                I'm passionate about creating scalable, user-friendly applications that solve real-world problems 
                with clean, maintainable code and modern design principles.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
                  <p className="font-semibold text-blue-600 mb-1">Name</p>
                  <p className="text-gray-700">Tsegaye Kebede</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-purple-100 hover:border-purple-200 transition-colors">
                  <p className="font-semibold text-purple-600 mb-1">Email</p>
                  <p className="text-gray-700">tdrag301@gmail.com</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 hover:border-indigo-200 transition-colors">
                  <p className="font-semibold text-indigo-600 mb-1">Location</p>
                  <p className="text-gray-700">Addis Ababa, Ethiopia</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-green-100 hover:border-green-200 transition-colors">
                  <p className="font-semibold text-green-600 mb-1">Status</p>
                  <p className="text-gray-700">Available for hire</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                <Link 
                  to="/about" 
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all font-medium px-8 py-4 rounded-xl inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-2">More About Me</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section Preview */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Technical Skills
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p 
              className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              I specialize in MERN stack development with expertise in modern web technologies, 
              creating scalable applications with clean architecture and exceptional user experiences.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon container */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
                    <div className="text-blue-600 text-3xl group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                  </div>
                </div>
                
                {/* Skill name */}
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{skill.name}</h3>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-12 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/skills" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all font-medium px-8 py-4 rounded-xl inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">View All Skills</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p 
              className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Explore some of my recent projects showcasing modern web development, 
              innovative solutions, and exceptional user experiences.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium hover:from-indigo-200 hover:to-purple-200 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={20} />
                      <span>Code</span>
                    </motion.a>
                    <motion.a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/projects" 
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all font-medium px-8 py-4 rounded-xl inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">View All Projects</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let's Work Together
            </motion.h2>
            <motion.p 
              className="max-w-3xl mx-auto mb-10 text-blue-100 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Have a project in mind? Let's discuss how I can help bring your ideas to life 
              with modern web development solutions and exceptional user experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/contact" 
                className="group bg-gradient-to-r from-white to-blue-50 text-slate-900 hover:from-blue-50 hover:to-white transition-all font-medium px-8 py-4 rounded-xl inline-flex items-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="mr-2">Get In Touch</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Sample data for the home page
const skills = [
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Express.js', icon: '⚡' },
  { name: 'React.js', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'HTML/CSS', icon: '🎨' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Git', icon: '🔄' }
];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com'
  },
  {
    title: 'Blog Platform',
    description: 'A content management system for creating and managing blog posts with user authentication.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com'
  }
];

export default Home;
