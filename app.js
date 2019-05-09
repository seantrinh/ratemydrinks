const express = require("express");
const app = express();
const configRoutes = require("./routes");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const path = require('path');

app.use('/public',express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname,'images/'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  name: 'ratemydrinks',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
