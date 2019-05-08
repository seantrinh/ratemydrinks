//Logging/logging out in modules
const account = require("./collections").account;
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const create_obj = async function create_obj (email,screen_name,bio, password){
	let salt = await bcrypt.genSalt(saltRounds);
	let hash = (await bcrypt.hash(password,salt));
	 return {
		Email: email,
		ScreenName: screen_name,
		Bio: bio,
		Comments: [],
		password: hash ,
	}

};
const createAccount = async function createAccount(email, screen_name,bio, password) {
		//given an email and password, create an account and store
		//email, screenname, password(HASHED), bio
		// email and screenname unique
		//comments empty list
		//create a cookie (type string)
		var acc = await account();
		var obj = await create_obj(email,screen_name,bio,password);
		const insertInfo = await acc.insertOne(obj);
			if(insertInfo.insertedCount==0){
				throw "Could not add animal";
			}
		

	};
const getUserByScreenName = async function  getUserByScreenName(screenName) {
		//returns the user with the given screenname
		if(screenName === undefined){
			throw "screenName not given";
		}
		if(typeof screenName !== "string"){
			throw "screenName not of type string";
		}
		const acc = await account();
		const result = await acc.findOne({ScreenName: screenName});
		if(result===null){
			throw ("no user with given ScreenName");
		}
		return result;
	};

//async getUserBySession(sid) {
		//returns the user object if the sid is valid
		//else throw an error
	//},
const validate  = async function validate(screenName, password) {
		//validate the login credentials

		let obj = await getUserByScreenName(screenName);

		if(bcrypt.compare(password,obj.password)){
			return true;
		}
		return false;

	};
	// async addSession(sid) {
	// 	//create a session given the email and sid

	// },
	// async deleteSession(sid) {
	// 	//delete the session if it exists
	// },
	// async getUserByCookie(cookie) {
	// 	//get user by cookie
	// },
const addComment = 	async function addComment(screenName,cid) {
		//add comment
		if(screenName===undefined){
			throw "screenName not given";
		}
		if (typeof screenName!== "string"){
			throw "screenName not of type string";
		}
		if( cid === undefined){
			throw "cid not given";
		}
		if(typeof cid!== "string"){
			throw "cid not of type string";
		}

		const acc = await account();
		const update_info = await acc.updateOne({ScreenName: screenName},{$addToSet:{Comments: cid}});
		if(update_info.modifiedCount===0){
			throw ("no screenName named "+ screenName+ " had its comments list updated");
		}

	};

const deleteComment = 	async function deleteComment(screenName, cid) {
		//delete comment
		//add comment
		if(screenName===undefined){
			throw "screenName not given";
		}
		if (typeof screenName!== "string"){
			throw "screenName not of type string";
		}
		if( cid === undefined){
			throw "cid not given";
		}
		if(typeof cid!== "string"){
			throw "cid not of type string";
		}

		const acc = await account();
		const update_info = await acc.updateOne({ScreenName: screenName}, {$pull:{Comments: cid}});
		if(update_info.modifiedCount===0){
			throw ("no screenName named "+ screenName+ " had its comments list updated");
		}
	}	

module.exports = {
	createAccount,
	deleteComment,
	addComment,
	validate,
	getUserByScreenName
	
		
}
