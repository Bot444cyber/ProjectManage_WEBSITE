import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon,
  CogIcon,
  BellIcon,
  LockClosedIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    joinDate: '',
    lastLogin: '',
    avatar: '',
    bio: '',
    location: '',
    website: ''
  });

  const [originalUser, setOriginalUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get user ID from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId || decoded._id);
    } 
    catch (err) {
      console.error('Error decoding token:', err);
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/getuserbyid/${userId}`)
        
        const userData = response.data;
        setUser({
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || 'user',
          joinDate: userData.createdAt ,
          lastLogin: new Date().toISOString(),
          avatar: userData.avatar || 'https://randomuser.me/api/portraits/men/32.jpg',
          bio: userData.bio || 'No bio provided',
          location: userData.address || '',
          website: userData.website || ''
        });
        
        setOriginalUser({
          name: userData.name || '',
          email: userData.email || '',
          bio: userData.bio || 'No bio provided',
          location: userData.address || '',
          website: userData.website || ''
        });
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/updateuserbyid/${userId}`,
        {
          name: user.name,
          email: user.email,
          bio: user.bio,
          location: user.address,
          website: user.website
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Update original user data
      setOriginalUser({
        name: user.name,
        email: user.email,
        bio: user.bio,
        location: user.address,
        website: user.website
      });

      setEditMode(false);
      // Optionally show success message
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert to original data
    setUser(prev => ({
      ...prev,
      name: originalUser.name,
      email: originalUser.email,
      bio: originalUser.bio,
      location: originalUser.address,
      website: originalUser.website
    }));
    setEditMode(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading && !user.name) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-[89.7vh] ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 w-[80.6vw]`}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="" className="text-xl font-bold text-gray-800 dark:text-white">
                Setting
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                  >
                    <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </motion.div>
                )}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 mb-4"
                >
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  {editMode && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </motion.button>
                  )}
                </motion.div>
                
                <h2 className="text-xl font-bold dark:text-white">
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="bg-gray-100 dark:bg-gray-700 text-center font-bold text-xl w-full rounded-md px-2 py-1"
                    />
                  ) : (
                    user.name
                  )}
                </h2>
                <p className="text-purple-600 dark:text-purple-400 capitalize">{user.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700">
                <nav className="flex md:flex-col overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'profile' ? 'bg-purple-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <UserCircleIcon className="h-5 w-5 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'settings' ? 'bg-purple-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <CogIcon className="h-5 w-5 mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'notifications' ? 'bg-purple-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <BellIcon className="h-5 w-5 mr-2" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'security' ? 'bg-purple-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    Security
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium dark:text-white">Profile Information</h3>
                  {editMode ? (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></div>
                        ) : (
                          <CheckIcon className="h-4 w-4 mr-1" />
                        )}
                        Save
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                        className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md flex items-center"
                      >
                        <XMarkIcon className="h-4 w-4 mr-1" />
                        Cancel
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(true)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-md flex items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit Profile
                    </motion.button>
                  )}
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{user.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{user.email}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                      {editMode ? (
                        <textarea
                          name="bio"
                          value={user.bio}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{user.bio}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="location"
                          value={user.location}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
                        />
                      ) : (
                        <p className="text-gray-900 dark:text-white">{user.location || 'Not specified'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                      {editMode ? (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                            https://
                          </span>
                          <input
                            type="text"
                            name="website"
                            value={user.website}
                            onChange={handleInputChange}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 bg-gray-100 dark:bg-gray-700"
                          />
                        </div>
                      ) : user.website ? (
                        <a 
                          href={`https://${user.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-600 dark:text-purple-400 hover:underline"
                        >
                          {user.website}
                        </a>
                      ) : (
                        <p className="text-gray-900 dark:text-white">Not specified</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Login</label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(user.lastLogin).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium dark:text-white">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                  </h3>
                </div>
                <div className="p-6">
                  {activeTab === 'settings' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-md font-medium dark:text-white">Dark Mode</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
                        </div>
                        <button
                          onClick={toggleDarkMode}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? 'bg-purple-600' : 'bg-gray-200'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="text-md font-medium dark:text-white">Language Preferences</h4>
                        <select className="mt-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-700">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {activeTab !== 'settings' && (
                    <div className="text-center py-12">
                      <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500">
                        {activeTab === 'notifications' && <BellIcon className="h-full w-full" />}
                        {activeTab === 'security' && <LockClosedIcon className="h-full w-full" />}
                      </div>
                      <h3 className="mt-2 text-lg font-medium dark:text-white">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings coming soon
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        This section is under development and will be available soon.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;