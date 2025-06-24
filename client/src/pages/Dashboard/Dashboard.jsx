import { useState, useEffect } from 'react';
import { 
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all necessary data in parallel
        const [projectsRes, tasksRes, usersRes] = await Promise.all([
          axios.get('/api/getproject'),
          axios.get('/api/getalltask'),
          axios.get('/api/getalluser')
        ]);

        const projectsData = projectsRes.data;
        const tasksData = tasksRes.data;
        const usersData = usersRes.data;

        // Calculate stats
        const calculatedStats = [
          { 
            name: 'Total Projects', 
            value: projectsData.length, 
            change: '+0%', 
            changeType: 'neutral' 
          },
          { 
            name: 'Tasks Completed', 
            value: tasksData.filter(task => task.status === 'completed').length, 
            change: '+0%', 
            changeType: 'neutral' 
          },
          { 
            name: 'Overdue Tasks', 
            value: tasksData.filter(task => 
              new Date(task.dueDate) < new Date() && task.status !== 'completed'
            ).length, 
            change: '+0%', 
            changeType: 'neutral' 
          },
          { 
            name: 'Team Members', 
            value: usersData.length, 
            change: '+0', 
            changeType: 'neutral' 
          },
        ];

        // Prepare recent activity (using tasks as activity for now)
        const activityData = tasksData
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 4)
          .map(task => ({
            id: task._id,
            project: task.projectId ? 
              projectsData.find(p => p._id === task.projectId)?.name || 'General' : 'General',
            action: task.status === 'completed' ? 'Task completed' : 'Task updated',
            time: formatTimeDifference(task.updatedAt),
            icon: task.status === 'completed' ? CalendarIcon : DocumentTextIcon
          }));

        setStats(calculatedStats);
        setRecentActivity(activityData);
        setProjects(projectsData.map(project => ({
          id: project._id,
          name: project.name,
          progress: calculateProjectProgress(project, tasksData),
          dueDate: formatDate(project.endDate),
          team: project.teamMembers?.length || 0
        })));
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Failed to fetch dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper functions
  const formatTimeDifference = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateProjectProgress = (project, tasks) => {
    const projectTasks = tasks.filter(task => task.projectId === project._id);
    if (projectTasks.length === 0) return 0;
    
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  // Animation variants
  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const listItemVariants = {
    hover: { backgroundColor: 'rgba(55, 65, 81, 0.5)' }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-lg">Error loading dashboard: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-900">
      <div className="mx-0 px-0 sm:px-6 lg:px-8 py-8 h-[89.8vh]">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Welcome back! Here's what's happening with your projects today.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.name}
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
              className="bg-gray-800 overflow-hidden shadow-lg rounded-xl border border-gray-700 hover:border-primary-500 transition-colors duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-primary-600 rounded-md p-3 shadow-md">
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-300 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-400' : 
                        stat.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpIcon className="h-4 w-4 text-green-400" />
                        ) : stat.changeType === 'negative' ? (
                          <ArrowDownIcon className="h-4 w-4 text-red-400" />
                        ) : null}
                        <span className="sr-only">
                          {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {stat.change}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-700">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg font-medium leading-6 text-white">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <motion.div 
                      key={activity.id} 
                      variants={listItemVariants}
                      whileHover="hover"
                      className="px-4 py-4 sm:px-6 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-gray-700 rounded-md p-2">
                          <activity.icon className="h-5 w-5 text-primary-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">{activity.project}</p>
                          <p className="text-sm text-gray-400">{activity.action}</p>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-4 py-4 sm:px-6 text-gray-400 text-sm">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Projects Overview */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-700">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg font-medium leading-6 text-white">Projects Overview</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <motion.div 
                      key={project.id} 
                      variants={listItemVariants}
                      whileHover="hover"
                      className="px-4 py-4 sm:px-6 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-white">{project.name}</div>
                          <div className="ml-2 text-xs text-gray-400">Team: {project.team}</div>
                        </div>
                        <div className="text-sm text-gray-400">Due: {project.dueDate}</div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-primary-500 h-2.5 rounded-full shadow-md" 
                            />
                          </div>
                          <div className="ml-2 text-xs font-medium text-primary-400">
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-4 py-4 sm:px-6 text-gray-400 text-sm">
                    No projects found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;