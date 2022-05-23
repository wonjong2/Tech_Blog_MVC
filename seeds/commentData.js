const { Comment } = require('../models');

const commentData = [
    {
        comment: `Agreed to your opinion`,
        date: '1 10 2021',
        commentor_id: 3,
        post_id: 1
    },
    {
        comment: `Great idea~!!!`,
        date: '5 9 2021',
        commentor_id: 1,
        post_id: 2
    },
    {
        comment: `Expecting your next post`,
        date: '5 17 2022',
        commentor_id: 2,
        post_id: 3
    },
    {
        comment: `Happy new year!`,
        date: '5 17 2022',
        commentor_id: 2,
        post_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;