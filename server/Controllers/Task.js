import Task from '../Models/Task.js';

export const create_task = async (req, res) => {
    try {
        if (!req.body.title || !req.body.dueDate || !req.body.assignee) {
            return res.json({ error: "Missing required fields" })
        }

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description || null,
            dueDate: req.body.dueDate,
            priority: req.body.priority || 'Medium',
            assignee: req.body.assignee,
            createdBy: req.body.createdBy
        });

        console.log('Data of user :- ', req.body)

        if(task) {
            return res.json({
                message: 'Task is created successfully.'
            })
        }
        else {
            return res.json({
                message: 'Task is not created.'
            })
        }
    } 
    catch (error) {
        console.log(' Server error : ', error)
        return res.json({
            message: 'Unexpected Error Occurred'
        })
    }
}

export const getall_Task = async(req, res) => {
    try {
        const tasks = await Task.find()
        if(!tasks || tasks.length === 0) {
            return res.json({
                message: 'No tasks exist.'
            })
        }
        else {
            return res.json(tasks)
        }
    } 
    catch (error) {
        console.log(error.message)
        return res.json({
            message: 'Server error occurred'
        })
    }
}

export const gettask_byId = async(req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
            .populate('assignee', 'name email')
            .populate('createdBy', 'name email');

        if(!task) {
            return res.json({
                message: 'Task not found.'
            })
        }
        else {
            return res.json(task)
        }
    }
    catch (error) {
        console.log(error.message)
        return res.json({
            message: 'Server error occurred'
        })
    }
}

export const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedTask = await Task.findByIdAndDelete(id)
        
        if (!deletedTask) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            })
        }
        else {
            return res.status(200).json({
                status: 'success',
                message: 'Task deleted successfully',
                data: { id: deletedTask._id }
            })
        }
    } catch (error) {
        console.error('Delete Task Error:', error.message)
        return res.status(500).json({
            status: 'error',
            message: 'Server error occurred'
        })
    }
}

export const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'No valid fields provided for update'
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            })
        }
        else {
            return res.status(200).json({
                status: 'success',
                message: 'Task updated successfully',
                data: updatedTask
            })
        }
    } catch (error) {
        console.error('Update Task Error:', error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Server error occurred'
        })
    }
}
