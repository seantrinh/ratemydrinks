const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverages;
const comments = data.comments;
const fs = require('fs').promises;


router.get("/:id" , async(req,res) => {
    let id = req.params.id;
    if (id === undefined){
        res.status(400).send("Invalid Posts Id");
    }
    let currentPost = null;
    try{
        currentPost = await posts.getPost(id);
    }
    catch(e){
        res.status.send("Posts not found");
    }
    let currentBeverage = await beverage.getBeverageByName(currentPost.beverage_id);
    let commentArray = await comments.getCommentsWithPid(currentPost.id);
    
    if (req.session.user !== undefined && req.session.user === currentPost.user){
        req.session.beverage = id;
        res.render('layouts/post_page', {title:"Current Post" ,post:currentPost , comments:commentArray, button:true, beverageRoute:currentBeverage._id} );
    }
    else{
        res.render('layouts/post_page', {title:"Current Post" ,post:currentPost , comments:commentArray, button:false, beverageRoute:currentBeverage._id} );
    }
});

router.post("/delete", async(req,res) => {
    if (req.session.user){
        res.redirect("/beverage/") + req.session.beverage;
        req.session.beverage = id;
    }
    else{
        req.session.beverage = undefined;
        res.redirect("/");
    }
});

module.exports = router;