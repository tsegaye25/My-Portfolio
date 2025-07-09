import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaUser, FaLaptopCode, FaGraduationCap, FaAward, FaUsers, FaRocket, FaDownload, FaBriefcase, FaCode, FaTimes } from 'react-icons/fa';

const About = () => {
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
  
  // Function to generate PDF in real-time
  const generatePDF = () => {
    // Create a new window to display the PDF
    const pdfWindow = window.open('', '_blank');
    
    // HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tsegaye Kebede - Resume</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3 {
            color: #2563eb;
          }
          h1 {
            text-align: center;
            font-size: 28px;
            margin-bottom: 5px;
          }
          .contact-info {
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
            margin-bottom: 10px;
            font-size: 18px;
          }
          .job {
            margin-bottom: 15px;
          }
          .job-title {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .job-company {
            font-style: italic;
            margin-bottom: 5px;
          }
          .job-duration {
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
          }
          .skill {
            background-color: #e5e7eb;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
          }
          .project {
            margin-bottom: 15px;
          }
          .project-title {
            font-weight: bold;
            margin-bottom: 5px;
          }
          ul {
            margin-top: 5px;
            padding-left: 20px;
          }
          .print-button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          .print-button:hover {
            background-color: #1d4ed8;
          }
          @media print {
            .print-button {
              display: none;
            }
            body {
              padding: 0;
              font-size: 12px;
            }
            h1 {
              font-size: 24px;
            }
            .section-title {
              font-size: 16px;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Print Resume</button>
        
        <h1>TSEGAYE KEBEDE BADE</h1>
        <div class="contact-info">
          Full Stack Developer | tdrag301@gmail.com | +251925480393 | Addis Ababa, Ethiopia
        </div>
        
        <div class="section">
          <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
          <p>
            Passionate Full Stack Developer with 5+ years of experience building modern web applications. 
            Expertise in MERN stack (MongoDB, Express.js, React, Node.js) and creating responsive, user-friendly interfaces. 
            Strong problem-solving skills and commitment to delivering high-quality code.
          </p>
        </div>
        
        <div class="section">
          <h2 class="section-title">TECHNICAL SKILLS</h2>
          <div class="skills-list">
            <span class="skill">React.js</span>
            <span class="skill">JavaScript (ES6+)</span>
            <span class="skill">HTML5</span>
            <span class="skill">CSS3</span>
            <span class="skill">Tailwind CSS</span>
            <span class="skill">Redux</span>
            <span class="skill">Node.js</span>
            <span class="skill">Express.js</span>
            <span class="skill">MongoDB</span>
            <span class="skill">MySQL</span>
            <span class="skill">PostgreSQL</span>
            <span class="skill">Git</span>
            <span class="skill">RESTful APIs</span>
            <span class="skill">Responsive Design</span>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">WORK EXPERIENCE</h2>
          
          <div class="job">
            <div class="job-title">Senior Full Stack Developer</div>
            <div class="job-company">XYZ Tech Solutions</div>
            <div class="job-duration">2023 - Present</div>
            <ul>
              <li>Developed and maintained multiple web applications using React.js and Node.js</li>
              <li>Implemented responsive UI designs using Tailwind CSS and Material UI</li>
              <li>Created RESTful APIs for client-server communication</li>
              <li>Collaborated with cross-functional teams to deliver projects on time</li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>
          
          <div class="job">
            <div class="job-title">Full Stack Developer</div>
            <div class="job-company">ABC Web Services</div>
            <div class="job-duration">2020 - 2023</div>
            <ul>
              <li>Built and deployed full-stack web applications using the MERN stack</li>
              <li>Designed and implemented database schemas and models</li>
              <li>Integrated third-party APIs for enhanced functionality</li>
              <li>Optimized application performance and fixed bugs</li>
              <li>Participated in Agile development processes</li>
            </ul>
          </div>
          
          <div class="job">
            <div class="job-title">Junior Web Developer</div>
            <div class="job-company">Tech Innovators</div>
            <div class="job-duration">2018 - 2020</div>
            <ul>
              <li>Assisted in developing responsive websites using HTML, CSS, and JavaScript</li>
              <li>Collaborated with senior developers to implement new features</li>
              <li>Performed testing and debugging of web applications</li>
              <li>Created and maintained documentation for projects</li>
            </ul>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">EDUCATION</h2>
          <div class="job">
            <div class="job-title">Bachelor of Science in Computer Science</div>
            <div class="job-company">University of Addis Ababa</div>
            <div class="job-duration">2014 - 2018</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">PROJECTS</h2>
          
          <div class="project">
            <div class="project-title">Personal Portfolio Website</div>
            <p>A responsive portfolio website built with React.js and Tailwind CSS. Features include project showcase, contact form, and blog section.</p>
            <div>GitHub: <a href="https://github.com/tsegaye25/portfolio">https://github.com/tsegaye25/portfolio</a></div>
          </div>
          
          <div class="project">
            <div class="project-title">E-Commerce Platform</div>
            <p>Full-stack e-commerce application with user authentication and payment integration. Built using React.js, Node.js, Express, and MongoDB.</p>
            <div>GitHub: <a href="https://github.com/tsegaye25/ecommerce">https://github.com/tsegaye25/ecommerce</a></div>
          </div>
          
          <div class="project">
            <div class="project-title">Task Management App</div>
            <p>Collaborative task management application with real-time updates. Technologies: React.js, Node.js, Socket.io, MongoDB.</p>
            <div>GitHub: <a href="https://github.com/tsegaye25/taskmanager">https://github.com/tsegaye25/taskmanager</a></div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">LANGUAGES</h2>
          <ul>
            <li>English (Fluent)</li>
            <li>Amharic (Native)</li>
          </ul>
        </div>
        
        <div class="section">
          <h2 class="section-title">INTERESTS</h2>
          <p>Web Development, Open Source Contribution, New Technologies, Reading, Hiking</p>
        </div>
      </body>
      </html>
    `;
    
    // Write the HTML content to the new window
    pdfWindow.document.open();
    pdfWindow.document.write(htmlContent);
    pdfWindow.document.close();
    
    // Allow time for styles to load, then trigger print dialog
    setTimeout(() => {
      pdfWindow.focus();
    }, 300);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header Section with Parallax */}
      <header ref={ref} className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 py-32 text-white">
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ y, opacity }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-40 h-40 rounded-full bg-purple-400 opacity-10 blur-2xl"></div>
        </motion.div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            ref={titleRef}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-block mb-3 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isTitleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaUser className="inline mr-2" /> About Me
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Turning <span className="text-blue-300">Ideas</span> into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Digital Reality
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl max-w-2xl mx-auto text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I'm a passionate full-stack developer with expertise in building modern web applications that deliver exceptional user experiences.
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

      {/* Personal Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column - Image */}
            <div className="md:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full z-0"></div>
                
                {/* Main image with border */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 transition-transform hover:rotate-0 duration-500">
                  <img 
                    src="https://picsum.photos/600/600" 
                    alt="Tsegaye Kebede" 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Experience badge */}
                <motion.div 
                  className="absolute -bottom-5 -right-5 bg-blue-600 text-white text-center p-4 rounded-full shadow-lg z-20 w-24 h-24 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <span className="text-2xl font-bold">5+</span>
                  <span className="text-xs">Years Exp.</span>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right Column - Info */}
            <div className="md:w-3/5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <motion.div 
                    className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full text-blue-600 text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaUser className="inline mr-2" /> About Me
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Personal Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Name</h3>
                    <p className="text-gray-600 font-medium">Tsegaye Kebede Bade</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Email</h3>
                    <p className="text-gray-600 font-medium">tdrag301@gmail.com</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Phone</h3>
                    <p className="text-gray-600 font-medium">+251925480393</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Location</h3>
                    <p className="text-gray-600 font-medium">Addis Ababa, Ethiopia</p>
                  </motion.div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    <FaRocket className="mr-3 text-blue-600" /> Bio
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    I am a passionate Full Stack Developer with over 5 years of experience in building web applications using modern technologies. My expertise includes React, Node.js, MongoDB, and various other frameworks and libraries. I am dedicated to creating efficient, scalable, and user-friendly applications that solve real-world problems.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities. I believe in continuous learning and staying updated with the latest industry trends.
                  </p>
                </div>
                
                <motion.div 
                  className="flex flex-wrap gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <button 
                    onClick={() => setShowResumeModal(true)}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform"
                  >
                    <FaDownload className="mr-2" />
                    Download Resume
                  </button>
                  <a 
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-transform"
                  >
                    Contact Me
                  </a>
                </motion.div>
              </motion.div>
            </div>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Experience</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              My academic background and professional journey in software development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="flex items-center mb-8">
                <FaGraduationCap className="text-blue-600 text-3xl mr-4" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              <div className="space-y-8">
                {education.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="relative pl-8 border-l-2 border-blue-600 pb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0"></div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <span className="text-sm text-blue-600 font-medium">{item.period}</span>
                      <h4 className="text-xl font-bold mt-1 mb-2">{item.degree}</h4>
                      <p className="text-gray-700 mb-2">{item.institution}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
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
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="relative pl-8 border-l-2 border-blue-600 pb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0"></div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <span className="text-sm text-blue-600 font-medium">{item.period}</span>
                      <h4 className="text-xl font-bold mt-1 mb-2">{item.position}</h4>
                      <p className="text-gray-700 mb-2">{item.company}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Interests</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Beyond coding, here are some things I'm passionate about.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 text-3xl mb-3">{interest.icon}</div>
                <h3 className="font-bold">{interest.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Resume Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            <button 
              onClick={() => setShowResumeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <FaTimes size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDownload size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Download Resume</h3>
              <p className="text-gray-600">Choose your preferred format to download my professional resume.</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={generatePDF}
                className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium hover:bg-blue-700 transition-colors"
              >
                <FaDownload className="mr-2" /> View & Print PDF Resume
              </button>
              
              <a 
                href="/tsegaye_kebede_resume.txt" 
                download="Tsegaye_Kebede_Resume.txt"
                className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center font-medium hover:bg-blue-50 transition-colors"
              >
                <FaDownload className="mr-2" /> Download Text Resume
              </a>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                The PDF version opens in a new tab where you can view, print, or save it to your device.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sample data for the about page
const services = [
  {
    title: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces using React.js, HTML, CSS, and JavaScript.',
    icon: <FaCode />
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
    period: '2018 - 2022',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'Addis Ababa University',
    description: 'Graduated with honors. Focused on web development, database systems, and software engineering principles.'
  },
  {
    period: '2016 - 2018',
    degree: 'Diploma in Computer Science',
    institution: 'Addis Ababa Institute of Technology',
    description: 'Completed with distinction. Studied programming fundamentals, data structures, and algorithms.'
  }
];

const experience = [
  {
    period: '2022 - Present',
    position: 'Full Stack Developer',
    company: 'Tech Solutions Inc., Addis Ababa',
    description: 'Developing and maintaining web applications using the MERN stack. Collaborating with cross-functional teams to deliver high-quality software solutions.'
  },
  {
    period: '2021 - 2022',
    position: 'Frontend Developer',
    company: 'WebTech Innovations, Addis Ababa',
    description: 'Designed and implemented responsive user interfaces using React.js. Worked closely with UI/UX designers to create intuitive user experiences.'
  },
  {
    period: '2020 - 2021',
    position: 'Web Development Intern',
    company: 'Digital Solutions Ltd., Addis Ababa',
    description: 'Assisted in developing web applications using HTML, CSS, JavaScript, and React. Gained hands-on experience in real-world software development.'
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
