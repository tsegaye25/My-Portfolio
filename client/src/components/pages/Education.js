import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        // In a real app, you would fetch from your API
        // const res = await axios.get('/api/education');
        // setEducations(res.data);
        
        // For now, we'll use sample data
        setEducations(sampleEducations);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch education data');
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading education data...</div>;
  if (error) return <div className="container mx-auto px-4 py-20 text-center text-red-600">{error}</div>;

  return (
    <div className="pt-16">
      {/* Education Header */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Education</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              My academic background and qualifications in software engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-600"></div>
              
              {/* Education Items */}
              {educations.map((education, index) => (
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
                          {formatDate(education.from)} - {education.current ? 'Present' : formatDate(education.to)}
                        </span>
                        {index % 2 === 0 && <FaCalendarAlt className="ml-2 hidden md:block" />}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{education.degree}</h3>
                      <h4 className="text-xl text-blue-600 mb-2">{education.fieldOfStudy}</h4>
                      
                      <div className="flex items-center mb-4 text-gray-600">
                        <FaGraduationCap className={`mr-2 ${index % 2 === 0 ? 'md:hidden' : ''}`} />
                        <span>{education.school}</span>
                        {index % 2 === 0 && <FaGraduationCap className="ml-2 hidden md:block" />}
                      </div>
                      
                      {education.location && (
                        <div className="flex items-center mb-4 text-gray-600">
                          <FaMapMarkerAlt className={`mr-2 ${index % 2 === 0 ? 'md:hidden' : ''}`} />
                          <span>{education.location}</span>
                          {index % 2 === 0 && <FaMapMarkerAlt className="ml-2 hidden md:block" />}
                        </div>
                      )}
                      
                      {education.description && (
                        <p className="text-gray-600">{education.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Professional certifications and additional qualifications I've earned.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 text-3xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
                <p className="text-gray-600 mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  >
                    View Credential
                  </a>
                )}
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

// Sample data for the education page
const sampleEducations = [
  {
    school: 'Addis Ababa University',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Software Engineering',
    location: 'Addis Ababa, Ethiopia',
    from: '2018-09-01',
    to: '2022-07-31',
    current: false,
    description: 'Graduated with honors. Focused on web development, database systems, and software engineering principles. Completed a capstone project developing a full-stack web application for a local business.'
  },
  {
    school: 'Addis Ababa Institute of Technology',
    degree: 'Diploma',
    fieldOfStudy: 'Computer Science',
    location: 'Addis Ababa, Ethiopia',
    from: '2016-09-01',
    to: '2018-06-30',
    current: false,
    description: 'Completed with distinction. Studied programming fundamentals, data structures, and algorithms. Participated in various coding competitions and hackathons.'
  }
];

const certifications = [
  {
    name: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    date: 'January 2023',
    credentialUrl: '#',
    icon: '🍃'
  },
  {
    name: 'React Developer Certification',
    issuer: 'Meta (formerly Facebook)',
    date: 'March 2022',
    credentialUrl: '#',
    icon: '⚛️'
  },
  {
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    date: 'June 2022',
    credentialUrl: '#',
    icon: '☁️'
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'November 2021',
    credentialUrl: '#',
    icon: '🟨'
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'August 2021',
    credentialUrl: '#',
    icon: '🎨'
  },
  {
    name: 'Node.js Certification',
    issuer: 'OpenJS Foundation',
    date: 'April 2022',
    credentialUrl: '#',
    icon: '🟢'
  }
];

export default Education;
