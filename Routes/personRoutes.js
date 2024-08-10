const express = require('express')
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware,generateToken}= require('./../jwt');
// POST route to add a person
router.post('/signup', async (req, res) => {
    
    try {
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response  = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response .id,
            username: response .username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response : response , token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internet Server Error' });

    }
})

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work; // Extract the work type from the URL parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            // Assuming you already have a Person model and MongoDB connection set up
            const persons = await Person.find({ work: workType });
            console.log('response  fetched');
            // Send the list of persons with the specified work type as a JSON response 
            res.json(persons);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;//Extract the id from the url parameter
        const updatedPersonData = req.body;// update data for the person

        const response  = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,// return the update document
            runValidators: true,//run moongose validation
        })
        if(!response ){
            return res.status(404).json({error: 'Person not found'}); 
        }
        console.log('data updated');

        res.status(200).json(response );
    }
    catch (err) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response  =await Person.findByIdAndDelete(personId);
        if(!response ){
            return res.status(404).json({error: 'Person not found'}); 
        }
        console.log('data updated');

        res.status(200).json({messege:'Person deleted suucessfully'});
    }catch{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})
//comment adding to test
module.exports = router;