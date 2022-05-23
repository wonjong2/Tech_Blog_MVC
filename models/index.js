const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post);

Post.belongsTo(User, {
    foreignKey: 'creator_id',
});

User.hasMany(Comment);

Comment.belongsTo(User, {
    foreignKey: 'commentor_id',
});

Post.hasMany(Comment);

Comment.belongsTo(post, {
    foreignKey: 'post_id',
});


module.exports = { User, Post, Comment };