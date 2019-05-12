const express = require("express");
const router = express.Router();
const data = require("../data");
const beverage = data.beverage;
const path = require('path');
const fs = require('fs').promises;

router.post("/", async(req,res) => {
    // Will need to reroute to home page
    if ( !req.session.user) {
        res.redirect("/");
    }
    else {
	let type = req.body.type;
	let subtype = req.body.subtype;
	let tastes = req.body.tastes.split("\r\n");
	let name = req.body.name;
	let company = req.body.company;
        try {
		let bev = await beverage.createBeverage(type, subtype, tastes, name, company);
		if (bev === null) {
			console.log("Duplicate beverage");
			res.render('layouts/beverage_status', { error: true });
			return;
		}
        }
        catch(e){
                console.log(e);
                res.render('layouts/beverage_status', { error: true });
                return;
        }
        res.render('layouts/beverage_status', { name: name, error: false });
    }
});
module.exports = router;
