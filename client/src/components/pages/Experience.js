import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
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

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading experiences...</div>;
  if (error) return <div className="container mx-auto px-4 py-20 text-center text-red-600">{error}</div>;

  return (
    <div className="pt-16">
      {/* Experience Header */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Work Experience</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              My professional journey and career highlights in software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-600"></div>
              
              {/* Experience Items */}
              {experiences.map((experience, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col md:flex-row mb-16 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                  }`}>
                    <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-2 text-blue-600">
                        <FaCalendarAlt className={`mr-2 ${index % 2 === 0 ? 'md:hidden' : ''}`} />
                        <span className="text-sm font-medium">
                          {formatDate(experience.from)} - {experience.current ? 'Present' : formatDate(experience.to)}
                        </span>
                        {index % 2 === 0 && <FaCalendarAlt className="ml-2 hidden md:block" />}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
                      
                      <div className="flex items-center mb-4 text-gray-600">
                        <FaBriefcase className={`mr-2 ${index % 2 === 0 ? 'md:hidden' : ''}`} />
                        <span>{experience.company}</span>
                        {index % 2 === 0 && <FaBriefcase className="ml-2 hidden md:block" />}
                      </div>
                      
                      <div className="flex items-center mb-4 text-gray-600">
                        <FaMapMarkerAlt className={`mr-2 ${index % 2 === 0 ? 'md:hidden' : ''}`} />
                        <span>{experience.location}</span>
                        {index % 2 === 0 && <FaMapMarkerAlt className="ml-2 hidden md:block" />}
                      </div>
                      
                      <p className="text-gray-600">{experience.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Gained */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills Gained Through Experience</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Key skills and competencies I've developed throughout my professional career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsGained.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 text-3xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </motion.div>
            ))}
          </div>
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

// Sample data for the experience page
const sampleExperiences = [
  {
    title: 'Full Stack Developer',
    company: 'Tech Solutions Inc.',
    location: 'Addis Ababa, Ethiopia',
    from: '2022-06-01',
    to: null,
    current: true,
    description: 'Developing and maintaining web applications using the MERN stack. Collaborating with cross-functional teams to deliver high-quality software solutions. Implementing responsive designs and ensuring cross-browser compatibility. Participating in code reviews and providing constructive feedback to other developers.'
  },
  {
    title: 'Frontend Developer',
    company: 'WebTech Innovations',
    location: 'Addis Ababa, Ethiopia',
    from: '2021-03-01',
    to: '2022-05-31',
    current: false,
    description: 'Designed and implemented responsive user interfaces using React.js. Worked closely with UI/UX designers to create intuitive user experiences. Integrated RESTful APIs with frontend applications. Optimized applications for maximum speed and scalability.'
  },
  {
    title: 'Web Development Intern',
    company: 'Digital Solutions Ltd.',
    location: 'Addis Ababa, Ethiopia',
    from: '2020-06-01',
    to: '2021-02-28',
    current: false,
    description: 'Assisted in developing web applications using HTML, CSS, JavaScript, and React. Gained hands-on experience in real-world software development. Participated in daily stand-up meetings and sprint planning. Learned version control with Git and collaborative development using GitHub.'
  }
];

const skillsGained = [
  {
    name: 'Project Management',
    description: 'Experience in managing software development projects, including planning, execution, and delivery.',
    icon: '📊'
  },
  {
    name: 'Team Collaboration',
    description: 'Ability to work effectively in cross-functional teams and communicate complex technical concepts.',
    icon: '👥'
  },
  {
    name: 'Agile Methodologies',
    description: 'Proficient in Agile development practices, including Scrum and Kanban.',
    icon: '🔄'
  },
  {
    name: 'Code Review',
    description: 'Experience in conducting thorough code reviews and providing constructive feedback.',
    icon: '👁️'
  },
  {
    name: 'Technical Documentation',
    description: 'Skilled in creating clear and comprehensive technical documentation for software projects.',
    icon: '📝'
  },
  {
    name: 'Client Communication',
    description: 'Ability to communicate effectively with clients and stakeholders to understand requirements and provide updates.',
    icon: '🗣️'
  }
];

export default Experience;
