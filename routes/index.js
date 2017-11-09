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
router.post('/lifts', 
  catchErrors(liftController.addLift), 
  liftController.showLifts
);

router.get('/lifts', liftController.showLifts);

router.get('/api/lifts', liftController.getLifts);
router.post('/api/lifts', catchErrors(liftController.postLift));
router.put('/api/lifts', catchErrors(liftController.editLift));
router.delete('/api/lifts', catchErrors(liftController.deleteLift));

router.get('/register', userController.registerPage)
router.post('/register', catchErrors(userController.register));

router.get('/login', userController.loginPage) 
router.post('/login', catchErrors(userController.login));

router.get('/logout', userController.logout);





module.exports = router;
