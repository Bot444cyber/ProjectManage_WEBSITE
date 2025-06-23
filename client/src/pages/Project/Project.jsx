import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/project/getproject');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
      transition: { duration: 0.2 }
    }
  };

  const statusColors = {
    'Completed': 'bg-green-500/20 text-green-400',
    'In Progress': 'bg-blue-500/20 text-blue-400',
    'Planning': 'bg-purple-500/20 text-purple-400',
    'Pending': 'bg-yellow-500/20 text-yellow-400'
  };

  if (loading) {
    return (
      <div className="p-6 h-[100vh] bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 h-[100vh] bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 h-[100vh] bg-gray-900 text-gray-100"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-3xl font-bold"
        >
          Projects
        </motion.h1>
        
        <div className="flex space-x-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </motion.div>
          
          <Link to='/addproject'>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Project</span>
            </motion.button>
          </Link>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[project.status] || 'bg-gray-500/20 text-gray-400'}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-400 mb-6">{project.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${80}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-2 rounded-full ${
                      '80' < 30 ? 'bg-red-500' : 
                      '80' < 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                  <span>{project.team} team members</span>
                </div>
                
                <div className="flex items-center space-x-1 text-blue-400">
                  <span>View Details</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            No projects found. Create your first project!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Projects;