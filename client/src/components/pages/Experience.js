import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaArrowRight, FaBuilding, FaClock, FaCode, FaUsers, FaChartLine } from 'react-icons/fa';
import axios from 'axios';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // In a real app, you would fetch from your API
        // const res = await axios.get('/api/experiences');
        // setExperiences(res.data);
        
        // For now, we'll use sample data
        setExperiences(sampleExperiences);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch experiences');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Loading experiences...</p>
        </motion.div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-medium">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-purple-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
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
            {/* Experience Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaBriefcase className="text-purple-400" />
              <span className="text-purple-100 font-medium">Professional Journey</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Work Experience
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 bg-clip-text text-transparent">
                & Career Journey
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Explore my journey from 
              <span className="text-white font-semibold">recent graduate to emerging developer</span> through hands-on experience and continuous learning
            </p>
            
            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-300 mb-2">{experiences.length}+</div>
                <div className="text-purple-100 text-sm">Positions Held</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-300 mb-2">2025</div>
                <div className="text-blue-100 text-sm">Graduate Year</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-pink-300 mb-2">15+</div>
                <div className="text-pink-100 text-sm">Projects Built</div>
              </div>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-purple-200 text-sm font-medium">Explore My Journey</span>
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

      {/* Modern Experience Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FaClock className="text-white" />
              <span className="font-medium">Career Timeline</span>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6 rounded-full" />
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From academic projects to professional internships, discover how I've built my foundation in software development.
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Enhanced Vertical Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-blue-600 to-indigo-600 rounded-full shadow-lg"></div>
              
              {/* Experience Items */}
              <AnimatePresence>
                {experiences.map((experience, index) => (
                  <motion.div 
                    key={index}
                    className={`relative flex flex-col lg:flex-row mb-16 lg:mb-20 ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    viewport={{ once: true }}
                  >
                    {/* Enhanced Timeline Dot */}
                    <motion.div 
                      className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 border-4 border-white shadow-xl z-20 flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaBriefcase className="text-white text-xs" />
                    </motion.div>
                    
                    {/* Content Card */}
                    <motion.div 
                      className={`w-full lg:w-1/2 ml-20 lg:ml-0 ${
                        index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                      }`}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                        {/* Card Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Current Position Badge */}
                        {experience.current && (
                          <motion.div
                            className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Current
                          </motion.div>
                        )}
                        
                        <div className="relative z-10">
                          {/* Date Range */}
                          <motion.div 
                            className={`flex items-center mb-4 text-purple-600 font-medium ${
                              index % 2 === 0 ? 'lg:justify-end' : 'justify-start'
                            }`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <FaCalendarAlt className={`${index % 2 === 0 ? 'lg:order-2 lg:ml-2 mr-2 lg:mr-0' : 'mr-2'}`} />
                            <span className="text-sm bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                              {formatDate(experience.from)} - {experience.current ? 'Present' : formatDate(experience.to)}
                            </span>
                          </motion.div>
                          
                          {/* Job Title */}
                          <motion.h3 
                            className={`text-2xl lg:text-3xl font-bold mb-3 text-gray-900 group-hover:text-purple-800 transition-colors duration-300 ${
                              index % 2 === 0 ? 'lg:text-right' : 'text-left'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            {experience.title}
                          </motion.h3>
                          
                          {/* Company */}
                          <motion.div 
                            className={`flex items-center mb-4 text-gray-700 font-medium ${
                              index % 2 === 0 ? 'lg:justify-end' : 'justify-start'
                            }`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <FaBuilding className={`${index % 2 === 0 ? 'lg:order-2 lg:ml-2 mr-2 lg:mr-0' : 'mr-2'} text-blue-600`} />
                            <span className="text-lg">{experience.company}</span>
                          </motion.div>
                          
                          {/* Location */}
                          <motion.div 
                            className={`flex items-center mb-6 text-gray-600 ${
                              index % 2 === 0 ? 'lg:justify-end' : 'justify-start'
                            }`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <FaMapMarkerAlt className={`${index % 2 === 0 ? 'lg:order-2 lg:ml-2 mr-2 lg:mr-0' : 'mr-2'} text-red-500`} />
                            <span>{experience.location}</span>
                          </motion.div>
                          
                          {/* Description */}
                          <motion.p 
                            className={`text-gray-700 leading-relaxed text-lg ${
                              index % 2 === 0 ? 'lg:text-right' : 'text-left'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            {experience.description}
                          </motion.p>
                        </div>
                        
                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-300/50 transition-all duration-500" />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Skills Gained Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FaChartLine className="text-purple-400" />
              <span className="text-purple-100 font-medium">Professional Growth</span>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Skills Gained Through
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-8 rounded-full" />
            
            <p className="text-xl sm:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Essential skills and competencies I've developed as a 
              <span className="text-white font-semibold">recent graduate entering the tech industry</span>
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {skillsGained.map((skill, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Skill Icon */}
                  <motion.div
                    className="text-6xl mb-6 text-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="filter drop-shadow-lg">{skill.icon}</span>
                  </motion.div>
                  
                  {/* Skill Name */}
                  <motion.h3 
                    className="text-2xl font-bold mb-4 text-center group-hover:text-purple-200 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {skill.name}
                  </motion.h3>
                  
                  {/* Skill Description */}
                  <motion.p 
                    className="text-purple-100 leading-relaxed text-center group-hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {skill.description}
                  </motion.p>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/30 transition-all duration-500" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let's Work Together</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Experience data reflecting recent graduation and early career journey
const sampleExperiences = [
  {
    title: 'Junior Full Stack Developer',
    company: 'TechStart Solutions',
    location: 'Addis Ababa, Ethiopia',
    from: '2025-03-01',
    to: null,
    current: true,
    description: 'Recently started my professional journey as a Junior Full Stack Developer, working with React.js, Node.js, and MongoDB. Contributing to team projects while continuing to learn and grow. Building responsive web applications and collaborating with senior developers to deliver quality solutions. Actively participating in code reviews and agile development processes.'
  },
  {
    title: 'Software Development Intern',
    company: 'InnovateTech Hub',
    location: 'Addis Ababa, Ethiopia',
    from: '2024-09-01',
    to: '2025-02-28',
    current: false,
    description: 'Completed a 6-month internship during my final year of studies, gaining hands-on experience in full-stack development. Worked on real client projects using React, Express.js, and PostgreSQL. Participated in daily standups, sprint planning, and code reviews. Developed strong problem-solving skills and learned industry best practices for software development.'
  },
  {
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Addis Ababa, Ethiopia',
    from: '2024-01-01',
    to: '2024-08-31',
    current: false,
    description: 'Took on freelance projects while completing my degree, building websites and web applications for local businesses and startups. Developed proficiency in modern web technologies including React, Tailwind CSS, and Firebase. Managed client relationships, project timelines, and delivered solutions that met business requirements while gaining valuable real-world experience.'
  },
  {
    title: 'Software Engineering Student',
    company: 'University',
    location: 'Addis Ababa, Ethiopia',
    from: '2021-09-01',
    to: '2025-06-30',
    current: false,
    description: 'Completed Bachelor\'s degree in Software Engineering with focus on full-stack development, software architecture, and system design. Built numerous academic projects including a portfolio website, e-commerce platform, and task management system. Participated in coding competitions, hackathons, and tech meetups. Developed strong foundation in software engineering principles, design patterns, and modern development methodologies.'
  }
];

const skillsGained = [
  {
    name: 'Rapid Learning',
    description: 'Ability to quickly adapt to new technologies and frameworks, essential for staying current in the fast-evolving tech industry.',
    icon: '🚀'
  },
  {
    name: 'Problem Solving',
    description: 'Strong analytical thinking and debugging skills developed through academic projects and real-world challenges.',
    icon: '🧩'
  },
  {
    name: 'Team Collaboration',
    description: 'Experience working in team environments during internships and group projects, using tools like Git and Slack.',
    icon: '👥'
  },
  {
    name: 'Full Stack Development',
    description: 'Hands-on experience with both frontend and backend technologies, from React to Node.js and databases.',
    icon: '💻'
  },
  {
    name: 'Client Relations',
    description: 'Developed communication skills through freelance work, learning to understand requirements and deliver solutions.',
    icon: '🤝'
  },
  {
    name: 'Continuous Learning',
    description: 'Commitment to staying updated with latest technologies and best practices through courses and self-study.',
    icon: '📚'
  }
];

export default Experience;
