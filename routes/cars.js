const express = require('express');
const router = express.Router();

const usersController = require('../controllers/cars');

router.get('/',usersController.getAll);

router.get('/:id',usersController.getSingle);

router.post('/', usersController.createCar);

router.put('/:id',usersController.updateCar);

router.delete('/:id', usersController.deleteCar);

module.exports = router;