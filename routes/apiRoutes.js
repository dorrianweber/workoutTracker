const router = require("express").Router();
const Workout = require("../models/Workout");

router.get('/api/workouts', (req, res) => {
    Workout.find({})
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id,
        {
            $push: {
                exercises: req.body
            }
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;