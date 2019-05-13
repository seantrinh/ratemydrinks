const express = require("express");
const router = express.Router();
const path = require("path");
const beverage = require("../data").beverage;
const posts = require("../data").posts;

const tastesToString = (tastes) => {
  let output = "";
  for (let i = 0; i < tastes.length; i++) {
    output += ' ' + tastes[i];
    if (i < tastes.length - 1) {
      output += ','
    }
  }
  return output;
}

router.get("/:id", async (req, res) => {
  //Id of the specific drink
  const bvgId = req.params.id;
  try {
    const currentBvg = await beverage.getBeverageById(bvgId);
    const currentBvgPosts = await posts.getPostsWithBeverageName(currentBvg.name);
  
    const postInfo = currentBvgPosts.map( (post) => {
      return {
        id: post._id,
        author: post.author_id,
        title: post.title
      }
    });
    console.log(tastesToString(currentBvg.tastes))
    currentBvg.tastes = tastesToString(currentBvg.tastes);
    let data = {
      Beverage: currentBvg,
      Posts: postInfo
    }; 
    if (req.session.user){
      data.auth = true;
      data.USERNAME= req.session.user;
    }
    else{
      data.auth = false;
      data.LOGIN = true;
    }
    res.render("layouts/beverage", data);
  } catch(e){
    console.log("Could not find beverage")
    res.redirect("/home")
  }
  

  

});

router.get("/", async(req, res) => {
  //No id given so redirect to home page
  //res.redirect("/home")
  
});

module.exports = router;
