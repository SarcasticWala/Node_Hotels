const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport =require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());// will store in req.body

const PORT = process.env.PORT || 3000;
//middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);

  next();
}
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });
app.get('/', function (req, res) {
  res.send('welcome to My Hotel')
})
//import the router files
const personRoutes = require('./Routes/personRoutes');
const MenuItemRoutes = require('./Routes/menuItemRoutes');
const Person = require('./models/person');
//use the routes
app.use('/person', personRoutes);
app.use('/menu',  MenuItemRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port 3000`)
})