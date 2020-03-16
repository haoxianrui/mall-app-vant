
const Mock = require('mockjs');

Mock.mock('/home', 'get', require('./json/home'))
