const express = require("express");
const router = express.Router();
const data = require("../data");
const beverage = data.beverage;
const fs = require('fs').promises;

router.get("/",async(req,res) => { 
    // Will need to reroute to home page
    if (!req.session.user){
        res.redirect("/");
    }
    else{
        let ret = null;
        try{
            ret = await beverage.getAllBeverages();
        }
        catch(e){
            throw 'Error : getting all beverages'
        }
        res.render('layouts/post_review', {title:'Post A Review', beverages:ret});
    }
});
module.exports = router;
