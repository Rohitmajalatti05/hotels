const mongoose = require('mongoose');
const { debuglog } = require('util');
require('dotenv').config(); //Importing env file

//define the mongodb connection URL

// const mongoURL = 'mongodb://localhost:27017/hotels' This is local database mongoDB
const mongoURL = process.env.MONGODB_URL //This is MongoDb Atlas Server link getting from the env file

//set up the mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
// Mongoose maintains a default connection object representing the Mongodb connection.

const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected',() => {
    console.log('Connected to MongoDB server');
});

db.on('error',(err) => {
    console.log('MongoDB connection error:',err);
});

db.on('disconnected',() => {
    console.log('MongoDB Disconnected');

});
