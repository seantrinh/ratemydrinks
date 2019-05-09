const express = require("express");
const router = express.Router();
const path = require("path");
const acc = require("../data").account;

router.post("/",async (req,res)=>{
	let usr = req.body.username;
	let pass = req.body.password;
	let email = req.body.email;
	let bio = req.body.bio;
	let valid = undefined;
	try{
		valid = await acc.getUserByScreenName(usr);
	}catch(e){
		try{
			await acc.createAccount(email,usr,bio,pass);

		} catch(e){
			res.render('layouts/login_signup', { layout:false, signup_error:"Signup failed, try again"});
			console.log(e)
			return;
		}
		res.redirect(307,'/login');
		return;
	}

	res.render('layouts/login_signup', { layout:false, signup_error:"Username taken, try again", bio: req.body.bio});

	
	
});










module.exports = router;