import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API with proper response handling
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/task/getalltask');
        
        // Handle different response formats
        let tasksData = [];
        
        if (Array.isArray(response.data)) {
          // Case 1: Direct array response
          tasksData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          // Case 2: Object with data array
          tasksData = response.data.data;
        } else if (response.data && Array.isArray(response.data.tasks)) {
          // Case 3: Object with tasks array
          tasksData = response.data.tasks;
        } else if (response.data && response.data.message) {
          // Case 4: Message response (like "No task exist")
          console.log('API Message:', response.data.message);
          tasksData = [];
        }
        
        setTasks(tasksData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err.message);
        setTasks([]);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTasks = tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);

      await axios.post(`/api/task/updatetaskbyid/${taskId}`, {
        status: newStatus
      });
    } catch (err) {
      console.error('Error updating task:', err);
      setTasks([...tasks]);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/task/deletetaskbyid/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  // Safe filtering function
  const filteredTasks = (() => {
    try {
      if (!Array.isArray(tasks)) return [];
      
      return tasks.filter(task => {
        if (!task) return false;
        
        const title = (task.title || '').toString().toLowerCase();
        const description = (task.description || '').toString().toLowerCase();
        const status = (task.status || '').toString();
        
        const matchesSearch = searchQuery 
          ? (title.includes(searchQuery.toLowerCase()) || 
             description.includes(searchQuery.toLowerCase()))
          : true;
          
        const matchesTab = activeTab === 'all' || status === activeTab;
        
        return matchesSearch && matchesTab;
      });
    } catch (err) {
      console.error('Filter error:', err);
      return [];
    }
  })();

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckBadgeIcon className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-500" />;
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

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-950 text-gray-100 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-950 text-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-medium text-red-500">Error loading tasks</h3>
          <p className="text-gray-400 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen w-full bg-gray-950 text-gray-100 p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="text-gray-400">Manage your team's work</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Search tasks..."
              />
            </div>
            
            <Link to={'/addtask'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                New Task
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex space-x-1 mb-6 p-1 bg-gray-900 rounded-lg border border-gray-800">
          {[
            { id: 'all', label: 'All', count: tasks.length },
            { id: 'todo', label: 'To Do', count: tasks.filter(t => t?.status === 'todo').length },
            { id: 'in-progress', label: 'In Progress', count: tasks.filter(t => t?.status === 'in-progress').length },
            { id: 'completed', label: 'Completed', count: tasks.filter(t => t?.status === 'completed').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Task List */}
        <motion.div variants={containerVariants} className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <motion.div
                key={task._id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button 
                      className="mt-1"
                      onClick={() => {
                        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
                        updateTaskStatus(task._id, newStatus);
                      }}
                    >
                      <CheckCircleIcon className={`h-5 w-5 ${task.status === 'completed' ? 'text-green-500' : 'text-gray-600 hover:text-gray-400'}`} />
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                          {task.title || 'Untitled Task'}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)} bg-opacity-20 ${getPriorityColor(task.priority).replace('text', 'bg')}`}>
                          {task.priority || 'Unspecified'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{task.description || 'No description'}</p>
                      
                      <div className="flex items-center mt-3 space-x-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">
                            {task.assignee?.name?.substring(0, 2).toUpperCase() || 'NA'}
                          </div>
                          {getStatusIcon(task.status || 'todo')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/edittask/${task._id}`}>
                      <button className="text-gray-500 hover:text-gray-300 p-1">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => deleteTask(task._id)}
                      className="text-gray-500 hover:text-red-500 p-1"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={itemVariants}
              className="text-center py-12 border-2 border-gray-800 border-dashed rounded-xl"
            >
              <div className="mx-auto h-16 w-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-300">No tasks found</h3>
              <p className="text-gray-500 mt-1">Create a new task or adjust your filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Task;