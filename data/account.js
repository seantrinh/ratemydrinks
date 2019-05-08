//Logging/logging out in modules
module.exports = {
	async createAccount(email, password) {
		//given an email and password, create an account and store
		//email, screenname, password(HASHED), bio
		// email and screenname unique
		//comments empty list
		//create a cookie (type string)
	},
	async getUserByScreenName(screenName) {
		//returns the user with the given screenname
	},
	//async getUserBySession(sid) {
		//returns the user object if the sid is valid
		//else throw an error
	//},
	async validate(screenName, password) {
		//validate the login credentials
	},
	async addSession(sid) {
		//create a session given the email and sid
	},
	async deleteSession(sid) {
		//delete the session if it exists
	},
	async getUserByCookie(cookie) {
		//get user by cookie
	},
	async addComment(cid) {
		//add comment
	},
	async deleteComment(cid) {
		//delete comment
	}	
}
