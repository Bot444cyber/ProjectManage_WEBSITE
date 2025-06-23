import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const sign_up = async (req, res) => {
    try {
        if (!req.body.name || !req.body.phoneNumber || !req.body.address || !req.body.email || !req.body.password) {
            return res.json({ error: "Missing required fields" })
        }

        const existingUser = await User.findOne({ 
            email: req.body.email
        })

        if(existingUser) {
            return res.json({ error: 'User email is already exist.' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            fatherName: req.body.fatherName || null,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            role: req.body.role || 'user'
        });

        if(user) {
            return res.json({
                message: 'User is registered successfully.'
            })
        }
        else if(!user) {
            return res.json({
                message: 'User is not registered.'
            })
        }
        else {
            return res.json({
                message: 'Unexpected Error Occure'
            })
        }
    } 
    catch (error) {
        console.log(' Server error : ', error)
    }
}

export const sign_in = async(req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.json({ message: 'Fill all the fields.' })
        }       
        
        const user = await User.findOne({
            email: email,
        })

        if(!user) {
            return res.json({
                message: 'Email is incorrect.'
            })
        }
        
        const hashedEncodedPassword = await bcrypt.compare(password, user.password)
        if(user && hashedEncodedPassword) {
            const token = jwt.sign({ userId: user._id, role: user.role }, "!@#$%()", {
                expiresIn: '1d'
            })
            
            return res.json({ 
                tokken: token 
            })
        }
        else {
            return res.json({
                message: 'Access => False'
            })
        }
    }
    catch (error) {
        console.log(' Server error : ', error)
    }
}

export const getall_User = async(req, res) => {
    try {
        const user = await User.find()

        if(!user) {
            res.json({
                message: 'User is not exist.'
            })
        }
        else {
            res.json(user)
        }
    } 
    catch (error) {
        console.log(error.message)
    }
}

export const getuserby_Id = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) {
            res.json({
                message: 'ID not valid.'
            })
        }
        else {
            res.json(user)
        }
    }
    catch (error) {
        console.log(error.message)
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }
        else {
            res.status(200).json({
                status: 'success',
                message: 'User deleted successfully',
                data: { id: deletedUser._id }
            })
        }

    } catch (error) {
        console.error('Delete User Error:', error.message)
    }
}

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'No valid fields provided for update'
            });
        }
        else {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10)
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )

        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            })
        }
        else {
            res.status(200).json({
                status: 'success',
                message: 'User updated successfully',
                data: updatedUser
            })
        }
    } catch (error) {
        console.error('Update User Error:', error.message);
    }
}

