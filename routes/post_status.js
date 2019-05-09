const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverages;
const multer = require('multer');
const path = require('path');
const upload = multer({dest: path.join(__dirname , './../public/images')});
const fs = require('fs').promises;

router.post("/", upload.single('image'), async(req,res) => {
    // Will need to reroute to home page
    if ( !req.session.user){
        res.status(300).send("User Not Authenticated");
    }
    else{
        let bid = req.body.bid;
        let path = req.file.filename;
        let rating = req.body.rating;
        let content = req.body.content;
        let beverageExists = null;
        let post = null;
        try{
            post = await posts.postReview(content,req.session.user,path,rating,bid);
        }
        catch(e){
            console.log(e);
            res.render('layouts/post_status', {error:true});
            console.log("deleting " + path);
            await fs.unlink(path);
            return;
        }
        res.render('layouts/post_status', {author:post.author_id, beverage:bid, path:path, content:content, error:false});
    }
});
module.exports = router;
