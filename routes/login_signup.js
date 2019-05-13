const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/",(req,res)=>{
	if(req.session.user){
		res.redirect("/home");
		return;
	}
	res.render('layouts/login_signup', { layout:false , USERNAME:false});
});

router.get("*",(req,res)=>{
		res.status(404).send("Page not Found");;
	});




module.exports = router;
