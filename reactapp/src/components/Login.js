// reactapp/components/Login.js
import React, { useState } from 'react';
import './Login.css';


function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 处理表单提交
    const handleSubmit = (event) => {
        event.preventDefault();
        // process login
        console.log('Login submitted:', { email, password });
        // using api
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
