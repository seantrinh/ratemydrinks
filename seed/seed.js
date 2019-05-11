const postsData = require('../data/posts');
const commentData = require('../data/comments');
const beverageData = require("../data/beverage");
const comments = require('./commentsSeed.js');
const posts = require('./postSeed');
const beverages = require('./beverageSeed');


const seedPosts = async () => {
    let postInfo = [];
    posts.forEach(async (post) => {
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
    });
    return postInfo;
}

const addComments = async (postInfo) => {
    postInfo.forEach(async (post) => {
        if (post.title === "You won't believe how great this orange juice is!") {
            const comment = comments[0];
            const comment2 = comments[1];
            await commentData.addComment(comment.user_id, post._id.toString(), comment.content);
            await commentData.addComment(comment2.user_id, post._id.toString(), comment2.content);
        }
        else if (post.title === "Great to drink, not to look at") {
            const comment = comments[2];
            await commentData.addComment(comment.user_id, post._id.toString(), comment.content);
        }
        else if (post.title === "A great beer for great people") {
            const comment = comments[3];
            await commentData.addComment(comment.user_id, post._id.toString(), comment.content);
        }
    });
};

(async () => {
    beverages.forEach( async (beverage) => {
        await beverageData.createBeverage(beverage.type, beverage.subtype, beverage.tastes, beverage.name, beverage.company)
    })
    // const beverage = await beverageData.getBeverageByName("Poland Spring Water Bottle");
    const postInfo = await seedPosts();
    await addComments(postInfo);
})();

module.exports = seedPosts;