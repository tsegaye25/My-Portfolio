import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaTimes, FaStar, FaCodeBranch, FaArrowRight } from 'react-icons/fa';
import { fetchGitHubRepositories } from '../../services/GitHubService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch repositories from GitHub API using our service
        const githubProjects = await fetchGitHubRepositories();
        
        setProjects(githubProjects);
        setFilteredProjects(githubProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub projects:', err);
        
        // If API fails, try to use cached data even if it's old
        const cachedProjects = localStorage.getItem('githubProjects');
        if (cachedProjects) {
          setProjects(JSON.parse(cachedProjects));
          setFilteredProjects(JSON.parse(cachedProjects));
          setError('Using cached projects. Failed to fetch latest projects from GitHub.');
        } else {
          // Fall back to sample data if no cache is available
          setProjects(sampleProjects);
          setFilteredProjects(sampleProjects);
          setError('Failed to fetch projects from GitHub. Showing sample projects instead.');
        }
        
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects(activeFilter, searchTerm);
  }, [activeFilter, searchTerm]);

  const filterProjects = (category, term) => {
    let filtered = [...projects];
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(project => 
        project.categories.includes(category)
      );
    }
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term.toLowerCase()) || 
        project.description.toLowerCase().includes(term.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    
    setFilteredProjects(filtered);
  };

  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading projects...</div>;
  if (error) return <div className="container mx-auto px-4 py-20 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Projects Header */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-16 sm:pt-20 md:pt-0">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 -right-32 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-3xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-indigo-400/20 to-blue-400/20 blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block mb-6 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-sm sm:text-base font-medium border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              🚀 Portfolio Projects
            </motion.span>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                My Creative
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-blue-100/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explore my collection of projects showcasing modern web development, innovative solutions, and creative problem-solving.
            </motion.p>
            
            {/* Enhanced Search and Filter Section */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Enhanced Search Bar */}
              <div className="relative mb-6 sm:mb-8">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg" />
                <input
                  type="text"
                  placeholder="Search projects by name, tech, or description..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl py-4 sm:py-5 pl-12 pr-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all text-sm sm:text-base"
                />
                {searchTerm && (
                  <motion.button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes className="text-lg" />
                  </motion.button>
                )}
              </div>
              
              {/* Enhanced Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  { key: 'all', label: 'All Projects', icon: '🎯' },
                  { key: 'web', label: 'Web Apps', icon: '🌐' },
                  { key: 'mobile', label: 'Mobile', icon: '📱' },
                  { key: 'api', label: 'APIs', icon: '⚡' }
                ].map((category) => (
                  <motion.button
                    key={category.key}
                    onClick={() => handleFilterClick(category.key)}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all text-sm sm:text-base flex items-center gap-2 ${
                      activeFilter === category.key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base sm:text-lg">{category.icon}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.key.charAt(0).toUpperCase() + category.key.slice(1)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced Scroll indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 flex flex-col items-center cursor-pointer hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Explore Projects</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl" />
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-full blur-xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div 
                className="text-center py-16 sm:py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FaTimes className="text-white text-2xl sm:text-3xl" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">No projects found</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto">Try adjusting your search or filter criteria to discover more projects</p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {filteredProjects.map((project, index) => {
                  return (
                    <motion.div
                      key={project.id || index}
                      className="group h-full"
                      variants={{
                        hidden: { opacity: 0, y: 60, scale: 0.8 },
                        show: { 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: { 
                            duration: 0.6,
                            ease: "easeOut",
                            delay: index * 0.1
                          } 
                        }
                      }}
                    >
                      {/* Modern Project Card */}
                      <motion.div 
                        className="relative h-full bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/40 transition-all duration-500 hover:shadow-3xl hover:shadow-blue-500/20 flex flex-col"
                        whileHover={{ 
                          y: -12,
                          scale: 1.03,
                          rotateY: 5,
                          transition: { duration: 0.4, ease: "easeOut" }
                        }}
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 50%, rgba(239,246,255,0.85) 100%)",
                          backdropFilter: "blur(20px)",
                          borderImage: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3)) 1"
                        }}
                      >
                        {/* Enhanced Project Image with Modern Overlay */}
                        <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent z-10" />
                          
                          {/* Project Image */}
                          <img 
                            src={project.image || '/logo192.png'} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = '/logo192.png';
                            }}
                          />
                          
                          {/* Modern Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end justify-between p-6">
                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              {project.github && (
                                <motion.a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white/30 transition-all shadow-xl border border-white/20"
                                  whileHover={{ scale: 1.15, y: -3 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaGithub className="text-lg" />
                                </motion.a>
                              )}
                              {(project.demo || project.live) && (
                                <motion.a
                                  href={project.demo || project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md text-white p-3 rounded-2xl hover:from-blue-600/90 hover:to-purple-600/90 transition-all shadow-xl border border-white/20"
                                  whileHover={{ scale: 1.15, y: -3 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaExternalLinkAlt className="text-lg" />
                                </motion.a>
                              )}
                            </div>
                            
                            {/* GitHub Stats */}
                            {(project.stars > 0 || project.forks > 0) && (
                              <div className="flex items-center gap-4 text-white/90">
                                {project.stars > 0 && (
                                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                    <FaStar className="text-yellow-400 text-sm" />
                                    <span className="text-sm font-medium">{project.stars}</span>
                                  </div>
                                )}
                                {project.forks > 0 && (
                                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                    <FaCodeBranch className="text-blue-400 text-sm" />
                                    <span className="text-sm font-medium">{project.forks}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Category Badge */}
                          {project.categories && project.categories.length > 0 && (
                            <div className="absolute top-4 left-4 z-30">
                              <motion.span 
                                className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold border border-white/30 shadow-lg"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                              >
                                {project.categories[0].charAt(0).toUpperCase() + project.categories[0].slice(1)}
                              </motion.span>
                            </div>
                          )}
                        </div>
                        
                        {/* Modern Project Content */}
                        <div className="p-6 sm:p-8 flex flex-col flex-grow">
                          {/* Project Header */}
                          <div className="mb-6">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                                {project.title || 'Untitled Project'}
                              </h3>
                              {project.updated && (
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap ml-3">
                                  {new Date(project.updated).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg line-clamp-3">
                              {project.description || 'No description available for this project.'}
                            </p>
                          </div>
                          
                          {/* Enhanced Tech Stack */}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                                  Tech Stack
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.filter(tech => tech).map((tech, techIndex) => (
                                  <motion.span 
                                    key={techIndex}
                                    className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 text-blue-700 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border border-blue-200/50 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                    whileHover={{ scale: 1.08, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: techIndex * 0.1 }}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Project Stats */}
                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-6">
                              {project.stars > 0 && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FaStar className="text-yellow-500 text-lg" />
                                  <span className="font-semibold">{project.stars}</span>
                                  <span className="text-xs text-gray-400">stars</span>
                                </div>
                              )}
                              {project.forks > 0 && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FaCodeBranch className="text-blue-500 text-lg" />
                                  <span className="font-semibold">{project.forks}</span>
                                  <span className="text-xs text-gray-400">forks</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Quick Action Buttons */}
                            <div className="flex gap-3">
                              {project.github && (
                                <motion.a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gray-800 text-white p-3 rounded-2xl hover:bg-gray-700 transition-all shadow-lg hover:shadow-xl"
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  whileTap={{ scale: 0.9 }}
                                  title="View Source Code"
                                >
                                  <FaGithub className="text-lg" />
                                </motion.a>
                              )}
                              {(project.demo || project.live) && (
                                <motion.a
                                  href={project.demo || project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                                  whileHover={{ scale: 1.1, y: -2 }}
                                  whileTap={{ scale: 0.9 }}
                                  title="View Live Demo"
                                >
                                  <FaExternalLinkAlt className="text-lg" />
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Enhanced Load more button */}
          {filteredProjects.length > 0 && (
            <motion.div 
              className="text-center mt-12 sm:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Load More Projects</span>
                <FaArrowRight className="text-lg" />
              </motion.button>
              <p className="text-gray-500 text-sm mt-4">
                Showing {filteredProjects.length} projects
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Enhanced Footer CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Let's Build Something
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life with modern web technologies.
            </p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get In Touch</span>
                <FaArrowRight />
              </motion.a>
              <motion.a
                href="https://github.com/tsegaye25"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-xl" />
                <span>View GitHub</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Sample data for the projects page - used as fallback if GitHub API fails
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com',
    categories: ['web', 'api']
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com',
    categories: ['web']
  },
  {
    title: 'Blog Platform',
    description: 'A content management system for creating and managing blog posts with user authentication.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com',
    categories: ['web']
  },
  {
    title: 'Weather Application',
    description: 'A weather forecast application that provides real-time weather information based on location.',
    image: '/logo192.png',
    technologies: ['React Native', 'Node.js', 'Express', 'Weather API'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com',
    categories: ['mobile', 'api']
  },
  {
    title: 'Social Media API',
    description: 'A RESTful API for a social media platform with features like user authentication, posts, comments, and likes.',
    image: '/logo192.png',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com',
    categories: ['api']
  },
  {
    title: 'Real Estate Marketplace',
    description: 'A platform for buying, selling, and renting properties with advanced search and filtering options.',
    image: '/logo192.png',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
    github: 'https://github.com/tsegaye25',
    live: 'https://example.com',
    categories: ['web', 'api']
  }
];

export default Projects;
