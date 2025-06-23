import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { 
  HomeIcon, 
  FolderIcon, 
  CheckCircleIcon, 
  UsersIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const [user, setUser] = useState({
    name: '',
    email: '' 
  });

  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Projects', icon: FolderIcon, path: '/project' },
    { name: 'Tasks', icon: CheckCircleIcon, path: '/task' },
    { name: 'Team', icon: UsersIcon, path: '/team' },
    { name: 'Reports', icon: ChartBarIcon, path: '/report' },
  ];

  useEffect(() => {
    const getData = async() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
  
      try {
        const decoded = jwtDecode(token);
        const response = await axios.get(`/api/users/getuserbyid/${decoded.userId}`);
        setUser({
          name: response.data.name,
          email: response.data.email
        });
      } catch (err) {
        console.error('Error decoding token:', err);
        
      }
    };

    getData();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(55, 65, 81, 0.5)",
      transition: { duration: 0.2 }
    }
  };

  const avatarVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex md:flex-shrink-0"
    >
      <div className="flex flex-col w-64 h-[100vh] border-r border-gray-800 bg-gray-900">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <Link to={'/home'}>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex items-center flex-shrink-0 px-4 mb-6"
            >
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">ProjectPro</h1>
            </motion.div>
          </Link>
          
          <nav className="mt-5 flex-1 px-2 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover="hover"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                      isActive 
                        ? 'bg-gray-800 text-primary-400 shadow-md' 
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive 
                            ? 'text-primary-400' 
                            : 'text-gray-400 group-hover:text-gray-200'
                        }`}
                      />
                      <motion.span
                        whileHover={{ x: 3 }}
                      >
                        {item.name}
                      </motion.span>
                      {isActive && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="ml-auto h-2 w-2 rounded-full bg-primary-400"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>
        <Link to={'/profile'}>
          <motion.div 
            whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.7)" }}
            className="flex-shrink-0 flex border-t border-gray-800 p-4"
          >
            <motion.div
              variants={avatarVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                <span className="text-sm font-medium text-gray-300"></span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-200">{user.name}</p>
                  <motion.button 
                    whileHover={{ color: "#93C5FD" }}
                    className="text-xs font-medium text-gray-400"
                  >
                    View profile
                  </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;