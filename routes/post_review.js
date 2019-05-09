const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverages;

router.get("/",async(req,res) => {
    if (!req.session.user){
        res.status(300).send("User Not Authenticated");
    }
    else{
        res.status(200).render('layouts/post_review', {title:'Post A Review'});
    }
});
