// import express.js and its Router Function
const express = require('express');
const router = express.Router();

// Import MenuItems Model 
const MenuItem = require('./../models/menuItem');

//define routes for /menu
//POST method to add Menu Items

router.post('/', async (req,res) => {
    try{
        const menuData = req.body; // Assuming request body contains menu data
        //create new menu and store the MenuModel
        const newMenu = new MenuItem(menuData);
        //save the newMenu into the Database
        const response = await newMenu.save();
        console.log('Menu Item saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
        }
});

// Get Method to fetch MenuItems 
router.get('/', async (req,res) => {
    try{
        const menuData = await MenuItem.find();
        console.log('Menu Items Fetched');
        res.status(200).json(menuData);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
   
});

//Get Method to fetch MenuItems By tastes
router.get('/:tasteType', async (req,res) => {
    try{
        const tasteType = req.params.tasteType; // this shows the tasteType is the parameter 
        const response = await MenuItem.find({taste:tasteType});
        console.log('Taste Type menu is fetched');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

//this is just comment 
module.exports = router;