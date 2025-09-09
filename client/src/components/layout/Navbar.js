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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/95 shadow-2xl border-b border-gray-200/50' 
          : 'backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 text-white'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 lg:px-6 py-3 max-w-7xl">
        <div className="flex items-center justify-between w-full">
          {/* Logo and Brand */}
          <div className="flex-none flex justify-start">
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
                className="mr-3 p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
              >
                <FaCode className="text-white text-xl" />
              </motion.div>
              <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${scrolled ? 'from-gray-800 to-gray-600' : 'from-white to-gray-200'} bg-clip-text text-transparent`}>
                Tsegaye Kebede
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center gap-x-1 xl:gap-x-2">
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
          <div className="hidden lg:flex items-center gap-x-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  {profileImage ? (
                    <motion.div 
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      T
                    </motion.div>
                  )}
                </div>
                <motion.button 
                  onClick={logout} 
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    scrolled 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-sm hover:shadow-md' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login" 
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    scrolled 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm'
                  }`}
                >
                  <FaLock size={14} />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={toggleMenu}
              className={`p-3 rounded-xl transition-all duration-300 ${
                scrolled ? 'text-gray-700 hover:bg-gray-100 shadow-sm' : 'text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200/50"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <motion.div
                className="py-6 px-4 max-h-96 overflow-y-auto"
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
    <motion.div 
      whileHover={{ scale: 1.05, y: -2 }} 
      whileTap={{ scale: 0.95 }} 
      className="mx-1"
    >
      <Link
        to={to}
        className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 group ${isActive 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg' 
          : scrolled 
            ? 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600' 
            : 'text-white hover:bg-white/20 backdrop-blur-sm'
        }`}
      >
        <motion.span 
          className="text-base"
          whileHover={{ rotate: isActive ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
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
      whileHover={{ x: 8, scale: 1.02 }}
      className="mx-2"
    >
      <Link
        to={to}
        className={`flex items-center transition-all duration-300 block px-5 py-4 rounded-xl group ${isActive 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg' 
          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
        }`}
        onClick={toggleMenu}
      >
        <motion.span 
          className={`mr-4 text-lg ${isActive ? 'text-white' : 'text-blue-600'}`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
        <span className="font-medium">{label}</span>
      </Link>
    </motion.div>
  );
};

export default Navbar;
