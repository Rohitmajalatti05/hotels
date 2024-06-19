const express = require("express");
const app = express();
const db = require("./db");

//Import Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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
