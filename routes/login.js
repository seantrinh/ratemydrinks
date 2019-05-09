const express = require("express");
const router = express.Router();
const path = require("path");
const acc = require("../data").account;

router.post("/",async (req,res)=>{
	let usr = req.body.username;
	let pass = req.body.password;
	let valid = null;
	try{
		valid = await acc.validate(usr,pass);
	}catch(e){
		res.render('layouts/login_signup', { layout:false, login_error:"Incorrect Username or Password"});
		return;
	}
	if(valid){
		req.session.user = usr;
		res.send("<a href = \"/logout\">Logout</a>");
		return;
	}
	res.render('layouts/login_signup', { layout:false, login_error: "Incorrect Username or Password"});
	return;
});










module.exports = router;