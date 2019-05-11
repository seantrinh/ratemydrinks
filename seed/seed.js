const postsData = require('../data/posts');
const commentData = require('../data/comments');
const beverageData = require("../data/beverage");
const userData = require("../data/account");
const comments = require('./commentsSeed.js');
const posts = require('./postSeed');
const beverages = require('./beverageSeed');
const users = require('./userSeed');

const seedUsers = async () => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await userData.createAccount(user.email, user.screen_name, user.bio, user.password);
    }
};


const seedPosts = async () => {
    let postInfo = [];
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const newPost = await postsData.postReview(
            post.content
            , post.author_id
            , post.photo_path
            , post.rating 
            , post.beverage_id 
            , post.title
        );
        postInfo.push({
            _id: newPost._id,
            title: newPost.title
        });
    }
    return postInfo;
}

const addComments = async (postInfo) => {
    for (let i = 0; i < postInfo.length; i++) {
        const post = postInfo[i];
        if (post.title === "You won't believe how great this orange juice is!") {
            const comment = comments[0];
            const comment2 = comments[1];
            await commentData.addComment(comment.user_id, post._id, comment.content);
            await commentData.addComment(comment2.user_id, post._id, comment2.content);
        }
        else if (post.title === "Great to drink, not to look at") {
            const comment = comments[2];
            await commentData.addComment(comment.user_id, post._id, comment.content);
        }
        else if (post.title === "A great beer for great people") {
            const comment = comments[3];
            await commentData.addComment(comment.user_id, post._id, comment.content);
        }
    }
};

const addBeverages = async () => {
    for (let i = 0; i < beverages.length; i++) {
        const beverage = beverages[i];
        await beverageData.createBeverage(beverage.type, beverage.subtype, beverage.tastes, beverage.name, beverage.company);
    }
};



(async () => {
    await addBeverages();
    await seedUsers();
    // console.log("im done");
    // const beverage = await beverageData.getBeverageByName("Poland Spring Water Bottle");
    const postInfo = await seedPosts();
    await addComments(postInfo);
})();

module.exports = seedPosts;