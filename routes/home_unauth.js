//HOME PAGE IF THE USER IS NOT AUTHENTICATED
const express = require("express");
const router = express.Router();
const beverage = require("../data").beverage;
router.post("/",async(req,res)=>{
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
                       
                        res.render("layouts/search", { heading: "Drinks Found", drinks: result, LOGIN :true});
        } catch (e) {
                        console.log(`home_unauth search: ${e}`);
                        res.status(400).render('layouts/error', { heading: "400 Error", LOGIN:true });
        }
});
router.get("/", async(req, res) => {
	//search parameters?
        //render a specific layout
        //if search returns items
        //      send res the items
        let auth = false;
        if (req.session.user){
            auth = true;
        }
	try {
                res.render("layouts/search", { heading: "Find A Drink", drinks: 5, LOGIN :true });
        } catch (e) {
                res.status(400).render('layouts/error', { heading: "400 Error", LOGIN:true, auth:auth });
        }

});

module.exports = router;
