const express = require("express");
const router = express.Router();
const data = require("../data");
const posts = data.posts;
const beverage = data.beverages;
const multer = require('multer');
const upload = multer({dest: __dirname + './../images'});

router.post("/", upload.single('image'), async(req,res) => {
    // Will need to reroute to home page
    if ( false ){//!req.session.user){
        res.status(300).send("User Not Authenticated");
    }
    else{
        console.log("should have saved the file");
    }
});
module.exports = router;
