import {
  ChartBarIcon,
  ClockIcon,
  UsersIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) return JSON.parse(savedMode);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Navbar state
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState('2 hours ago');
  const [originalUser, setOriginalUser] = useState({
    name: '',
    email: ''
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    alert('Feature will be introduced shortly.')
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const getData = async() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const response = await axios.get(`/api/getuserbyid/${decoded.userId}`);
      setOriginalUser({
        name: response.data.name,
        email: response.data.email
      });
    } catch (err) {
      console.error('Error decoding token:', err);
      
    }
  };

  // Features data
  const features = [
    {
      icon: ChartBarIcon,
      title: "Real-time Analytics",
      description: "Track project metrics with live dashboards and customizable reports."
    },
    {
      icon: ClockIcon,
      title: "Time Optimization",
      description: "Automated scheduling reduces delays by 40% on average."
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description: "Integrated tools keep your team aligned and productive."
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "Military-grade encryption for all your sensitive data."
    }
  ];

  // Stats data
  const stats = [
    { value: "89%", label: "Client Retention" },
    { value: "3.5x", label: "ROI Increase" },
    { value: "200+", label: "Global Clients" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-[100vh] w-[100vw] transition-colors duration-300 overflow-x-hidden">
      <div className="h-full w-full overflow-auto scrollbar-hide">
        <div className="min-h-full min-w-full">
          <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Left - Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold mr-2"
                  >
                    🌐
                  </motion.div>
                  <span className="text-xl font-bold text-gray-800 dark:text-white">ProManage</span>
                </Link>
              </div>

              {/* Center - Navigation Links */}
              <div className="hidden md:flex md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                <div className="flex space-x-8">
                  <Link 
                    to="/home" 
                    className="border-purple-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/services" 
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Services
                  </Link>
                  <Link 
                    to="/feedback" 
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Feedback
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>

              {/* Right - User Controls */}
              <div className="flex items-center">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 mr-4 transition-colors duration-300"
                  aria-label="Toggle dark mode"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {darkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SunIcon className="h-5 w-5 text-yellow-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MoonIcon className="h-5 w-5 text-purple-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* User Dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button 
                      onClick={() => {
                        setIsUserDropdownOpen(!isUserDropdownOpen);
                        getData();
                      }}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      id="user-menu"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                      </div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                      >
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                          <p className="text-sm text-gray-700 dark:text-gray-200">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{originalUser.email}</p>
                        </div>
                        <div className="px-4 py-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Last login: {lastLogin}</p>
                        </div>
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          Your Profile
                        </Link>
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          Settings
                        </Link>
                        <Link 
                          to="/logout" 
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          Sign out
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile menu button */}
                <div className="-mr-2 flex items-center md:hidden ml-4">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <XMarkIcon className="block h-6 w-6" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mobile-menu-container"
              >
                <div className="pt-2 pb-3 space-y-1">
                  <Link
                    to="/"
                    className="bg-purple-50 dark:bg-gray-700 border-purple-500 text-purple-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/services"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    to="/feedback"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Feedback
                  </Link>
                  <Link
                    to="/dashboard"
                    className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-white">{originalUser.name}</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{originalUser.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-2">Last login: {lastLogin}</p>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-50 to-gray-50 dark:from-purple-900 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Transform Your <span className="text-purple-600 dark:text-purple-400">Productivity</span>
              </h1>
              <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Professional project management solutions that drive results and maximize efficiency for teams of all sizes.
              </p>
              <div className="mt-8 md:mt-10">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 md:px-8 md:py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-white shadow-lg transition-all duration-300"
                  >
                    Get Started
                    <ArrowRightIcon className="h-5 w-5 ml-2 inline" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Importance Section */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 }
              }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Why <span className="text-purple-600 dark:text-purple-400">Project Management</span> Matters
              </h2>
              <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300">
                In today's fast-paced business environment, effective project management is the cornerstone of success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -50 }
                }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-gray-200 dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3 md:mb-4">Strategic Alignment</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Ensures all projects directly support business objectives, eliminating wasted effort and resources.
                  Companies with strong project alignment see 38% higher success rates.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: 50 }
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-gray-200 dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3 md:mb-4">Risk Mitigation</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Proactive identification and management of potential issues reduces costly surprises by up to 65%.
                  Our system provides real-time risk assessment tools.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Enterprise-grade <span className="text-purple-600 dark:text-purple-400">Features</span>
              </h2>
              <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300">
                Everything you need to manage complex projects with confidence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-md bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 mb-3 md:mb-4">
                    <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-900 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 md:p-6"
                >
                  <p className="text-2xl md:text-4xl font-extrabold text-white mb-1 md:mb-2">{stat.value}</p>
                  <p className="text-xs md:text-sm font-medium text-purple-100 dark:text-purple-200 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-6">
                Ready to transform your workflow?
              </h2>
              <p className="mt-3 md:mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                Join thousands of professionals who have revolutionized their project management approach.
              </p>
              <Link to="/subscription">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 md:px-8 md:py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-medium text-white shadow-lg transition-all duration-300"
                >
                  Subscription
                  <ArrowRightIcon className="h-5 w-5 ml-2 inline" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">ProManage</h3>
                <p className="text-sm">
                  Professional project management solutions for teams of all sizes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-sm hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/services" className="text-sm hover:text-white transition-colors">Services</Link></li>
                  <li><Link to="/feedback" className="text-sm hover:text-white transition-colors">Feedback</Link></li>
                  <li><Link to="/dashboard" className="text-sm hover:text-white transition-colors">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="text-sm hover:text-white transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                <p className="text-sm mb-2">support@gmail.com</p>
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} ProManage. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;