const express = require('express');
const router = express.Router();

const carsController = require('../controller/cars');

const validation = require('../middleware/validate');

const {isAuthenticated} = require("../middleware/authenticate");
//select
router.get('/',carsController.getAll);

router.get('/:id',carsController.getSingle);
//create
router.post('/', isAuthenticated, carsController.createCar);


//update
router.put('/:id', isAuthenticated, carsController.updateCar);
//delete
router.delete('/:id', isAuthenticated, carsController.deleteCar);

module.exports = router;

