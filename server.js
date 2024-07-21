const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());// will store in req.body

app.get('/', function (req, res) {
  res.send('welcome to My Hotel')
})
 //import the router files
const personRoutes =require('./Routes/personRoutes');
const MenuItemRoutes= require('./Routes/menuItemRoutes');
//use the routes
app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);

app.listen(3000, () => {
  console.log('server is running on port 3000')
})