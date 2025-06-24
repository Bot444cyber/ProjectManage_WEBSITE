import axios from 'axios';
import '../assets/styles/signup.css';
import React, { useState } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        terms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 0) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(Math.min(strength, 4));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        
        if (!formData.terms) {
            alert("You must accept the terms and conditions");
            return;
        }
    
        try {
            const response = await axios.post('/api/sign_up', formData);
            console.log("Response:", response.data);
             
            setFormData({
                name: '',
                fatherName: '',
                phoneNumber: '',
                address: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'user',
                terms: false
            });
            
            alert("Registration successful!");
        } catch (error) {
            // 4. Better error handling
            console.error("Registration failed:", error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="signup-wrapper" style={{ width: '1500px', maxWidth: 'none' }}>
            <div className="signup-container" style={{ width: '150%' }}>
                <div className="signup-header">
                    <div className="logo">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <h1>Create Account</h1>
                    <p>Join us today and unlock exclusive features</p>
                </div>
                
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-with-icon">
                            <i className="fas fa-user"></i>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                placeholder="Enter your full name" 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="fatherName">Father's Name</label>
                        <div className="input-with-icon">
                            <i className="fas fa-user-friends"></i>
                            <input 
                                type="text" 
                                id="fatherName" 
                                name="fatherName"
                                placeholder="Enter your father's name" 
                                value={formData.fatherName}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className="input-with-icon">
                            <i className="fas fa-phone"></i>
                            <input 
                                type="tel" 
                                id="phoneNumber" 
                                name="phoneNumber"
                                placeholder="Enter your phone number" 
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <div className="input-with-icon">
                            <i className="fas fa-map-marker-alt"></i>
                            <input 
                                type="text" 
                                id="address" 
                                name="address"
                                placeholder="Enter your address" 
                                value={formData.address}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                placeholder="Enter your email" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                name="password"
                                placeholder="Create a password" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                            />
                            <i 
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        <div className="password-strength">
                            {[1, 2, 3, 4].map((level) => (
                                <span 
                                    key={level}
                                    className={`strength-bar ${passwordStrength >= level ? 'active' : ''}`}
                                    data-strength={level}
                                ></span>
                            ))}
                            <span className="strength-text">
                                {passwordStrength === 0 ? 'Very Weak' : 
                                 passwordStrength === 1 ? 'Weak' : 
                                 passwordStrength === 2 ? 'Moderate' : 
                                 passwordStrength === 3 ? 'Strong' : 'Very Strong'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="input-with-icon">
                            <i className="fas fa-lock"></i>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                id="confirmPassword" 
                                name="confirmPassword"
                                placeholder="Confirm your password" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required 
                            />
                            <i 
                                className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                onClick={toggleConfirmPasswordVisibility}
                            ></i>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <div className="input-with-icon">
                            <i className="fas fa-user-tag"></i>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="role-select"
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group terms-group">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                        />
                        <label htmlFor="terms">
                            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                        </label>
                    </div>
                    
                    <button type="submit" className="signup-button">Create Account</button>
                    
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    
                    <div className="social-signup">
                        <button type="button" className="social-button google">
                            <i className="fab fa-google"></i> Sign up with Google
                        </button>
                        <button type="button" className="social-button microsoft">
                            <i className="fab fa-microsoft"></i> Sign up with Microsoft
                        </button>
                    </div>
                    
                    <div className="login-link">
                        Already have an account? <a href="/login">Log in</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;