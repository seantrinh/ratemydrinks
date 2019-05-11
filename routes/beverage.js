const express = require("express");
const router = express.Router();
const path = require("path");
const beverage = require("../data").beverage;
const posts = require("../data").posts;

router.get("/:id", (req, res) => {
  //Id of the specific drink
  const bvgId = req.params.id;
  var currentBvg;
  var currentBvgPosts;
  try {
    currentBvg = await beverage.getBeverageById(bvgId);
  } catch(e){
    console.log("Could not find beverage")
    res.redirect("/home")
  }
  
  currentBvgPosts = await posts.getPostsWithBeverageName(currentBvg.name);
  

  const data = {
    title: "Beverage",
    Beverage: currentBvg,
    Posts: currentBvgPosts
  }

  res.render("layouts/beverage",data);
  

});

router.get("/", (req, res) => {
  //No id given so redirect to home page
  //res.redirect("/home")
  
});

module.exports = router;