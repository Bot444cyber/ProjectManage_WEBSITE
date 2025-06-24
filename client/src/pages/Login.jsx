import axios from 'axios';
import '../assets/styles/login.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css"; 

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = { email, password, rememberMe }
      
        axios.post('/api/sign_in', data)
          .then((response) => {
            if(response.data.tokken) {
                localStorage.setItem('token', JSON.stringify(response.data.tokken))
                navigate('/home')
            }
            else {
                alert('Invaild')
            }
          })
          .catch((err) => {
            if (err.response) {
              console.error("Server error:", err.response.data)
              alert(err.response.data.message || "Login failed")
            } else {
              console.error("Request error:", err.message)
              alert("Network error. Please try again.")
            }
          })
    };

    return (
        <div className="dark-login-container" style={{ width: '600px', maxWidth: 'none' }}>
            <div className="login-card" style={{ width: '100%' }}>
                <div className="login-header">
                    <div className="logo">
                        <i className="fas fa-user-shield"></i>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Please enter your credentials to login</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="Enter your password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i 
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                    </div>
                    
                    <div className="form-options">
                        <div className="remember-me">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    
                    <button type="submit" className="login-button">Login</button>
                    
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    
                    <div className="social-login">
                        <button type="button" className="social-button google">
                            <i className="fab fa-google"></i> Continue with Google
                        </button>
                        <button type="button" className="social-button microsoft">
                            <i className="fab fa-microsoft"></i> Continue with Microsoft
                        </button>
                    </div>
                    
                    <div className="signup-link">
                        Don't have an account? <a href="/register">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const Logout = () => {
    localStorage.removeItem('token')
    alert("Logout Successfully")
}

