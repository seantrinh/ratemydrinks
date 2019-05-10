//Comments modules
const comments = require("./collections").comments;
const ObjectId = require('mongodb').ObjectId;
//const fs = require('fs').promises;
const account = require('./account');
const posts = require('./posts');
 
module.exports = {
	async addComment(user, pid, content) {
		//Create a comment in the database
		//given the user making the comment
		//	the pid of the post he/she is commenting on
		//	and the content of the comment
		if (user === undefined || pid == undefined || content === undefined) {
			throw "Not all parameters passed for comments";
		}
		const commentCollection = await comments();
		try {
			await account.getUserByScreenName(user);
			await posts.getPost(pid);
		} catch (e) { throw "The user and/or pid are invalid!"; }
		let new_comment = {
			user_id: user,
			post_id: post,
			content: content
		};
		let insert = await commentCollection.insertOne(new_comment);
		if (insert.insertedCount === 0) { throw "Comment not inserted!"; }
		return new_comment;
	},
	async getComment(cid) {
		//Retrieve the comment with the given cid
		if (cid === undefined) { throw "No cid provided to get!"; }
		const commentCollection = await comments();
		let ret = await commentCollection.findOne({ _id: ObjectId(cid) });
		return ret;
	},
	async deleteComment(user, cid) {
		//Given a comment id, delete the comment from the database
		if (cid === undefined) { throw "No cid provided to delete!"; }
		const commentCollection = await comments();
		let comment = await this.getComment(cid);
		let deleteInfo = await commentCollection.deleteOne({ _id: ObjectId(cid) });
		if (deleteInfo.deletedCount === 0) { throw "Comment not deleted!"; }
		//Given the name of the user, delete the comment from his/her comments list
		try {
			await account.deleteComment(user, cid);
		} catch (e) { throw "The comment could not be removed from the user's comment list"; }
		
	},
    	async deleteCommentsWithPid(pid){
		//Delete comments associated with a given post id
		if (pid === undefined) { throw "No pid provided to delete comments from!"; }
		const commentCollection = await comments();
		const comment_array = await commentCollection.find({}).toArray();
		comment_array.forEach(async function(comment) {
			const comment = this.getComment(comment.id);
			if (comment.post_id === pid) {
				let user = comment.user_id;
				let comment_id = comment.id;
				await this.deleteComment(user, comment_id);
			}
		});
    	}
}
console.log("test");
