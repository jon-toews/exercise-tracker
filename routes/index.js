const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// catch async await errors
const { catchErrors } = require("../errorHandler")

router.post('/testregister', authController.testRegister);
router.post('/register', 
  userController.validateRegister, 
  userController.register
);


router.get('/user', catchErrors(authController.asyncIsAuth), authController.userName);

router.post('/login',
  authController.login,
  authController.issueToken
);


module.exports = router;
