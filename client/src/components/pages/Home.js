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
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700"
        onMouseMove={handleMouseMove}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient overlays for depth */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
          
          {/* Animated particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full parallax-element ${i % 3 === 0 ? 'bg-indigo-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-blue-300'} bg-opacity-20`}
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(8px)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.2 + (Math.random() * 0.3), 
                scale: 0.8 + (Math.random() * 0.5),
                y: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1), 0]
              }}
              transition={{ 
                duration: 5 + (Math.random() * 10), 
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="hero-content text-white max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-4">
                <div className="relative inline-block mb-4">
                  <span className="absolute -top-6 -left-6 text-4xl opacity-20 hidden md:block">💻</span>
                  <h2 className="text-xl md:text-2xl font-medium text-indigo-200 relative z-10">
                    <span className="bg-indigo-500/30 px-3 py-1 rounded-lg">Hello, I'm</span>
                  </h2>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 drop-shadow-lg">
                    Tsegaye Kebede Bade
                  </span>
                </h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                  <div className="hidden md:block h-1 w-10 bg-indigo-300"></div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-100 px-4 py-2 rounded-lg bg-indigo-500/20 backdrop-blur-sm">
                    <span className="typing-text">MERN Stack Developer</span>
                  </h3>
                  <div className="hidden md:block h-1 w-10 bg-indigo-300"></div>
                </div>
              </div>
              <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">
                I create modern web applications with MongoDB, Express, React, and Node.js. Passionate about building intuitive and performant user experiences.  
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/projects" 
                  className="relative overflow-hidden group bg-white text-indigo-700 hover:text-indigo-800 transition-all font-medium px-8 py-3 rounded-full flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">View My Work <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
                <Link 
                  to="/contact" 
                  className="relative overflow-hidden group bg-transparent backdrop-blur-sm border-2 border-white text-white transition-all font-medium px-8 py-3 rounded-full flex items-center transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                </Link>
              </div>
              <div className="mt-10 flex gap-6">
                <a href="https://github.com/tsegaye25" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-all transform hover:-translate-y-1">
                  <FaGithub size={28} />
                </a>
                <a href="https://www.linkedin.com/in/tsegaye-kebede-bb7a0a311/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-all transform hover:-translate-y-1">
                  <FaLinkedin size={28} />
                </a>
                <a href="https://x.com/software34847" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition-all transform hover:-translate-y-1">
                  <FaTwitter size={28} />
                </a>
                <a href="mailto:tdrag301@gmail.com" className="text-white hover:text-blue-200 transition-all transform hover:-translate-y-1">
                  <FaEnvelope size={28} />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="mt-12 md:mt-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Tsegaye Kebede" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <FaUser size={64} className="text-blue-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
            </div>
            
            {/* Floating tech icons */}
            <motion.div 
              className="absolute -top-4 -left-4 bg-white p-3 rounded-full shadow-lg parallax-element"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <FaReact className="text-blue-500 text-2xl" />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 -right-4 bg-white p-3 rounded-full shadow-lg parallax-element"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <FaNodeJs className="text-green-600 text-2xl" />
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-lg parallax-element"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <FaDatabase className="text-blue-700 text-2xl" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ opacity }}
        >
          <span className="mb-2 text-sm">Scroll Down</span>
          <FiArrowDown size={20} />
        </motion.div>
      </section>

      {/* About Section Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              I'm a Software Engineer with expertise in MERN stack development. I'm passionate about creating 
              modern, responsive web applications that provide exceptional user experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Tsegaye Kebede" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
                />
              ) : (
                <div className="rounded-lg shadow-lg w-full aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <FaUser size={80} className="text-blue-400" />
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Software Engineer</h3>
              <p className="text-gray-600 mb-6">
                I graduated with a degree in Software Engineering and have been focusing on web development
                using the MERN stack (MongoDB, Express.js, React.js, Node.js). I enjoy solving complex problems
                and building applications that are both functional and visually appealing.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-medium">Name:</p>
                  <p className="text-gray-600">Tsegaye Kebede Bade</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-600">tdrag301@gmail.com</p>
                </div>
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-gray-600">Addis Ababa, Ethiopia</p>
                </div>
                <div>
                  <p className="font-medium">Availability:</p>
                  <p className="text-gray-600">Available for freelance & full-time</p>
                </div>
              </div>
              <Link to="/about" className="btn bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium px-6 py-3 rounded-lg inline-flex items-center">
                More About Me <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              I specialize in MERN stack development and have experience with various web technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 text-4xl mb-4">{skill.icon}</div>
                <h3 className="font-bold mb-2">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/skills" className="btn bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium px-6 py-3 rounded-lg inline-flex items-center">
              View All Skills <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Here are some of my recent projects. Check out my portfolio for more.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects" className="btn bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium px-6 py-3 rounded-lg inline-flex items-center">
              View All Projects <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section Preview */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="max-w-2xl mx-auto mb-8 text-blue-100 text-lg">
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
            </p>
            <Link to="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100 transition-colors font-medium px-8 py-3 rounded-lg inline-flex items-center">
              Get In Touch <FaArrowRight className="ml-2" />
            </Link>
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
