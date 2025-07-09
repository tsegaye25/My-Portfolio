import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  if (loading) return <div className="container mx-auto px-4 py-20 text-center">Loading skills...</div>;
  if (error) return <div className="container mx-auto px-4 py-20 text-center text-red-600">{error}</div>;

  return (
    <div className="pt-16">
      {/* Skills Header */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Skills</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              A comprehensive overview of my technical skills and proficiency levels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-10 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            {getCategories().map((category, index) => (
              <button 
                key={index}
                className={`px-4 py-2 mx-2 mb-2 rounded-full transition-colors ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => filterSkills(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredSkills().map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 text-3xl mr-4">{skill.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{skill.name}</h3>
                    <p className="text-gray-500">{skill.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{skill.description}</p>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                        Proficiency
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <motion.div 
                      style={{ width: `${skill.proficiency}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Skills */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Other Skills & Tools</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Additional technologies, tools, and skills that I work with.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {otherSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 text-2xl mb-2">{skill.icon}</div>
                <h3 className="font-medium">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Soft Skills</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Professional attributes that enable me to work effectively and harmoniously with others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softSkills.map((skill, index) => (
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
