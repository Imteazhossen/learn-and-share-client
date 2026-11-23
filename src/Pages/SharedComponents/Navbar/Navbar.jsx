import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Features', path: '/features' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
  ];

  // Dynamic styling for React Router NavLink
  const getNavLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-[15px] font-normal transition-colors duration-200 ${
      isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
    }`;

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-[#070415] backdrop-blur-md border-b border-white/10 text-gray-200 sticky top-0 z-50"
    >
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-8 h-20">
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center group">
            <motion.img
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              src={logo}
              alt="Learn & Share Logo"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink to={item.path} className={getNavLinkClass}>
                  {({ isActive }) => (
                    <span className="relative flex flex-col items-center">
                      {item.name}
                      {/* Animated Active & Hover Indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute -bottom-2 h-[2px] w-full rounded-full bg-[#0055FF] shadow-[0_0_8px_#0055FF]"
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Login Button & Mobile Hamburger */}
        <div className="navbar-end flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link
              to="/login"
              className="btn rounded-full bg-[#0055FF] hover:bg-[#0044CC] text-white border-none px-6 sm:px-7 h-10 min-h-0 font-medium text-sm shadow-[0_0_15px_rgba(0,85,255,0.4)] hover:shadow-[0_0_22px_rgba(0,85,255,0.65)] transition-shadow duration-300"
            >
              Login
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="btn btn-ghost btn-circle lg:hidden text-gray-200 hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Animated Mobile Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-[#070913]/95 backdrop-blur-xl border-b border-white/10"
          >
            <ul className="flex flex-col px-6 py-4 space-y-2">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2.5 px-3 rounded-lg text-base transition-colors ${
                        isActive
                          ? 'bg-[#0055FF]/15 text-white font-medium border-l-2 border-[#0055FF]'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;