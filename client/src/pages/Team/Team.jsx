import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('/api/getallteam');
        setTeams(Array.isArray(response?.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
        setTeams([]);
      }
    };
    
    fetchTeams();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUserLoading(true);
        const response = await axios.get('/api/getalluser');
        setUsers(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setUserLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Add new team
  const addTeam = async () => {
    if (!newTeamName.trim()) return;
    
    try {
      setActionLoading(true);
      const response = await axios.post('/api/createteam', {
        name: newTeamName
      });
      
      setTeams(prevTeams => [...prevTeams, response.data]);
      setNewTeamName('');
      setShowAddTeamModal(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete team
  const removeTeam = async (teamId) => {
    try {
      setActionLoading(true);
      await axios.delete(`/api/getteambyid/${teamId}`);
      setTeams(prevTeams => prevTeams.filter(team => team._id !== teamId));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Add member to team
  const addMemberToTeam = async (userId) => {
    if (!selectedTeam) {
      setError("No team selected");
      return;
    }
  
    try {
      setActionLoading(true);
      const response = await axios.post('/api/addmember', {
        teamId: selectedTeam,
        userId: userId
      });
      
      // Update the specific team in state
      setTeams(prevTeams => prevTeams.map(team => 
        team._id === selectedTeam ? response.data : team
      ));
      
      setShowAddMemberModal(false);
    } catch (error) {
      setError(`Failed to add member: ${error.response?.data?.message || error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Remove member from team
  const removeMemberFromTeam = async (teamId, memberId) => {
    try {
      setActionLoading(true);
      const response = await axios.post('/api/removemember', {
        teamId,
        memberId
      });
      
      // Update the specific team in state
      setTeams(prevTeams => prevTeams.map(team => 
        team._id === teamId ? response.data : team
      ));
    } catch (error) {
      setError(`Failed to remove member: ${error.response?.data?.message || error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Team Management
            </h1>
            <p className="text-gray-400 mt-2">Manage your development teams and members</p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddTeamModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center"
              disabled={actionLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {actionLoading ? 'Processing...' : 'Add Team'}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Teams Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid gap-6"
      >
        {Array.isArray(teams) && teams.length > 0 ? (
          teams.map((team) => (
            <motion.div
              key={team._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-gray-600"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {team.name || 'Unnamed Team'}
                  </h2>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedTeam(team._id);
                        setShowAddMemberModal(true);
                      }}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-300"
                      title="Add Member"
                      disabled={actionLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeTeam(team._id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-full transition-colors duration-300"
                      title="Delete Team"
                      disabled={actionLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Team Members */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {team.members?.length > 0 ? (
                    team.members.map((member) => (
                      <motion.div
                        key={member._id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-3"
                      >
                        <img 
                          src={member.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.user?.name || '')}`} 
                          alt={member.user?.name || 'Team member'} 
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-600"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.user?.name || '')}`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">{member.user?.name || 'Unnamed Member'}</h3>
                          <p className="text-xs text-gray-400 truncate">{member.role || 'Member'}</p>
                          {member.user?.bio && (
                            <p className="text-xs text-gray-500 mt-1 truncate">{member.user.bio}</p>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeMemberFromTeam(team._id, member.user._id)}
                          className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                          title="Remove Member"
                          disabled={actionLoading}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-4 text-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <p>No members in this team yet</p>
                      <button 
                        onClick={() => {
                          setSelectedTeam(team._id);
                          setShowAddMemberModal(true);
                        }}
                        className="mt-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300"
                        disabled={actionLoading}
                      >
                        Add Member
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center py-16"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-300 mt-4">No teams created yet</h3>
            <p className="text-gray-500 mt-2">Get started by creating your first team</p>
            <button
              onClick={() => setShowAddTeamModal(true)}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-300"
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Create Team'}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Add Team Modal */}
      <AnimatePresence>
        {showAddTeamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddTeamModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Create New Team</h3>
                <button 
                  onClick={() => setShowAddTeamModal(false)}
                  className="text-gray-400 hover:text-white"
                  disabled={actionLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Team Name</label>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Frontend Team"
                    disabled={actionLoading}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowAddTeamModal(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTeam}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center justify-center"
                    disabled={actionLoading || !newTeamName.trim()}
                  >
                    {actionLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : 'Create Team'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddMemberModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add Team Member</h3>
                <button 
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-gray-400 hover:text-white"
                  disabled={actionLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {userLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {users.length > 0 ? (
                      <ul className="space-y-2">
                        {users.map((user) => (
                          <li key={user._id}>
                            <button
                              onClick={() => addMemberToTeam(user._id)}
                              className="w-full text-left p-3 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center"
                              disabled={actionLoading}
                            >
                              <img 
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                                alt={user.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                              <div>
                                <p className="font-medium text-white">{user.name}</p>
                                <p className="text-xs text-gray-400">{user.role || 'Member'}</p>
                                {user.bio && (
                                  <p className="text-xs text-gray-500 mt-1 truncate">{user.bio}</p>
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No users available to add
                      </div>
                    )}
                  </div>
                )}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowAddMemberModal(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors duration-300"
                    disabled={actionLoading}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;