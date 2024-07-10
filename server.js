const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config(); //Importing dotenv file 

//importing Passport 
const passport = require('./auth');


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

//using the Passport LocalStrategy middleware
// passport.use(new LocalStrategy(async (USERNAME,password,done) => {
//     //authentication logic here

//     try{
//         console.log('Received credentials',USERNAME,password);
//         const user = await Person.findOne({username:USERNAME});
//         if(!user)
//             return done(null,false, {message: 'Incorrect Username.'});

//         const isPasswordMatch = user.password == password ? true : false;
//         if(isPasswordMatch){
//             return done(null,user);

//         }
//         else{
//             return done(null,false, {message: 'Incorrect Password'});
//         }

//     }
//     catch(err){
//         return done(err);

//     }
// }))
//Initializing Passport
app.use(passport.initialize());

//creating variable of authentication to use in the routes
const localAuthMiddleware = passport.authenticate('local', {session:false})

app.get("/", localAuthMiddleware, (req, res) => {
    res.send("Welcome to rohits kitchen");
});


//Import the router files
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');

// Use the Routers
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
    console.log("Server listening on 3000");
});
