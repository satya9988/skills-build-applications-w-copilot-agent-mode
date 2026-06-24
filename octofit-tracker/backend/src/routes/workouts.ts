import { Router, Request, Response } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('user activity');
    res.status(200).json({ workouts });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json({ workout });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('user activity');
    if (!workout) {
      res.status(404).json({ error: 'Workout not found' });
      return;
    }
    res.status(200).json({ workout });
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

export default router;
