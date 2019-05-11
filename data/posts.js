const posts = require("./collections").posts;
const ObjectId = require('mongodb').ObjectId;
const beverage = require('./beverage');
const fs = require('fs').promises;

//Post modules
// Relies on beverage implementation of updateRating, the rest is super simple and has been tested
module.exports = {
    // the photo path is supposed to be handled in the route for post
    //https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
    //https://medium.com/@nitinpatel_20236/image-upload-via-nodejs-server-3fe7d3faa642
    // beverage_id is just the beverage name as a string
    async postReview(content, screenName, photoPath, rating, beverage_id, title) {
        if (content === undefined || screenName === undefined || photoPath === undefined || rating === undefined|| beverage_id === undefined || title === undefined){
            throw 'Not all parameters passed for post';
        }
        try{
            await beverage.getBeverageByName(beverage_id);
        }
        catch(e){
            throw 'Error: no beverage with this name exists';
        }
        const postCollection = await posts();
        let new_post = {
            content: content,
            author_id : screenName,
            photo_path : photoPath,
            rating: rating,
            beverage_id: beverage_id,
            title:title
        };
        let insert_result = await postCollection.insertOne(new_post);
        if (insert_result.insertedCount === 0){
            throw 'Error: nothing inserted';
        } 
        
        //let update_result = await beverage.updateRating(beverage_id, rating);
        new_post._id = insert_result.insertedId;
        return new_post;
	},
    // assumin pid is string representation
	async getPost(pid) {
		//get the post object 
        if (pid === undefined){
            throw 'Error: no pid provided in getPost';
        }
        const postCollection = await posts();
        let ret = null;
        try{
            ret = await postCollection.findOne({_id:ObjectId(pid)});
        }
        catch(e){
            throw 'Error';
        }
        return ret; 
	},
	

    async deletePost(pid) {
		//given a pid, delete the review in the database
        if (pid === undefined){
            throw 'Error: no pid provided in delete';
        }
        const postCollection = await posts();
	    let post = await this.getPost(pid); 
        let deleteInfo = await postCollection.deleteOne({_id:ObjectId(pid)}); 
        if (deleteInfo.deletedCount === 0){
            throw 'Could not delete post';
        }
        // try to delete the phot because there should be a one to one correlation with posts and photos
        try{
            await fs.unlink("/public/images/" + post.photo_path);
        }   
        catch(e){
            console.log('Error : could not delete photo ' + "/public/images/" + post.photoPath);
        }
        let update_result = await beverage.updateRating(post.beverage_id, -1 * post.rating);
        return true;
    },
    
    async getPostsWithUser(user_id){
        const postCollection = await posts();
        if (name === undefined){
            throw 'Error: no name provided';
        }
        let ret = await postCollection.find({author_id:user_id}).toArray();
        return ret;
    },

    // Load all posts with beverage name
    async getPostsWithBeverageName(name){
        const postCollection = await posts();
        if (name === undefined){
            throw 'Error: no name provided';
        }
        let ret = await postCollection.find({beverage_id:name}).toArray();
        return  ret;
    }
}
