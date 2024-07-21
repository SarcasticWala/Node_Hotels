const express = require('express')
const router = express.Router();

const Person = require('./../models/person');

router.post('/', async (req, res) => {
    // const data=req.body // Assuming the request body contains the person data
    // const newPerson = new Person();//using the mongoose model

    // //this process will take long time to execute so we just do another
    // // newPerson.name=data.name;
    // // newPerson.age=data.age;
    // // newPerson.mobile=data.mobile;
    // // newPerson.email=data.email;
    // // newPerson.adress=data.adress;

    // //also we wont use the call back function rather than we use async and await function so the error wont come
    // newPerson.save((error,SavedPerson)=>{
    // //   if(error){
    // //     console.log('Error saving person:' ,error);
    // //     res.status(500).json({error: 'Internal Server error'})
    // //     }else{
    // //       console.log('data saved succefully');
    // //       res.status(200).json(SavedPerson);
    // //     }
    try {
        const data = req.body // Assuming the request body contains the person data
        const newPerson = new Person(data);//using the mongoose model
        const SavedPerson = await newPerson.save();
        console.log('data saved');
        res.status(200).json(SavedPerson);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internet Server Error' });

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
            console.log('response fetched');
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

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,// return the update document
            runValidators: true,//run moongose validation
        })
        if(!response){
            return res.status(404).json({error: 'Person not found'}); 
        }
        console.log('data updated');

        res.status(200).json(response);
    }
    catch (err) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response =await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'}); 
        }
        console.log('data updated');

        res.status(200).json({messege:'Person deleted suucessfully'});
    }catch{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})
module.exports = router;