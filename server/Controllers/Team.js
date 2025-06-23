import Team from '../Models/Team.js';
import User from '../Models/User.js';

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members.user', 'name email avatar role bio');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members.user', 'name email avatar role bio');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new team
export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Team name is required' });
    }
    
    const newTeam = new Team({
      name,
      members: []
    });
    
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete team
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add member to team
export const addTeamMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    
    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    
    if (!team || !user) {
      return res.status(404).json({ message: 'Team or user not found' });
    }
    
    const memberExists = team.members.some(m => m.user.toString() === userId);
    if (memberExists) {
      return res.status(400).json({ message: 'Member already in team' });
    }
    
    team.members.push({
      user: userId,
      role: user.role || 'Member'
    });
    
    await team.save();
    
    const populatedTeam = await Team.findById(teamId).populate('members.user', 'name email avatar role bio');
    res.json(populatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove member from team
export const removeTeamMember = async (req, res) => {
  try {
    const { teamId, memberId } = req.body;
    
    const team = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: { user: memberId } } },
      { new: true }
    ).populate('members.user', 'name email avatar role bio');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};