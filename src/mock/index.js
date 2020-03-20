
const Mock = require('mockjs');

Mock.mock('/home', 'get', require('./json/home'))

Mock.mock('/login', 'post', require('./json/login'))