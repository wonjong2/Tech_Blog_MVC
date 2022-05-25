const { User } = require('../models');

let userData = [
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
    {
        user_name: 'wonjong2',
        password: '123456789'
    },
];

const seedUsers = async () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUsers;