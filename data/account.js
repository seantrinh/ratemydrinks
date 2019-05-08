//Logging/logging out in modules
module.exports = {
	async createAccount(email, password) {
		//given an email and password, create an account and store
	}
	async getUserByEmail(email) {
		//returns the user object if the email is valid
		//else throw an error
	},
	async getUserBySession(sid) {
		//returns the user object if the sid is valid
		//else throw an error
	},
	async validate(email, password) {
		//validate the login credentials
	},
	async addSession(email, sid) {
		//create a session given the email and sid
	},
	async deleteSession(sid) {
		//delete the session if it exists
	}
}
