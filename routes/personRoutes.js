//Import express.js and its Router function 
const express = require('express');
const router = express.Router();
//Import person Model 
const Person = require('./../models/person');

//Define routes for /person
// POST method to add person data 

router.post('/', async (req,res) => {
    try{
        const personData = req.body; // Assusming the request body contains the Person data
        
        //create new Person and store the person Model
        const newPerson = new Person(personData);

        // save the newPerson data into Database
        const response = await newPerson.save();

        console.log('Person data is saved');
        res.status(200).json(response);

    }
    catch(errr){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
});

//Get Method to fetch Person data
router.get('/', async (req,res) => {
    try{
        const personData = await Person.find();
        console.log('Person Data Fetched');
        res.status(200).json(personData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

//Get Method to fetch Person data by Work Type
router.get('/:workType', async (req,res) => {
    try{
        const workType = req.params.workType; // this shows that workType is the parameter
        
        const response = await Person.find({work:workType});
        console.log('Work Type data fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

//UPDATE Method for Person Data
router.put('/:id', async (req,res) => {
    try{
        const personId = req.params.id; // Extract the person's Id from URL Parameter
        const updatedPersonData = req.body; //Updated person data

        //Assuming you have Person Model

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error:'Person Not Found'});
        }
        console.log('Data Updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

// DELETE Method to delete person data by id
router.delete('/:id', async (req,res) => {
    try{
        const personId = req.params.id; // Extract the Person's ID from the URL Parameter
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({errro:'Person Not Found'});
        }
        console.log('Data Deleted Successfully');
        res.json({message:'Data Deleted Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});



module.exports = router;