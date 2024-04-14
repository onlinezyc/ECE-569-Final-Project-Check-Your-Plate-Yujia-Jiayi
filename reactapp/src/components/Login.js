import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);  // 新增状态来控制显示登录还是注册
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        const url = isRegistering ? 'http://localhost:5000/register' : 'http://localhost:5000/login';
        const bodyData = isRegistering ? 
            { email, password: password } : // 使用注册时正确的字段名
            { email, password }; // 登录使用正确的字段名
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            });
            const data = await response.json();
            if (response.ok) {
                if (isRegistering) {
                    console.log(data.message); // 注册成功
                    setIsRegistering(false); // 切换回登录视图
                } else {
                    login(); // 登录成功，调用 login 方法更新认证状态
                    console.log(data.message);
                }
            } else {
                console.log(data.message); // 登录或注册失败的错误消息
            }
        } catch (error) {
            console.error('Operation failed:', error);
        }
    };
    

    return (
        <div>
            <h1>{isRegistering ? "Register" : "Login"}</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Switch to Login" : "Switch to Register"}
                </button>
            </form>
        </div>
    );
}

export default Login;



