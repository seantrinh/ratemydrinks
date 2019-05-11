const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverage;
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
        res.send("Posts not found");
    }
    let currentBeverage = await beverage.getBeverageByName(currentPost.beverage_id);
    let commentArray = await comments.getCommentsWithPid(currentPost._id);
    if (req.session.user !== undefined && req.session.user === currentPost.user){
        res.render('layouts/post_page', {title:"Current Post" ,post:currentPost , comments:commentArray, button:true, beverageRoute:currentBeverage._id} );
    }
    else{
        res.render('layouts/post_page', {title:"Current Post" ,post:currentPost , comments:commentArray, button:false, beverageRoute:currentBeverage._id} );
    }
});

router.post("/delete", async(req,res) => {
    if (req.session.user){
        try{
            await posts.deletePost(req.body.post);
        }
        catch(e){
            console.log("Could not delete post " + req.body.post);
        }
        res.redirect("/beverage/" + req.body.beverage);
    }
    else{
        req.session.beverage = undefined;
        res.redirect("/");
    }
});

module.exports = router;