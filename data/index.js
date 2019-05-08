//index modules
const account = require("./account");
const comments = require("./comments");
const posts = require("./posts");
const search = require("./search");
const beverage = require("./beverage");
 
module.exports = {
	account: account,
	comments: comments,
	posts: posts,
	search: search,
	beverage: beverage
}
