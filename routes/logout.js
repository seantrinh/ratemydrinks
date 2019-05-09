const express = require("express");
const router = express.Router();
const path = require("path");
const acc = require("../data").account;

router.get("/",async (req,res)=>{
	req.session.destroy();
	res.redirect("/home");
});










module.exports = router;