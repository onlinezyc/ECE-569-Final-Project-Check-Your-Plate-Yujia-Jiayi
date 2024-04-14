import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import RecipeLibrary from './components/RecipeLibrary'; // 引入 RecipeLibrary 组件
import { AuthProvider } from './context/AuthContext'; // 引入 AuthProvider


function App() {
  return (
    <AuthProvider> {/* 将整个路由器封装在AuthProvider内 */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes" element={<RecipeLibrary />} /> {/* 添加RecipeLibrary路由 */}
          {/* other Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;