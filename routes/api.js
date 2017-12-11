const express = require('express');
const router = express.Router();
const liftController = require('../controllers/liftController');

const { catchErrors } = require("../errorHandler")
const { asyncIsAuth } = require('../controllers/authController');

router.use(asyncIsAuth);

router.get('/lifts', catchErrors(liftController.getLifts));

router.post('/lifts', catchErrors(liftController.postLift));
router.put('/lifts', catchErrors(liftController.editLift));
router.delete('/lifts', catchErrors(liftController.deleteLift));

router.get('/lift-types', catchErrors(liftController.distinctLifts));

// router.get('/lifts/:type', catchErrors(liftController.getLiftType));

module.exports = router;
