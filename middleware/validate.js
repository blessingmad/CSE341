const validator = require('../pathfinders/validate');

const saveBookdetails = (req, res, next) => {
  const validationRule = {
    brandName: 'required|string',
    ownerEmail: 'required|string',
    model: 'required|string',
    name: 'required|string',
    color: 'required|string',
    location: 'required|string',
    milage: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBookdetails
};