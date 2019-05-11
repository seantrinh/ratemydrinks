//HOME PAGE IF THE USER IS NOT AUTHENTICATED
const express = require("express");
const router = express.Router();
const beverage = require("../data").beverage;

router.get("/", async(req, res) => {
	//search parameters?
        //render a specific layout
        //if search returns items
        //      send res the items
	try {
                let result = await beverage.search(req.body);
                res.render("layouts/search", { title: "Drinks Found", drinks: result });
        } catch (e) {
                res.status(400).render('layouts/error', { title: "400 Error" });
        }

});

module.exports = router;
