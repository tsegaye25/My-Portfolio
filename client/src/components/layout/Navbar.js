import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaBriefcase, FaGraduationCap, FaEnvelope, FaLock, FaLaptopCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout, profileImage } = useContext(AuthContext);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-blur-md bg-white shadow-xl border-b-2 border-indigo-100' 
          : 'backdrop-blur-md bg-gradient-to-r from-indigo-800 to-purple-800 text-white'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-0 lg:px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between w-full">
          {/* Logo and Brand */}
          <div className="flex-none flex justify-start px-4">
            <Link to="/" className="flex items-center group mb-0">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mr-3"
              >
                <FaCode className={`${scrolled ? 'text-indigo-600' : 'text-white'} text-3xl`} />
              </motion.div>
              <div className={`text-2xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                Tsegaye Kebede
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center gap-x-1 gap-y-2 lg:gap-x-2">
            <NavItem to="/" icon={<FaHome />} label="Home" currentPath={location.pathname} scrolled={scrolled} />
            <NavItem to="/about" icon={<FaUser />} label="About" currentPath={location.pathname} scrolled={scrolled} />
            <NavItem to="/projects" icon={<FaCode />} label="Projects" currentPath={location.pathname} scrolled={scrolled} />
            <NavItem to="/skills" icon={<FaLaptopCode />} label="Skills" currentPath={location.pathname} scrolled={scrolled} />
            <NavItem to="/experience" icon={<FaBriefcase />} label="Experience" currentPath={location.pathname} scrolled={scrolled} />
            <NavItem to="/contact" icon={<FaEnvelope />} label="Contact" currentPath={location.pathname} scrolled={scrolled} />
            {isAuthenticated && (
              <NavItem to="/dashboard" icon={<FaUser />} label="Dashboard" currentPath={location.pathname} scrolled={scrolled} />
            )}
          </div>

          {/* Profile and Logout - Far Right */}
          <div className="hidden md:flex items-center gap-x-3 pr-0 absolute right-4 top-1/2 transform -translate-y-1/2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  {profileImage ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md hover:ring-2 hover:ring-indigo-300 transition-all">
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${scrolled ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-600 text-white'} shadow-md`}>
                      <FaUser size={16} />
                    </div>
                  )}
                </div>
                <motion.button 
                  onClick={logout} 
                  className={`flex items-center gap-1 px-2 lg:px-3 py-1 lg:py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md text-xs lg:text-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLock size={12} />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login" 
                  className={`flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md`}
                >
                  <FaLock size={16} />
                  <span className="text-sm font-medium whitespace-nowrap">Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden px-4">
            <motion.button 
              onClick={toggleMenu} 
              className={`p-2 rounded-full ${scrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden bg-white/95 backdrop-blur-md mt-4 rounded-xl shadow-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <motion.div 
                className="flex flex-col py-4 px-2"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                <MobileNavItem to="/" icon={<FaHome />} label="Home" toggleMenu={toggleMenu} />
                <MobileNavItem to="/about" icon={<FaUser />} label="About" toggleMenu={toggleMenu} />
                <MobileNavItem to="/projects" icon={<FaCode />} label="Projects" toggleMenu={toggleMenu} />
                <MobileNavItem to="/skills" icon={<FaLaptopCode />} label="Skills" toggleMenu={toggleMenu} />
                <MobileNavItem to="/experience" icon={<FaBriefcase />} label="Experience" toggleMenu={toggleMenu} />
                <MobileNavItem to="/contact" icon={<FaEnvelope />} label="Contact" toggleMenu={toggleMenu} />
                {isAuthenticated ? (
                  <>
                    <MobileNavItem to="/dashboard" icon={<FaUser />} label="Dashboard" toggleMenu={toggleMenu} />
                    <motion.button 
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }} 
                      className="flex items-center text-gray-600 hover:text-blue-600 transition-colors text-left px-4 py-3 mx-2 rounded-lg hover:bg-gray-100"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-3">Logout</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    className="px-4 py-2"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                  >
                    <Link 
                      to="/login" 
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
                      onClick={toggleMenu}
                    >
                      <FaLock size={14} />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const NavItem = ({ to, label, currentPath, icon, scrolled }) => {
  const isActive = currentPath === to;
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mx-1">
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${isActive 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md' 
          : scrolled 
            ? 'text-gray-700 hover:bg-indigo-50' 
            : 'text-white hover:bg-white/20'
        }`}
      >
        <span className="text-base">{icon}</span>
        <span className="ml-2 text-sm font-medium whitespace-nowrap">{label}</span>
      </Link>
    </motion.div>
  );
};

const MobileNavItem = ({ to, label, toggleMenu, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
      }}
      whileHover={{ x: 5 }}
    >
      <Link
        to={to}
        className={`flex items-center text-gray-700 transition-colors block px-4 py-3 mx-2 rounded-lg ${isActive 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'hover:bg-gray-100'
        }`}
        onClick={toggleMenu}
      >
        <span className="mr-3 text-blue-600">{icon}</span>
        <span>{label}</span>
      </Link>
    </motion.div>
  );
};

export default Navbar;
