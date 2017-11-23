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

router.get('/tokentest', authController.isAuth, authController.postAuth);
router.get('/asynctokentest', catchErrors(authController.asyncIsAuth), authController.postAuth);

router.post('/login',
  authController.login,
  authController.issueToken
);


module.exports = router;
