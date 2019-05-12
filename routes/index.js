const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");
const login_signup  = require("./login_signup");
const post_review = require("./post_review");
const post_status = require("./post_status");
const beverage = require("./beverage");
const home = require("./home");
const home_unauth = require("./home_unauth");
const post_page = require("./post_page");
const post_beverage = require("./post_beverage");
const beverage_status = require("./beverage_status");

const index = app=>{
	function logging (req,res,next){
		let usr = null;
		if(req.session.user){
			usr = "(Authenticated User)";
		}else{
			usr = "(Non-Authenticated User)";
		}
		
		console.log("["+(new Date().toUTCString())+"] "+ req.method+" "+req.originalUrl+" "+usr);
		next();
	}
	app.get("/",(req,res)=>{
		res.redirect("/home");
	});
	app.use(logging);
	app.use('/login_signup',login_signup)
	app.use('/login',login);
	app.use('/logout',logout);
	app.use('/signup',signup);
	app.use('/post_review',post_review); 
	app.use('/post_status',post_status);
	app.use('/beverage',beverage);
	app.use('/home',home);
	app.use('/home_unauth',home_unauth);
	app.use('/post',post_page);
	app.use('/post_beverage',post_beverage);
	app.use('/beverage_status',beverage_status);
	app.get("*",(req,res)=>{ 
		res.status(404).send("Page not Found");;
	});

}


module.exports = index;
