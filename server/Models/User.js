import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    fatherName: { 
        type: String, 
        required: false 
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone number is required'],
        unique: true
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    bio: {
        type: String,
        required: false
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    role: { 
        type: String, 
        required: [true, 'Role is required'],
        enum: ['user', 'admin', 'seller'],
        default: 'user'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('User', userSchema);

