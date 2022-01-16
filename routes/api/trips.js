const express = require('express');
const router = express.Router();

const Trip = require('../../models/Trip');

//@route GET api/trips/test
//@description tests trips route
//access Public
router.get('/test', (req, res) => res.send('trip route testing!'));

//@route GET api/trips
//@description Get all trips
//access Public
router.get('/', (req, res) => {
    Trip.find()
        .then(trips => res.json(trips))
        .catch(err => res.status(404).json({ notripsfound: 'No Trips Found - Error: ' + err }));        
});

//@route GET api/trips/:id
//@description Get single trip by id
//access Public
router.get('/:id', (req, res) => {
    Trip.findById(req.params.id)
        .then(trips => res.json(trips))
        .catch(err => res.status(404).json({ notripsfound: 'No Trips Found - Error: ' + err }));        
});

//@route POST api/trips
//@description Add/Save trip
//access Public
router.post('/', (req, res) => {
    Trip.create(req.body)
        .then(trips => res.status(200).json('Trip added successfully'))
        .catch(err => res.status(400).json({ notripadded: 'Trip failed to add -  - Error: ' + err }));        
});

//@route PUT api/trips/:id
//@description Update trip
//access Public
router.put('/:id', (req, res) => {
    Trip.findByIdAndUpdate(req.params.id, req.body)
        .then(trip => res.json({ msg: 'Updated successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to update the Database - Error: ' + err }));        
});

//@route DELETE api/trips/:id
//@description Delete trip by id
//access Public
router.delete('/:id', (req, res) => {
    Trip.findByIdAndRemove(req.params.id, req.body)
        .then(trips => res.json(trips))
        .catch(err => res.status(404).json({ notripsfound: 'No Trips Found - Error: ' + err }));        
});

module.exports = router;