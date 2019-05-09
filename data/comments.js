//Comments modules
module.exports = {
	async addComment(user, pid, content) {
		//Create a comment in the database
		//given the user making the comment
		//	the pid of the post he/she is commenting on
		//	and the content of the comment
	},
	async deleteComment(cid) {
		//Given a comment id, delete the comment from the database
	},
    // Given a post id delete all comments with said pid
    async deleteCommentsWithPid(pid){

    }
}
