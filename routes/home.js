//HOME PAGE IF THE USER IS AUTHENTICATED
const express = require("express");
const router = express.Router();
const path = require("path");
const beverage = require("../data").beverage;

router.post("/", async (req, res) => {
	//search parameters?
	//render a specific layout
	//if search returns items
	//	send res the items
	if(req.session.user){
		try {
			let body = {
                                type: req.body.type,
                                subtype: req.body.subtype,
                                tastes: req.body.tastes.split(" "),
                                name: req.body.beverage_name,
                                company: req.body.company,
                                rating: parseFloat(req.body.rating)

                        };
			let result = await beverage.search(body);

			res.render("layouts/search", { heading: "Drinks Found", drinks: result, USERNAME: req.session.user, LOGOUT_LINK: "Logout"});
		} catch (e) {
			res.status(400).render('layouts/error', { heading: "400 Error" });
		}
	}else{
		res.redirect(307,"/home_unauth");
	}

});
router.get("/",async(req,res)=>{
	if(req.session.user){
		try{
			res.render("layouts/search", { heading: "Drinks Found",drinks: 5, USERNAME: req.session.user, LOGOUT_LINK: "Logout" });
        } catch (e) {
                res.status(400).render('layouts/error', { heading: "400 Error" });
        }
	} else{
		res.redirect("/home_unauth");
	}

	
})
module.exports = router;
