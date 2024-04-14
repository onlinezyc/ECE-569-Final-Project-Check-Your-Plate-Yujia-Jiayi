const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 注册用户
app.post('/register', async (req, res) => {
    const { email, regPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(regPassword, 10); // 对密码进行加密
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// 用户登录
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // 比对密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // 登录成功
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// 数据库同步，并启动服务器
sequelize.sync({ force: true }).then(() => {
    console.log("数据库同步完成。");
    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error) => {
    console.error("数据库同步失败:", error);
});
