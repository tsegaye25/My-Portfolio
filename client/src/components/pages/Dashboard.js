import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaUser, FaProjectDiagram, FaCode, FaBriefcase, FaGraduationCap, FaEnvelope } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import MessagesManager from './MessagesManager';

// Dashboard Components
const DashboardHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    education: 0,
    messages: 0
  });

  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    const loadData = () => {
      try {
        // Get messages from localStorage
        const storedMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        
        // Set recent messages (limited to 3)
        setRecentMessages(storedMessages.slice(0, 3));
        
        // Set stats with actual message count
        setStats({
          projects: 6, // These could be fetched from API in a real implementation
          skills: 12,
          experiences: 3,
          education: 2,
          messages: storedMessages.length
        });
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        // Fallback to sample data if localStorage access fails
        setStats({
          projects: 6,
          skills: 12,
          experiences: 3,
          education: 2,
          messages: 0
        });
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
              <FaProjectDiagram size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Projects</h3>
              <p className="text-3xl font-bold">{stats.projects}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 text-green-600 p-3 rounded-full mr-4">
              <FaCode size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Skills</h3>
              <p className="text-3xl font-bold">{stats.skills}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full mr-4">
              <FaBriefcase size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Experiences</h3>
              <p className="text-3xl font-bold">{stats.experiences}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full mr-4">
              <FaGraduationCap size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Education</h3>
              <p className="text-3xl font-bold">{stats.education}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-100 text-red-600 p-3 rounded-full mr-4">
              <FaEnvelope size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Messages</h3>
              <p className="text-3xl font-bold">{stats.messages}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Recent Messages</h3>
          <Link to="/dashboard/messages" className="text-blue-600 hover:text-blue-800 text-sm">View All</Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {recentMessages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <FaEnvelope className="mx-auto text-gray-300 text-3xl mb-2" />
              <p>No messages yet. When visitors contact you, their messages will appear here.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentMessages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{message.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate" title={message.subject}>
                        {message.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs overflow-hidden whitespace-pre-line line-clamp-2">
                        {message.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(message.date).toLocaleDateString()}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });

  useEffect(() => {
    try {
      setLoading(true);
      // Get projects from localStorage
      const storedProjects = JSON.parse(localStorage.getItem('portfolioProjects'));
      
      if (storedProjects && storedProjects.length > 0) {
        // Use stored projects if they exist
        setProjects(storedProjects);
      } else {
        // Initialize with sample data if no stored projects
        setProjects(sampleProjects);
        // Save sample projects to localStorage
        localStorage.setItem('portfolioProjects', JSON.stringify(sampleProjects));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading projects:', err);
      setLoading(false);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Convert technologies string to array
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    };
    
    try {
      let updatedProjects = [];
      
      if (currentProject) {
        // Update existing project
        updatedProjects = projects.map(project => 
          project._id === currentProject._id ? { ...project, ...projectData } : project
        );
      } else {
        // Create new project
        const newProject = {
          ...projectData,
          _id: Date.now().toString(), // Simulate an ID
          date: new Date().toISOString()
        };
        updatedProjects = [newProject, ...projects];
      }
      
      // Update state
      setProjects(updatedProjects);
      
      // Save to localStorage
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      
      // Show success message
      alert(currentProject ? 'Project updated successfully!' : 'Project added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        technologies: '',
        githubUrl: '',
        liveUrl: ''
      });
      setCurrentProject(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving project:', err);
      alert('There was an error saving the project. Please try again.');
    }
  };

  const handleEdit = project => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setShowForm(true);
  };

  const handleDeleteClick = project => {
    setProjectToDelete(project);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    
    try {
      const id = projectToDelete._id;
      // Filter out the project to delete
      const updatedProjects = projects.filter(project => project._id !== id);
      
      // Update state
      setProjects(updatedProjects);
      
      // Save to localStorage
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
      
      // Show success message
      alert('Project deleted successfully!');
      
      // Close confirmation dialog
      setShowDeleteConfirm(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('There was an error deleting the project. Please try again.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProjectToDelete(null);
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <button 
          onClick={() => {
            setCurrentProject(null);
            setFormData({
              title: '',
              description: '',
              imageUrl: '',
              technologies: '',
              githubUrl: '',
              liveUrl: ''
            });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          {showForm ? 'Cancel' : <>Add Project <FaPlus className="ml-2" /></>}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">{currentProject ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="technologies" className="block text-gray-700 font-medium mb-2">Technologies (comma separated)</label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="githubUrl" className="block text-gray-700 font-medium mb-2">GitHub URL</label>
                <input
                  type="text"
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="liveUrl" className="block text-gray-700 font-medium mb-2">Live URL</label>
                <input
                  type="text"
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {currentProject ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
          >
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <FaTrash className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Project</h3>
              <p className="text-gray-500">
                Are you sure you want to delete <span className="font-medium">{projectToDelete.title}</span>?
                This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technologies</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map(project => (
              <tr key={project._id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-10 w-10 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{project.title}</div>
                      <div className="text-gray-500 truncate max-w-xs">{project.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(project)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProfileManager = () => {
  const { user, profileImage, updateProfileImage, removeProfileImage, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm('Are you sure you want to remove your profile image?')) {
      removeProfileImage();
      setMessage({ type: 'success', text: 'Profile image removed successfully' });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    try {
      // Update user information
      const userData = {
        name: formData.name,
        email: formData.email
      };
      
      // Add password to userData if it was changed
      if (formData.newPassword) {
        userData.password = formData.newPassword;
      }
      
      // Update user in context
      const success = updateUser(userData);
      
      if (success) {
        // Exit edit mode
        setEditMode(false);
        
        // Show success message
        setMessage({ type: 'success', text: 'Profile updated successfully. If you changed your email or password, please use the new credentials next time you login.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
      
      // Clear password fields
      setFormData(prevState => ({
        ...prevState,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Clear message after 5 seconds (increased from 3 to give user more time to read)
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage({ type: 'error', text: 'An error occurred while updating your profile' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Personal Information</h3>
          <button 
            type="button" 
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center px-4 py-2 rounded-lg ${editMode ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white'}`}
          >
            {editMode ? 'Cancel' : <>Edit <FaEdit className="ml-2" /></>}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Profile Image Section */}
          <div className="mb-12">
            <div className="flex flex-col items-center">
              <div className="relative group mb-6">
                {profileImage ? (
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white ring-2 ring-blue-500 transition-all duration-300 hover:ring-4 hover:scale-105">
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange} 
                          />
                        </label>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                          title="Remove image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border-4 border-white">
                      <FaUser size={64} className="text-blue-400" />
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageChange} 
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800">Tsegaye Kebede</h3>
              <p className="text-gray-500">Administrator</p>
              {profileImage && (
                <p className="text-xs text-gray-400 mt-4 italic">Hover over image to change or remove</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'} rounded-lg ${editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent' : ''}`}
                required
                disabled={!editMode}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${editMode ? 'border-gray-300' : 'border-transparent bg-gray-100'} rounded-lg ${editMode ? 'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent' : ''}`}
                required
                disabled={!editMode}
              />
            </div>
          </div>
          
          {editMode && (
            <>
              <h3 className="text-xl font-bold mt-8 mb-4">Change Password</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          
          {editMode && (
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { logout, profileImage } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="pt-16">
      <section className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 transition-colors"
            >
              Logout <FaSignOutAlt className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3">
                      {profileImage ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white ring-1 ring-blue-400 hover:ring-blue-500 transition-all duration-300">
                          <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border-2 border-white">
                          <FaUser size={32} className="text-blue-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Tsegaye Kebede</h3>
                      <p className="text-sm text-blue-600 font-medium">Administrator</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <NavLink to="/dashboard" end>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/messages">
                        <div className="flex items-center">
                          <FaEnvelope className="mr-2" />
                          Messages
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/projects">
                        <div className="flex items-center">
                          <FaProjectDiagram className="mr-2" />
                          Projects
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/profile">
                        <div className="flex items-center">
                          <FaUser className="mr-2" />
                          Profile
                        </div>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Routes>
                  <Route path="/" element={<DashboardHome />} />
                  <Route path="/messages" element={<MessagesManager />} />
                  <Route path="/projects" element={<ProjectsManager />} />
                  <Route path="/profile" element={<ProfileManager />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// NavLink component
const NavLink = ({ children, to, end = false }) => {
  const location = useLocation();
  const isActive = end 
    ? location.pathname === to 
    : location.pathname.startsWith(to);
  
  return (
    <Link
      to={to}
      className={`block px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-600 font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

// Sample data
const recentMessages = [
  { name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', date: 'May 10, 2025' },
  { name: 'Jane Smith', email: 'jane@example.com', subject: 'Collaboration Opportunity', date: 'May 8, 2025' },
  { name: 'Mike Johnson', email: 'mike@example.com', subject: 'Job Opportunity', date: 'May 5, 2025' },
  { name: 'Sarah Williams', email: 'sarah@example.com', subject: 'Website Feedback', date: 'May 3, 2025' }
];

const sampleProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF?text=E-Commerce+Platform',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    date: '2025-04-15T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    imageUrl: 'https://placehold.co/600x400/10b981/FFFFFF?text=Task+Management+App',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    date: '2025-03-20T00:00:00.000Z'
  },
  {
    _id: '3',
    title: 'Blog Platform',
    description: 'A content management system for creating and managing blog posts with user authentication.',
    imageUrl: 'https://placehold.co/600x400/f59e0b/FFFFFF?text=Blog+Platform',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    date: '2025-02-10T00:00:00.000Z'
  }
];

export default Dashboard;
