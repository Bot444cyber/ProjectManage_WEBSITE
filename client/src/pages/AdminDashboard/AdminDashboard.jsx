import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon, 
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // User data state
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // UI state
  const [darkMode, setDarkMode] = useState(true);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastLogin] = useState(new Date().toLocaleString());

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/getalluser');
        const userData = response.data.map(user => ({
          ...user,
          joinDate: new Date(user.joinDate).toLocaleDateString()
        }));
        
        setUsers(userData);
        updateStatistics(userData);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Update statistics based on user data
  const updateStatistics = (userData) => {
    setStats({
      totalUsers: userData.length,
      activeUsers: userData.filter(u => u.status === 'active').length,
      newUsers: userData.filter(u => {
        const joinDate = new Date(u.joinDate);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return joinDate > thirtyDaysAgo;
      }).length
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit user
  const handleEdit = (user) => {
    setSelectedUser({...user});
    setIsEditing(true);
  };

  // Handle save user changes
  const handleSave = async () => {
    try {
      setSaveLoading(true);
      const response = await axios.post(
        `/api/updateuserbyid/${selectedUser._id}`, 
        selectedUser
      );
      
      // Update the users list with the edited user
      setUsers(users.map(user => 
        user._id === selectedUser._id ? selectedUser : user
      ));
      
      updateStatistics(users.map(user => 
        user._id === selectedUser._id ? selectedUser : user
      ));

      alert(response.data.message || "User updated successfully");
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Failed to update user");
    } finally {
      setSaveLoading(false);
    }
  };

  // Handle input changes in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      setDeleteLoading(true);
      const response = await axios.delete(`/api/deleteuserbyid/${id}`);
      
      // Update UI without reloading the page
      const updatedUsers = users.filter(user => user._id !== id);
      setUsers(updatedUsers);
      updateStatistics(updatedUsers);

      alert(response.data.message)
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} text-gray-900 dark:text-gray-100 transition-colors duration-300 w-[100vw]`}>
      {/* Navigation Bar */}
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
                  🤖
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
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    id="user-menu"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
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
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">admin@example.com</p>
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
                        to="/settings" 
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
              className="md:hidden"
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
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Admin Dashboard Content */}
      <div className="container mx-auto py-6 px-4">
        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-purple-500"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
              <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                <UserCircleIcon className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Active Users</p>
                <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
              </div>
              <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                <UserCircleIcon className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-green-500"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 dark:text-gray-400">New Users (30d)</p>
                <h3 className="text-2xl font-bold">{stats.newUsers}</h3>
              </div>
              <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                <UserCircleIcon className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-2">Loading users...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>Error loading users: {error}</p>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        )}

        {/* User Management Section */}
        {!loading && !error && users.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">User Management</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Join Date</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-3 px-4 truncate max-w-xs">{user._id}</td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-500 bg-opacity-20 text-purple-600 dark:text-purple-400' :
                          user.role === 'editor' ? 'bg-blue-500 bg-opacity-20 text-blue-600 dark:text-blue-400' :
                          'bg-gray-200 dark:bg-gray-600 bg-opacity-20 text-gray-600 dark:text-gray-400'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-500 bg-opacity-20 text-green-600 dark:text-green-400' :
                          user.status === 'inactive' ? 'bg-red-500 bg-opacity-20 text-red-600 dark:text-red-400' :
                          'bg-yellow-500 bg-opacity-20 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(user)}
                            className="bg-blue-500 bg-opacity-20 text-blue-600 dark:text-blue-400 p-2 rounded-full"
                            disabled={deleteLoading}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 bg-opacity-20 text-red-600 dark:text-red-400 p-2 rounded-full"
                            disabled={deleteLoading}
                          >
                            {deleteLoading ? (
                              <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-red-500 rounded-full"></div>
                            ) : (
                              <TrashIcon className="h-4 w-4" />
                            )}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit User Modal */}
      <AnimatePresence>
        {isEditing && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Edit User</h3>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
                    disabled={saveLoading}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={selectedUser.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={selectedUser.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-2">Role</label>
                    <select
                      name="role"
                      value={selectedUser.role}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-2">Status</label>
                    <select
                      name="status"
                      value={selectedUser.status}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    disabled={saveLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center min-w-24"
                    disabled={saveLoading}
                  >
                    {saveLoading ? (
                      <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                    ) : (
                      "Save Changes"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;