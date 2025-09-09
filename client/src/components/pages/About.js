import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaUser, FaLaptopCode, FaGraduationCap, FaAward, FaUsers, FaRocket, FaDownload, FaBriefcase, FaCode, FaTimes } from 'react-icons/fa';

const About = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace with a real user ID from your database
        const userId = '668d68375306365a95963b8a'; 
        const res = await fetch(`/api/profile/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error(data.msg);
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchUser();
  }, []);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
  
  // State for resume modal
  const [showResumeModal, setShowResumeModal] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section with Parallax */}
      <header ref={ref} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-32 text-white">
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ y, opacity }}
        >
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-32 md:w-64 h-32 md:h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-5 md:bottom-10 right-10 md:right-20 w-40 md:w-80 h-40 md:h-80 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
          <div className="absolute top-20 md:top-40 right-1/4 w-20 md:w-40 h-20 md:h-40 rounded-full bg-purple-400 opacity-10 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 md:w-48 h-24 md:h-48 rounded-full bg-cyan-400 opacity-15 blur-3xl"></div>
        </motion.div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            ref={titleRef}
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-block mb-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isTitleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaUser className="inline mr-2" /> About Me
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Turning <span className="text-cyan-300">Ideas</span> into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
                Digital Reality
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I'm a passionate full-stack developer with expertise in building modern web applications that deliver exceptional user experiences and solve real-world problems.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button 
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center px-6 py-3 mt-6 bg-white text-blue-700 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
              >
                <FaDownload className="mr-2" />
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </header>

      {/* Profile Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Profile Image */}
            <motion.div 
              className="flex justify-center lg:justify-end order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div 
                  className="w-64 md:w-80 h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl md:text-6xl font-bold">
                      {user?.name?.charAt(0) || 'T'}
                    </div>
                  )}
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-white font-bold text-sm md:text-base">✓</span>
                </motion.div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute top-8 -right-8 w-6 h-6 bg-pink-400 rounded-full opacity-60 animate-bounce"></div>
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Hi, I'm {user?.name || 'Tsegaye Kebede'}
                </motion.h2>
                <motion.p 
                  className="text-lg md:text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  A passionate full-stack developer dedicated to creating innovative web solutions. 
                  I specialize in modern JavaScript frameworks and have a strong foundation in both 
                  frontend and backend technologies.
                </motion.p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <span className="mr-2">📍</span> Location
                  </h3>
                  <p className="text-blue-600 font-medium">{user?.location || 'Addis Ababa, Ethiopia'}</p>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                    <span className="mr-2">💼</span> Experience
                  </h3>
                  <p className="text-green-600 font-medium">3+ Years</p>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 md:p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <span className="mr-2">📧</span> Email
                  </h3>
                  <p className="text-purple-600 font-medium text-sm md:text-base">{user?.email || 'tdrag301@gmail.com'}</p>
                </motion.div>
                <motion.div 
                  className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                    <span className="mr-2">📱</span> Phone
                  </h3>
                  <p className="text-orange-600 font-medium">{user?.phone || '+251925480393'}</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.button 
                  onClick={() => setShowResumeModal(true)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="mr-2" />
                  Download Resume
                </motion.button>
                <motion.a 
                  href="/contact"
                  className="flex-1 bg-white text-gray-700 border-2 border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaUsers className="mr-2" />
                  Contact Me
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-block mb-4 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full text-blue-700 text-sm font-medium border border-blue-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaLaptopCode className="inline mr-2" /> Services
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">What I Do</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I specialize in creating modern, responsive web applications using cutting-edge technologies and best practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="text-3xl md:text-4xl mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{service.description}</p>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              I specialize in full-stack web development using the MERN stack, creating modern and responsive applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-block mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-2 rounded-full text-blue-700 text-sm font-medium border border-blue-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaGraduationCap className="inline mr-2" /> Education
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">Education</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              My academic journey and qualifications that shaped my expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="flex items-center mb-8">
                <FaGraduationCap className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              <div className="max-w-4xl mx-auto">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl mb-6 last:mb-0 border border-white/50 hover:border-blue-200 transition-all duration-500 relative overflow-hidden"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.01 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-start mb-4 md:mb-0">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          <FaGraduationCap className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{edu.degree}</h3>
                          <p className="text-gray-600 font-medium">{edu.institution}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 self-start md:self-center">
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-0 md:pl-16">{edu.description}</p>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center mb-8">
                <FaBriefcase className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-2xl font-bold">Experience</h3>
              </div>
              <div className="max-w-4xl mx-auto">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl mb-6 last:mb-0 relative border border-gray-100 hover:border-gray-200 transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.01 }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-500 to-slate-600 rounded-l-2xl group-hover:w-2 transition-all duration-300"></div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-start mb-4 md:mb-0">
                        <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          <FaBriefcase className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-gray-700 transition-colors duration-300">{exp.position}</h3>
                          <p className="text-gray-600 font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 self-start md:self-center">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-0 md:pl-16">{exp.description}</p>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-gray-50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-block mb-4 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 rounded-full text-purple-700 text-sm font-medium border border-purple-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaUsers className="inline mr-2" /> Interests
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">Interests & Hobbies</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Things I enjoy doing in my free time that keep me inspired and balanced
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-white/50 hover:border-purple-200 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{interest.icon}</div>
                <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">{interest.name}</h3>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-purple-50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {showResumeModal && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowResumeModal(false)}
        >
          <motion.div 
            className="bg-white/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 md:p-8 relative shadow-2xl border border-white/20"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <FaTimes size={18} />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Download Resume</h3>
              <p className="text-gray-600 leading-relaxed">Choose your preferred format to download my professional resume.</p>
            </div>
            
            <div className="space-y-3">
              <motion.a 
                href="/tsegaye_kebede_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDownload className="mr-2" /> View & Print PDF Resume
              </motion.a>
              
              <motion.a 
                href="/tsegaye_kebede_resume.pdf"
                download="Tsegaye_Kebede_Resume.pdf"
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-xl flex items-center justify-center font-medium hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDownload className="mr-2" /> Download PDF Resume
              </motion.a>
              
              <p className="text-sm text-gray-500 text-center mt-4 leading-relaxed">
                The PDF version opens in a new tab where you can view, print, or save it to your device.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// Sample data for the about page
const services = [
  {
    title: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces using React.js, HTML, CSS, and JavaScript.',
    icon: '💻'
  },
  {
    title: 'Backend Development',
    description: 'Building robust server-side applications with Node.js, Express.js, and MongoDB.',
    icon: '🖥️'
  },
  {
    title: 'Full Stack Development',
    description: 'End-to-end application development using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
    icon: '🔄'
  },
  {
    title: 'API Development',
    description: 'Designing and implementing RESTful APIs for seamless client-server communication.',
    icon: '🔌'
  },
  {
    title: 'Database Design',
    description: 'Creating efficient database schemas and implementing data models for optimal performance.',
    icon: '🗄️'
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive user interfaces and experiences that enhance user satisfaction.',
    icon: '🎨'
  }
];

const education = [
  {
    period: '2021 - 2025',
    degree: 'BSc in Software Engineering',
    institution: 'School of computing | Dire Dawa University',
    description: 'GPA: 3.59 / 4.0 | Exit Exam Score: 74/100'
  }
];

const experience = [
  {
    period: 'During University Studies',
    position: 'Intern & Student Developer',
    company: 'Academic & Internship Projects',
    description: 'Gained hands-on experience building real-world applications, analyzing user needs, and turning requirements into working solutions. I learned to design, develop, and document full-stack systems, collaborate with teams, and communicate technical concepts clearly. This practical background has prepared me to contribute effectively to roles in both technical development and operational support. I also used Agile methods, version control tools like Git, and practiced teamwork, adaptability, and thorough documentation.'
  },
  {
    period: 'Final Year Project',
    position: 'Instructor load Tracking Management System (LTMS)',
    company: 'Dire Dawa University',
    description: 'Automated academic load tracking and approvals with a MERN stack app.'
  },
  {
    period: 'Personal Project',
    position: 'Personal Portfolio Website',
    company: 'Self-Developed',
    description: 'Designed and deployed a responsive website showcasing projects, skills, and contact information.'
  }
];

const interests = [
  { name: 'Reading', icon: '📚' },
  { name: 'Traveling', icon: '✈️' },
  { name: 'Photography', icon: '📷' },
  { name: 'Music', icon: '🎵' },
  { name: 'Hiking', icon: '🥾' },
  { name: 'Chess', icon: '♟️' },
  { name: 'Cooking', icon: '🍳' },
  { name: 'Technology', icon: '💻' }
];

export default About;
