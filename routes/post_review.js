const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverages;
const fs = require('fs').promises;

router.get("/",async(req,res) => { 
    // Will need to reroute to home page
    if (!req.session.user){
        res.redirect("/");
    }
    else{
        res.render('layouts/post_review', {title:'Post A Review'});
    }
});
module.exports = router;
