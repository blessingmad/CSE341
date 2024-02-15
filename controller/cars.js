const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    const result = await mongodb.getDatabase().db().collection('cars').find();
        result.toArray().then((lists) =>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
    });
};
const getSingle  = async(req, res) => {
    const userId = new ObjectId(req.param.id);
    const result = await
    mongodb.getDatabase().db().collection('cars').find({ _id: userId });
        result.toArray().then((lists) =>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }); 
};

const createCar = async (req, res, next) => {
    const car = {
        brandName: req.body.brandName,
        ownerEmail: req.body.ownerEmail,
        model: req.body.model,
        location: req.body.location,
        milage: req.body.milage
    };
    const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(201).json(response); 
    } else {
        res.status(500).json(response.error || 'Error occured while creating the cart');
    }
};

const updateCar = async (req, res) => {
    const userId = new ObjectId(req. params.id);
    const car = {
        brandName: req.body.brandName,
        ownerEmail: req.body.ownerEmail,
        model: req.body.model,
        location: req.body.location,
        milage: req.body.milage
    };
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('cars')
        .replaceOne({ _id: userId}, car);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error occured while updating the car.');

    }

};
const deleteCar = async (req, res) => {
    const userId = new ObjectId(req. params.id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: userId});
    console.log(response);
    if (response.deleteCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Error occured while deleting the car.');
    }
};
        
module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar

};