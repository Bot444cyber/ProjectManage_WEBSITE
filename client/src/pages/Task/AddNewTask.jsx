import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  UserCircleIcon,
  FlagIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AddNewTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    assignee: ''
  });

  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [teamMembers, setteamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get('/api/users/getalluser')
        setteamMembers(response.data)
      } 
      catch (error) {
        console.log(error.message)
      }
    }

    fetchUser()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssigneeSelect = (member) => {
    setFormData(prev => ({
      ...prev,
      assignee: member._id
    }));
    setShowAssigneeDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Get user ID from token (you might need to decode it)
      // Alternatively, you might have the user ID stored separately
      const user = localStorage.getItem('token');
      const decoded = jwtDecode(token)
      if (!decoded || !decoded.userId) {
        throw new Error('No user information found');
      }

      // Prepare the task data according to your schema
      const taskData = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        assignee: formData.assignee,
        createdBy: decoded.userId,
        status: formData.status
      };

      // Make API request
      const response = await axios.post('/api/task/createtask', taskData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Handle successful creation
      if (response.data) {
        navigate('/task'); // Redirect to tasks list
      } else {
        throw new Error(response.data.message || 'Failed to create task');
      }
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

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

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-orange-500';
      case 'Critical': return 'text-red-500';
      case 'Low': return 'text-green-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[125vh] w-full bg-gray-950 text-gray-100 p-6"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center mb-8">
          <Link to="/task">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back
            </motion.button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Task</h1>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            variants={itemVariants}
            className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center"
          >
            <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800"
        >
          <h2 className="text-xl font-semibold mb-6 text-blue-400">Task Details</h2>
          
          <div className="space-y-6">
            {/* Title */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Task Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter task title"
                required
              />
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Describe the task..."
              />
            </motion.div>

            {/* Due Date */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Due Date*</label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]} // Set min date to today
                />
                <CalendarIcon className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
              </div>
            </motion.div>

            {/* Priority */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-400 mb-1">Priority*</label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map(level => (
                  <motion.button
                    key={level}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData(prev => ({ ...prev, priority: level }))}
                    className={`flex items-center justify-center py-2 rounded-lg border ${formData.priority === level ? `border-${getPriorityColor(level).split('-')[1]}-500 bg-${getPriorityColor(level).split('-')[1]}-500 bg-opacity-10` : 'border-gray-700 hover:border-gray-600'}`}
                  >
                    <FlagIcon className={`h-4 w-4 mr-1 ${formData.priority === level ? getPriorityColor(level) : 'text-gray-500'}`} />
                    <span>{level}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Assignee */}
            <motion.div variants={itemVariants} className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-1">Assignee*</label>
              <button
                type="button"
                onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                className="w-full flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <div className="flex items-center">
                  {formData.assignee ? (
                    <>
                      <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">
                        {teamMembers.find(m => m._id === formData.assignee)?.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span>{teamMembers.find(m => m._id === formData.assignee)?.name}</span>
                    </>
                  ) : (
                    <>
                      <UserCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-400">Select assignee</span>
                    </>
                  )}
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${showAssigneeDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showAssigneeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  {teamMembers.map(member => (
                    <div
                      key={member._id}
                      onClick={() => handleAssigneeSelect(member)}
                      className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span>{member.name}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end mt-6"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 rounded-lg font-medium text-white shadow-lg transition-all ${loading ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default AddNewTask;