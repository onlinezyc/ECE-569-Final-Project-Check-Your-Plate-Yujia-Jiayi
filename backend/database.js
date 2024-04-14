const { Sequelize } = require('sequelize');

// 连接到一个 SQLite 数据库
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'  // 数据库文件的位置
});

// 测试连接
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
