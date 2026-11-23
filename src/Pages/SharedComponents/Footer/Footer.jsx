import React from 'react';
import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';
import logo from '../../../assets/logo.png';
import giantWordmark from '../../../assets/Giant_wordmark.png';

const Footer = () => {
  const footerColumns = [
    {
      title: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'How it works', path: '/how-it-works' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Reviews', path: '/reviews' },
        { name: 'About', path: '/about' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' },
        { name: 'Contact', path: '/contact' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 14, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="w-full bg-[#070913] text-gray-300 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 sm:pt-14 pb-6">
        {/* Top Section: Brand Blurb + Navigation Columns */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-16 pb-10">
          {/* Left: Logo & Campus Description */}
          <motion.div variants={itemVariants} className="max-w-sm space-y-4">
            <Link to="/" className="inline-flex items-center group">
              <motion.img
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                src={logo}
                alt="Learn & Share"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-400">
              A campus platform where students teach what they know and learn from one another.
            </p>
          </motion.div>

          {/* Right: 3 Link Columns */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 lg:gap-16"
          >
            {footerColumns.map((col) => (
              <div key={col.title} className="space-y-3.5">
                <h3 className="text-sm font-medium text-gray-200">{col.title}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {col.links.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `inline-block transition-colors duration-200 ${
                            isActive
                              ? 'text-white font-medium'
                              : 'text-gray-400 hover:text-gray-100'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Middle Divider */}
        <div className="border-t border-white/10" />

        {/* Copyright & Credits Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 text-xs text-gray-500"
        >
          <p>© 2026 Learn&amp;Share. All rights reserved.</p>
          <p>By Md Imteaz Hossen, Parsia Noor Ethila &amp; Maisha Maliha Siddique</p>
        </motion.div>

        {/* Bottom Giant Wordmark */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }} //bg-linear-to-t from-[#070415] to-[#000000]
          className="pt-2 select-none pointer-events-none "
        >
          <img
            src={giantWordmark}
            alt="Learn & Share Giant Wordmark"
            className="w-full h-auto max-h-28 sm:max-h-36 lg:max-h-44 object-contain object-bottom"
          />
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;