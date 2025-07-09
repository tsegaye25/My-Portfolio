import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaTimes, FaCode, FaStar, FaCodeBranch } from 'react-icons/fa';
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
    <div className="pt-16">
      {/* Projects Header */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-400 blur-3xl"></div>
          <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-purple-400 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block mb-4 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaCode className="inline mr-2" /> My Work
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">My Projects</span>
            </h1>
            
            <p className="text-xl max-w-3xl mx-auto text-indigo-100 leading-relaxed">
              Explore my portfolio of web development projects built with the MERN stack and other modern technologies.
            </p>
          </motion.div>
        </div>
        
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Projects Filter and Search */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center mb-6 md:mb-0">
              <button 
                className={`px-4 py-2 mx-2 rounded-full transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
                onClick={() => handleFilterClick('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 mx-2 rounded-full transition-all ${
                  activeFilter === 'web' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
                onClick={() => handleFilterClick('web')}
              >
                Web Apps
              </button>
              <button 
                className={`px-4 py-2 mx-2 rounded-full transition-all ${
                  activeFilter === 'mobile' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
                onClick={() => handleFilterClick('mobile')}
              >
                Mobile Apps
              </button>
              <button 
                className={`px-4 py-2 mx-2 rounded-full transition-all ${
                  activeFilter === 'api' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
                onClick={() => handleFilterClick('api')}
              >
                APIs
              </button>
            </div>
            
            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-3 text-indigo-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <FaTimes className="text-red-500 text-4xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700">No projects found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {filteredProjects.map((project, index) => {
                  // Don't create hooks inside the map function
                  // Instead, we'll use animation variants without the need for individual refs
                  return (
                    <motion.div
                      key={index}
                      className="group perspective"
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div 
                        className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu preserve-3d"
                        style={{ 
                          transformStyle: "preserve-3d",
                          boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                        }}
                        whileHover={{
                          rotateY: 5,
                          rotateX: 5
                        }}
                      >
                        <div className="relative overflow-hidden">
                          <img 
                            src={project.image || '/logo192.png'} 
                            alt={project.title} 
                            className="w-full h-64 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                            <div className="flex space-x-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white text-blue-700 p-3 rounded-full hover:bg-blue-50 transition-colors transform hover:scale-110 shadow-lg"
                                aria-label="View GitHub Repository"
                              >
                                <FaGithub size={20} />
                              </a>
                              {project.live && (
                                <a 
                                  href={project.live} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-110 shadow-lg"
                                  aria-label="View Live Project"
                                >
                                  <FaExternalLinkAlt size={20} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* GitHub stats */}
                          <div className="flex items-center mt-4 text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <FaStar className="mr-1 text-yellow-500" />
                              <span>{project.stars || 0}</span>
                            </div>
                            <div className="flex items-center">
                              <FaCodeBranch className="mr-1 text-blue-500" />
                              <span>{project.forks || 0}</span>
                            </div>
                            <div className="text-xs">
                              Updated: {project.updated ? new Date(project.updated).toLocaleDateString() : 'N/A'}
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
          
          {/* Load more button */}
          {filteredProjects.length > 0 && (
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Load More Projects
              </button>
            </motion.div>
          )}
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
