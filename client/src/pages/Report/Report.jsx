import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Report = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const [isLoading, setIsLoading] = useState(true);
  const [placeholderReports, setPlaceholderReports] = useState([]);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPlaceholderReports(generatePlaceholderReports());
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const generatePlaceholderReports = () => {
    const types = ['financial', 'operational', 'sales'];
    const statuses = ['in-progress', 'queued', 'processing'];
    
    return Array(3).fill().map((_, i) => ({
      id: i + 1,
      title: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report #${i + 1}`,
      status: statuses[i % statuses.length],
      progress: Math.floor(Math.random() * 100)
    }));
  };

  const statusConfig = {
    'in-progress': { color: 'bg-blue-500/20 text-blue-400', icon: ArrowPathIcon },
    'queued': { color: 'bg-yellow-500/20 text-yellow-400', icon: ClockIcon },
    'processing': { color: 'bg-purple-500/20 text-purple-400', icon: ChartBarIcon }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 md:p-8">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          Reports Dashboard
        </motion.h1>
        <motion.p 
          className="text-gray-400 mt-2 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your comprehensive reports are being prepared
        </motion.p>
      </motion.header>

      {/* Coming Soon Illustration */}
      <motion.div 
        className="flex flex-col items-center justify-center my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative w-64 h-64 mb-8">
          <motion.div 
            className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <DocumentTextIcon className="relative w-full h-full text-blue-400/30" />
        </div>
        
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Reports Coming Soon!
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 text-center max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          We're currently compiling the latest data and analytics. Check back soon for comprehensive reports.
        </motion.p>
      </motion.div>

      {/* Progress Trackers */}
      <motion.div 
        className="max-w-4xl mx-auto mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-300 flex items-center">
          <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
          Reports in Progress
        </h3>

        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill().map((_, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/50 rounded-xl p-4 h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            placeholderReports.map((report) => {
              const StatusIcon = statusConfig[report.status].icon;
              return (
                <motion.div
                  key={report.id}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-blue-400/30 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${statusConfig[report.status].color}`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-gray-400 capitalize">{report.status.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-400 font-medium">{report.progress}%</span>
                      <div className="w-32 h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${report.progress}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Stats Footer */}
      <motion.footer 
        className="mt-16 pt-8 border-t border-gray-800/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Reports Coming', value: '12', color: 'text-blue-400' },
            { label: 'Data Sources', value: '7', color: 'text-purple-400' },
            { label: 'Teams Involved', value: '4', color: 'text-green-400' },
            { label: 'Last Updated', value: 'Soon', color: 'text-gray-400' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm"
              whileHover={{ y: -3 }}
            >
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="text-center text-gray-500 mt-12 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Our analytics team is working hard to deliver insightful reports. Stay tuned!
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Report;