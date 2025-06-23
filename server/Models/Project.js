import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed', 'On Hold', 'Cancelled'],
        default: 'Planning'
    },
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    teamMembers: [{
        type: String,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId
        ref: 'User', // Reference to User model
        required: [true, 'CreatedBy is required']
    }
});

export default mongoose.model('Project', projectSchema);

