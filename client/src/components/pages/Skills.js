import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaStar, FaArrowRight, FaGraduationCap } from 'react-icons/fa';
import axios from 'axios';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // In a real app, you would fetch from your API
        // const res = await axios.get('/api/skills');
        // setSkills(res.data);
        
        // For now, we'll use sample data
        setSkills(sampleSkills);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skills');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filterSkills = (category) => {
    setActiveCategory(category);
  };

  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return skills;
    }
    return skills.filter(skill => skill.category === activeCategory);
  };

  const getCategories = () => {
    const categories = skills.map(skill => skill.category);
    return ['all', ...new Set(categories)];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-medium">Loading skills...</p>
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
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
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
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Skills Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <FaGraduationCap className="text-blue-400" />
              <span className="text-blue-100 font-medium">Technical Expertise</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                My Technical
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A comprehensive showcase of my technical proficiencies, 
              <span className="text-white font-semibold"> from frontend frameworks to backend technologies</span>
            </motion.p>
            
            {/* Scroll Indicator */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="text-blue-200 text-sm font-medium">Explore My Skills</span>
              <motion.div
                className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-blue-300 rounded-full mt-2"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modern Skills Categories */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skill Categories
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Filter and explore my technical skills by category
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {getCategories().map((category, index) => {
              const getCategoryIcon = (cat) => {
                switch(cat) {
                  case 'frontend': return <FaCode />;
                  case 'backend': return <FaServer />;
                  case 'database': return <FaDatabase />;
                  case 'tools': return <FaTools />;
                  default: return <FaStar />;
                }
              };
              
              return (
                <motion.button 
                  key={index}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl ${
                    activeCategory === category 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/25' 
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200/50 hover:border-blue-200'
                  }`}
                  onClick={() => filterSkills(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={`text-lg ${
                    activeCategory === category ? 'text-white' : 'text-blue-500'
                  }`}>
                    {getCategoryIcon(category)}
                  </span>
                  <span className="capitalize">
                    {category === 'all' ? 'All Skills' : category}
                  </span>
                  
                  {/* Active indicator */}
                  {activeCategory === category && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full"
                      layoutId="activeCategory"
                      style={{ x: '-50%' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Modern Skills Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {getFilteredSkills().map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${activeCategory}`}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-blue-200/50 overflow-hidden"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Skill Header */}
                  <div className="relative z-10 flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="text-4xl lg:text-5xl p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill.name}
                        </motion.h3>
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full capitalize mt-1">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill Description */}
                  <motion.p 
                    className="text-gray-600 mb-6 leading-relaxed text-sm lg:text-base"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {skill.description}
                  </motion.p>
                  
                  {/* Proficiency Section */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">Proficiency Level</span>
                      <motion.span 
                        className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.8, type: "spring" }}
                      >
                        {skill.proficiency}%
                      </motion.span>
                    </div>
                    
                    {/* Modern Progress Bar */}
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ 
                          width: `${skill.proficiency}%`, 
                          opacity: 1
                        }}
                        transition={{ 
                          duration: 1.2, 
                          delay: index * 0.1 + 0.6,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1 + 1.5,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    
                    {/* Skill Level Indicator */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(skill.proficiency / 20) 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                                : 'bg-gray-300'
                            }`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                              delay: index * 0.1 + 1.2 + i * 0.1,
                              type: "spring"
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {skill.proficiency >= 90 ? 'Expert' : 
                         skill.proficiency >= 75 ? 'Advanced' : 
                         skill.proficiency >= 60 ? 'Intermediate' : 'Beginner'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modern Other Skills & Tools */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-700 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tools & Technologies
              </span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <p className="max-w-3xl mx-auto text-gray-600 text-lg lg:text-xl leading-relaxed">
              Additional technologies, frameworks, and development tools that enhance my workflow and capabilities.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {otherSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-blue-200/50 overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  rotateY: 5
                }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                {/* Icon Container */}
                <motion.div 
                  className="relative z-10 text-3xl lg:text-4xl mb-3 p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300 mx-auto w-fit"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {skill.icon}
                </motion.div>
                
                {/* Skill Name */}
                <motion.h3 
                  className="relative z-10 font-semibold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-sm lg:text-base"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.h3>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Soft Skills */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Animated particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Professional Skills
              </span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <p className="max-w-3xl mx-auto text-blue-100 text-lg lg:text-xl leading-relaxed">
              Essential interpersonal and professional attributes that enable effective collaboration and leadership.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/30 overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* Gradient Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                {/* Icon Container */}
                <motion.div 
                  className="relative z-10 text-4xl lg:text-5xl mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-300 w-fit"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {skill.icon}
                </motion.div>
                
                {/* Skill Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className="text-xl lg:text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.h3>
                  <motion.p 
                    className="text-blue-100 leading-relaxed text-sm lg:text-base group-hover:text-white transition-colors duration-300"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {skill.description}
                  </motion.p>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            className="text-center mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Let's Work Together</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.div>
              
              {/* Button Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Sample data for the skills page
const sampleSkills = [
  {
    name: 'JavaScript',
    category: 'frontend',
    description: 'Proficient in modern JavaScript (ES6+) with strong knowledge of DOM manipulation and asynchronous programming.',
    icon: '🟨',
    proficiency: 90
  },
  {
    name: 'React.js',
    category: 'frontend',
    description: 'Experienced in building single-page applications with React, including state management with Redux and Context API.',
    icon: '⚛️',
    proficiency: 85
  },
  {
    name: 'HTML5',
    category: 'frontend',
    description: 'Expert knowledge of semantic HTML and accessibility best practices for building well-structured web pages.',
    icon: '🌐',
    proficiency: 95
  },
  {
    name: 'CSS3',
    category: 'frontend',
    description: 'Strong skills in CSS, including Flexbox, Grid, animations, and responsive design principles.',
    icon: '🎨',
    proficiency: 90
  },
  {
    name: 'Node.js',
    category: 'backend',
    description: 'Experienced in server-side JavaScript using Node.js for building scalable and efficient web applications.',
    icon: '🟢',
    proficiency: 80
  },
  {
    name: 'Express.js',
    category: 'backend',
    description: 'Proficient in creating RESTful APIs and web servers using Express.js framework.',
    icon: '⚡',
    proficiency: 85
  },
  {
    name: 'MongoDB',
    category: 'database',
    description: 'Skilled in designing and implementing MongoDB databases, including data modeling and aggregation pipelines.',
    icon: '🍃',
    proficiency: 80
  },
  {
    name: 'Mongoose',
    category: 'database',
    description: 'Experienced in using Mongoose ODM for MongoDB and Node.js, including schema validation and middleware.',
    icon: '📊',
    proficiency: 85
  },
  {
    name: 'RESTful APIs',
    category: 'backend',
    description: 'Strong understanding of RESTful architecture and best practices for API design and implementation.',
    icon: '🔄',
    proficiency: 85
  },
  {
    name: 'Redux',
    category: 'frontend',
    description: 'Proficient in state management with Redux, including Redux Toolkit for modern Redux applications.',
    icon: '🔄',
    proficiency: 75
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    description: 'Experienced in using Tailwind CSS for rapid UI development with utility-first approach.',
    icon: '🌊',
    proficiency: 85
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    description: 'Proficient in version control with Git and collaborative development using GitHub.',
    icon: '🔄',
    proficiency: 90
  }
];

const otherSkills = [
  { name: 'Webpack', icon: '📦' },
  { name: 'Babel', icon: '🔄' },
  { name: 'npm', icon: '📦' },
  { name: 'Jest', icon: '🧪' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Postman', icon: '📬' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Heroku', icon: '☁️' },
  { name: 'Netlify', icon: '🌐' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'SASS', icon: '💅' },
  { name: 'Bootstrap', icon: '🅱️' },
  { name: 'Material UI', icon: '🎨' },
  { name: 'Figma', icon: '🖌️' }
];

const softSkills = [
  {
    name: 'Problem Solving',
    description: 'Analytical thinker with strong problem-solving abilities to tackle complex technical challenges.',
    icon: '🧩'
  },
  {
    name: 'Communication',
    description: 'Excellent verbal and written communication skills for effective collaboration with team members and clients.',
    icon: '💬'
  },
  {
    name: 'Teamwork',
    description: 'Collaborative team player who works effectively in cross-functional environments.',
    icon: '👥'
  },
  {
    name: 'Time Management',
    description: 'Efficient at prioritizing tasks and meeting deadlines in fast-paced development environments.',
    icon: '⏱️'
  },
  {
    name: 'Adaptability',
    description: 'Quick learner who adapts to new technologies and changing project requirements.',
    icon: '🔄'
  },
  {
    name: 'Attention to Detail',
    description: 'Meticulous approach to code quality, testing, and user experience considerations.',
    icon: '🔍'
  }
];

export default Skills;
