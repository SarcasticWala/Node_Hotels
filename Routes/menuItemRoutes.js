const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem');
// post method to add menu item
router.post('/', async (req, res) => {
    try {
      const data = req.body // Assuming the request body contains the person data
      const newMenu = new MenuItem(data);
      const responce = await newMenu.save();
      console.log('data saved');
      res.status(200).json(responce);
    } catch (err) {
  
      console.log(err);
      res.status(500).json({ error: 'Internet Server Error' });
    }
  })
  
router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internet Server Error' });
  
    }
  })
  
  module.exports=router;