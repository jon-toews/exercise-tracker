const express = require('express');
const router = express.Router();
const liftController = require('../controllers/liftController');

const { catchErrors } = require("../errorHandler")
const { asyncIsAuth } = require('../controllers/authController');

router.use(asyncIsAuth);

router.get('/lifts', liftController.getLifts);
router.post('/lifts', catchErrors(liftController.postLift));
router.put('/lifts', catchErrors(liftController.editLift));
router.delete('/lifts', catchErrors(liftController.deleteLift));

module.exports = router;
