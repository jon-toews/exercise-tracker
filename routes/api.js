const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

const { catchErrors } = require("../errorHandler")
const { asyncIsAuth } = require('../controllers/authController');

// router.use(asyncIsAuth);

router.get('/workouts', catchErrors(workoutController.testAddWorkout))
router.post('/workouts', catchErrors(workoutController.addWorkout))
router.put('/workouts', catchErrors(workoutController.editWorkout))

// router.get('/lifts', catchErrors(liftController.getLifts));
// router.post('/lifts', catchErrors(liftController.postLift));
// router.put('/lifts', catchErrors(liftController.editLift));
// router.delete('/lifts', catchErrors(liftController.deleteLift));
// router.get('/lift-types', catchErrors(liftController.distinctLifts));

// router.get('/lifts/:type', catchErrors(liftController.getLiftType));

module.exports = router;
