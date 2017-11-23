const express = require('express');
const router = express.Router();
const liftController = require('../controllers/liftController');

const { catchErrors } = require("../errorHandler")
const { asyncIsAuth } = require('../controllers/authController');

router.use(asyncIsAuth);

router.get('/api/lifts', liftController.getLifts);
router.post('/api/lifts', catchErrors(liftController.postLift));
router.put('/api/lifts', catchErrors(liftController.editLift));
router.delete('/api/lifts', catchErrors(liftController.deleteLift));

module.exports = router;
