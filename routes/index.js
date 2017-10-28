const express = require('express');
const router = express.Router();
const { catchErrors } = require("../errorHandler")

const liftController = require('../controllers/liftController');
const userController = require('../controllers/userController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lift Logger' });
});

router.get('/lifts/add', liftController.liftForm);
router.post('/lifts', liftController.addLift);
router.get('/lifts', liftController.showLifts);

router.get('/api/lifts', liftController.getLifts);

router.get('/register', userController.registerPage)
router.post('/register', catchErrors(userController.register));




module.exports = router;
