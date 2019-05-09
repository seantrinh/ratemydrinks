const posts = require("./collections").posts;
const ObjectId = require('mongodb').ObjectId;
const beverage = require('./beverage');

//Post modules
module.exports = {
	// the photo path is supposed to be handled in the route for post
    //https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
    //https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642

    // beverage_id is just the beverage name as a string
    async postReview(content, screenName, photoPath, rating, beverage_id) {
        if (content === undefined || screenName === undefined || photoPath === undefined || rating ===undefined|| beverage_id === undefined){
            throw 'Not all parameters passed for post';
        }
        const postCollection = await posts();
        let new_post = {
            content: content,
            author_id : screenName,
            photo_path : photoPath,
            rating: rating,
            beverage_id: beverage_id
        };
        let insert_result = await postCollection.insertOne(new_post);
        if (insert_result.insertedCount === 0){
            throw 'Error: nothing inserted';
        } 
        let update_result = await beverage.updateRating(beverage_id, rating);
        return new_post;
	},
    // assuming pid is string representation
	async getPostByPid(pid) {
		//get the post object
        const postCollection = await posts();
        let ret = await postCollection.findOne({_id:ObjectId(pid)});
        return ret; 
	},
	async deleteReview(pid) {
		//given a pid, delete the review in the database
        const postCollection = await posts();
	    let post = await this.getPostByPid(pid); 
        let deleteInfo = await postCollection.deleteOne({_id:ObjectId(pid)}); 
        if (deleteInfo.deletedCount === 0){
            throw 'Could not delete animal';
        }
        let update_result = await beverage.updateRating(post.beverage_id, -1 * post.rating);
        return true;
    }
}
