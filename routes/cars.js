const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');
const {isAuthenticated} = require("../middleware/authenticate");

router.get('/',carsController.getAll);

router.get('/:id',carsController.getSingle);
router.post('/', isAuthenticated, validation.saveCars, carsController.updateCars);
router.post('/', carsController.createCar);

router.put('/:id', isAuthenticated, validation.saveCar, carsController.updateCar);

router.delete('/:id', isAuthenticated, carsController.deleteCar);

module.exports = router;


//Read (Get) All Books Details from the database
router.get('/', booksController.getAllBooksdetails);
// Read (GET) a single Book Details from the database
router.get('/:id', booksController.getSingleBookdetails);
//Create (POST) a new Book Details

//Update (PUT) a Book Details
router.put('/:id', isAuthenticated, validation.saveBookdetails, booksController.updateBookdetails);
//Delete (DELETE) a Book Details
router.delete('/:id', isAuthenticated, booksController.deleteBookdetails);