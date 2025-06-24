import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const AddNewProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    teamMembers: [],
    status: 'Planning',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Fetch available users and current user on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login first');
          navigate('/login');
          return;
        }

        // Fetch available users
        const response = await axios.get('/api/getalluser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAvailableUsers(response.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load user data');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMember = (user) => {
    // Check if user is already added
    if (formData.teamMembers.some(member => member._id === user._id)) {
      toast.warning('This user is already in the team');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, user]
    }));
    setShowUserDropdown(false);
  };

  const handleRemoveMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Project title is required');
      return false;
    }
    if (!formData.startDate) {
      toast.error('Start date is required');
      return false;
    }
    if (!formData.endDate) {
      toast.error('End date is required');
      return false;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error('End date must be after start date');
      return false;
    }
    return true;
  };

  const saveData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login first');
      setLoading(false);
      navigate('/login');
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      
      // Ensure we have the userId
      if (!decoded.userId) {
        throw new Error('User ID not found in token');
      }
  
      const payload = {
        ...formData,
        teamMembers: formData.teamMembers.map(member => member._id),
        createdBy: decoded.userId // Make sure this matches your JWT structure
      };
  
      const response = await axios.post('/api/createproject', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      toast.success('Project created successfully!');
      navigate('/project');
    } catch (error) {
      console.error('Full error details:', {
        message: error.message,
        response: error.response?.data,
        request: error.config
      });
      
      let errorMessage = 'Failed to create project';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message.includes('User ID not found')) {
        errorMessage = 'Authentication error - please login again';
        navigate('/login');
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
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
    }
  };

  const cardHover = {
    hover: {
      y: -3,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-[125vh] w-full bg-gray-900 text-gray-100 p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center mb-8">
          <Link to="/projects">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back
            </motion.button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Project</h1>
        </motion.div>

        <form onSubmit={saveData}>
          {/* Project Details Card */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
          >
            <h2 className="text-xl font-semibold mb-6 text-blue-400">Project Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project title"
                  required
                />
              </motion.div>

              {/* Status */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the project..."
                  required
                />
              </motion.div>

              {/* Dates */}
              <motion.div variants={itemVariants} className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Start Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">End Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={formData.startDate}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </motion.div>

              {/* Priority */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Members Section */}
          <motion.div
            variants={itemVariants}
            whileHover={cardHover}
            className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-400">Team Members</h2>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add Member
                </button>
                
                {showUserDropdown && (
                  <div className="absolute z-10 right-0 mt-2 w-64 bg-gray-700 rounded-md shadow-lg max-h-80 overflow-y-auto">
                    {availableUsers.length > 0 ? (
                      availableUsers.map(user => (
                        <div 
                          key={user._id}
                          onClick={() => handleAddMember(user)}
                          className="px-4 py-2 hover:bg-gray-600 cursor-pointer flex items-center"
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                            <UserGroupIcon className="h-4 w-4 text-gray-300" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.bio}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-400 text-center">
                        No users available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {formData.teamMembers.length > 0 ? (
                formData.teamMembers.map((member, index) => (
                  <motion.div 
                    key={member._id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                        <UserGroupIcon className="h-4 w-4 text-gray-300" />
                      </div>
                      <div>
                        <p className="font-medium">{member.name || member.email || member}</p>
                        {member.role && <p className="text-xs text-gray-400">{member.role}</p>}
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 text-gray-400"
                >
                  <DocumentTextIcon className="h-10 w-10 mx-auto mb-2" />
                  <p>No team members added yet</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end"
          >
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddNewProject;