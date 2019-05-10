//HOME PAGE IF THE USER IS AUTHENTICATED
const express = require("express");
const router = express.Router();
const path = require("path");
const beverage = require("../data").beverage;

router.get("/", (req, res) => {
	//search parameters?
	//render a specific layout
	//if search returns items
	//	send res the items
});

module.exports = router;
