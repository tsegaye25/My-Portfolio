import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setAuthToken(token);
        try {
          // Parse the token to get user data (in a real app, this would be a JWT decode)
          // Format of our simulated token: "user-data:email:name:timestamp"
          const tokenParts = token.split(':');
          if (tokenParts.length >= 3) {
            const email = tokenParts[1];
            const name = tokenParts[2];
            
            // Set user data from token
            setUser({ name, email });
            setIsAuthenticated(true);
            setError(null);
          } else {
            throw new Error('Invalid token format');
          }
        } catch (err) {
          // Token validation failed - clear everything
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          setError('Authentication failed. Please log in again.');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Set auth token in headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      // Clear previous errors
      setError(null);
      
      // Get the latest valid users from localStorage
      let validUsers = JSON.parse(localStorage.getItem('validUsers'));
      
      // If no users in localStorage, initialize with default users
      if (!validUsers || validUsers.length === 0) {
        validUsers = [
          { email: 'tsegaye.kebede@example.com', password: 'password123', name: 'Tsegaye Kebede' },
          { email: 'admin@portfolio.com', password: 'admin123', name: 'Admin User' },
          // For backward compatibility
          { email: 'admin@example.com', password: 'password123', name: 'Admin Example' }
        ];
        localStorage.setItem('validUsers', JSON.stringify(validUsers));
      }
      
      // Add default admin user if it doesn't exist (for safety)
      const adminExists = validUsers.some(user => user.email === 'admin@portfolio.com');
      if (!adminExists) {
        validUsers.push({ email: 'admin@portfolio.com', password: 'admin123', name: 'Admin User' });
        localStorage.setItem('validUsers', JSON.stringify(validUsers));
      }
      // Check if user exists and password matches
      const user = validUsers.find(user => user.email === email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.password !== password) {
        throw new Error('Invalid password');
      }
      
      // Generate a secure token with user data and timestamp
      const timestamp = Date.now();
      const token = `user-data:${user.email}:${user.name}:${timestamp}`;
      
      // Set token in local storage and axios headers
      setToken(token);
      setAuthToken(token);
      
      // Set user data in state
      setUser({ name: user.name, email: user.email });
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      // Set error message
      setError(err.message || 'Authentication failed. Please try again.');
      console.error('Login error:', err);
      
      // Clear any existing token
      setToken(null);
      setAuthToken(null);
      setIsAuthenticated(false);
      
      return false;
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      // Clear previous errors
      setError(null);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Validate password strength
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Check if email is already in use
      const validUsers = [
        { email: 'tsegaye.kebede@example.com', password: 'password123', name: 'Tsegaye Kebede' },
        { email: 'admin@portfolio.com', password: 'admin123', name: 'Admin User' }
      ];
      
      if (validUsers.some(user => user.email === email)) {
        throw new Error('Email is already in use');
      }
      
      // In a real app, we would save this to a database
      // For now, we'll simulate a successful registration
      
      // Generate a secure token with user data and timestamp
      const timestamp = Date.now();
      const token = `user-data:${email}:${name}:${timestamp}`;
      
      // Set token in local storage and axios headers
      setToken(token);
      setAuthToken(token);
      
      // Set user data in state
      setUser({ name, email });
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      // Set error message
      setError(err.message || 'Registration failed. Please try again.');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear errors
  const clearErrors = () => {
    setError(null);
  };

  // Update profile image
  const updateProfileImage = (imageData) => {
    setProfileImage(imageData);
    localStorage.setItem('profileImage', imageData);
  };

  // Remove profile image
  const removeProfileImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
  };

  // Update user information
  const updateUser = (userData) => {
    try {
      // Get current user email before update
      const currentEmail = user?.email;
      
      // Update user state
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }));
      
      // Update token with new user data
      if (token) {
        const tokenParts = token.split(':');
        if (tokenParts.length >= 4) {
          const timestamp = tokenParts[3];
          const newToken = `user-data:${userData.email || user.email}:${userData.name || user.name}:${timestamp}`;
          
          // Set new token
          setToken(newToken);
          setAuthToken(newToken);
          
          // Update the user in validUsers list in localStorage
          let validUsers = JSON.parse(localStorage.getItem('validUsers')) || [];
          
          // If no valid users found, initialize with defaults
          if (validUsers.length === 0) {
            validUsers = [
              { email: 'tsegaye.kebede@example.com', password: 'password123', name: 'Tsegaye Kebede' },
              { email: 'admin@portfolio.com', password: 'admin123', name: 'Admin User' }
            ];
          }
          
          // Find the user by current email
          const userIndex = validUsers.findIndex(validUser => validUser.email === currentEmail);
          
          if (userIndex !== -1) {
            // Update existing user
            validUsers[userIndex] = {
              ...validUsers[userIndex],
              email: userData.email || validUsers[userIndex].email,
              name: userData.name || validUsers[userIndex].name,
              ...(userData.password && { password: userData.password })
            };
          } else {
            // If user not found, add them
            validUsers.push({
              email: userData.email || user.email,
              name: userData.name || user.name,
              password: userData.password || 'password123' // Default password if none provided
            });
          }
          
          // Save updated users to localStorage
          localStorage.setItem('validUsers', JSON.stringify(validUsers));    
        }
      }
      
      return true;
    } catch (err) {
      console.error('Error updating user:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        profileImage,
        login,
        register,
        logout,
        clearErrors,
        updateProfileImage,
        removeProfileImage,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
