const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config(); //Importing dotenv file 

//Import Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000; //accessing env file PORT variable

//Middleware Function
const logRequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
app.get("/", (req, res) => {
    res.send("Welcome to rohits kitchen");
});


//Import the router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

// Use the Routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


app.listen(3000, () => {
    console.log("Server listening on 3000");
});
