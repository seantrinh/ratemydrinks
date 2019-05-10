//HOME PAGE IF THE USER IS NOT AUTHENTICATED
const express = require("express");
const router = express.Router();
const beverage = require("../data").beverage;

router.get("/", async(req, res) => {
	//search parameters?
        //render a specific layout
        //if search returns items
        //      send res the items
});

module.exports = router;
