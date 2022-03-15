const express = require('express');
const router = express.Router();

const Trip = require('../../models/Trip');

//@route GET api/trips/:id
//@description Get single trip by id
router.get('/:id', (req, res) => {
    Trip.findById(req.params.id)
        .then(trips => res.status(200).json(trips))
        .catch(err => res.status(404).json({ msg: 'No Trips Found - Error: ' + err }));        
});

//@route POST api/trips
//@description Add/Save trip
router.post('/', (req, res) => {
    Trip.create(req.body)
        .then(trips => res.status(200).json({ msg: 'Trip added successfully' })) //change to 201
        .catch(err => res.status(400).json({ msg: 'Trip failed to add -  - Error: ' + err }));        
});

//@route PUT api/trips/:id
//@description Update trip
router.put('/:id', (req, res) => {
    Trip.findByIdAndUpdate(req.params.id, req.body)
        .then(trip => res.status(200).json({ msg: 'Trip updated successfully' }))
        .catch(err => res.status(400).json({ msg: 'Unable to update the Database - Error: ' + err }));        
});

//@route DELETE api/trips/:id
//@description Delete trip by id
router.delete('/:id', (req, res) => {
    Trip.findByIdAndRemove(req.params.id, req.body)
        .then(trips => res.status(200).json({ msg: 'Trip deleted successfully' }))
        .catch(err => res.status(404).json({ msg: 'No Trips Found - Error: ' + err }));        
});

module.exports = router;