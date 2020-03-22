const Mock = require('mockjs');

Mock.mock('/home', 'get', require('./json/home'))

Mock.mock('/login', 'post', require('./json/login'))

Mock.mock('/coupon','get',require('./json/coupon'))

Mock.mock('/order','get',require('./json/order'))