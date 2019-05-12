const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverage;
const comments = data.comments;
const fs = require('fs').promises;
const ObjectId = require('mongodb').ObjectId;
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
    let auth = false;
    if (req.session.user){
        auth = true;
    }
    let currentBeverage = await beverage.getBeverageByName(currentPost.beverage_id);
    let commentArray = await comments.getCommentsWithPid(currentPost._id);
    if (req.session.user !== undefined && req.session.user === currentPost.author_id){
        res.render('layouts/post_page', {title:"Current Post" ,post:currentPost , comments:commentArray, button:true, beverageRoute:currentBeverage._id, auth: auth} );
    }
    else{
        res.render('layouts/post_page', {title:"Current Post" ,post:currentPost , comments:commentArray, button:false, beverageRoute:currentBeverage._id , auth:auth} );
    }
});

router.post("/delete", async(req,res) => {
    if (req.session.user){
        try{
            await posts.deletePost(req.body.post);
            await comments.deleteCommentsWithPid(ObjectId(req.body.post));
        }
        catch(e){
            console.log(e);
        }
        res.redirect("/beverage/" + req.body.beverage);
    }
    else{
        req.session.beverage = undefined;
        res.redirect("/");
    }
});
router.put("/:id/:content",async(req,res)=>{
   
    if(!req.session.user){
        res.status(404).send({Error: "Not authorized"});
        return;
    }
    try{
    await comments.addComment(req.session.user,req.params.id, req.params.content);
    } catch(e){
        console.log(e);
        res.status(500).send();
    }
    res.status(202).send();
    return;

});

module.exports = router;
