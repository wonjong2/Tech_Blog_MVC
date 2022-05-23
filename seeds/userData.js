const { User } = require('../models');

const userData = [
    {
        user_name: 'Worriors',
        password: '12345678'
    },
    {
        user_name: 'Lakers',
        password: '23456789'
    },
    {
        user_name: 'Seahawks',
        password: '34567890'
    },
];

const seedUsers = async () => User.bulkCreate(userData);

module.exports = seedUsers;