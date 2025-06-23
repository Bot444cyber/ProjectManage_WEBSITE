import mongoose from 'mongoose';
import Project from '../Models/Project.js';

// Create a new project
export const createProject = async (req, res) => {
    try {
      const project = new Project({
        ...req.body,
        createdBy: req.body.createdBy
      });
  
      const savedProject = await project.save();
      res.status(201).json(savedProject);
    } 
    catch (error) {
      console.error('Error creating project:', error);
      res.status(400).json({ 
        error: error.message,
        details: error.errors 
      })
    }
};

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()

        if(projects) {
            res.status(200).json(projects);
        }
        else {
            return res.json({
                message: 'No Projects'
            })
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        else {
            res.status(200).json(project);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

// Update project details
export const updateProject = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'status', 'startDate', 'endDate', 'priority'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        updates.forEach(update => project[update] = req.body[update]);
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};

// Add a team member to project
export const addTeamMember_Project = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (project.teamMembers.includes(userId)) {
            return res.status(400).json({ error: 'User already in team' });
        }

        project.teamMembers.push(userId);
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove a team member from project
export const removeTeamMember_Project = async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.teamMembers = project.teamMembers.filter(
            memberId => !memberId.equals(userId)
        );
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

