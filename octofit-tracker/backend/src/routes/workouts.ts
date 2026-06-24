import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('user activity');
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json({ workout });
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate('user activity');
  res.json({ workout });
});

export default router;
