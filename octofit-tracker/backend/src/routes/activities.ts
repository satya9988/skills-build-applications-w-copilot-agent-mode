import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find();
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json({ activity });
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  res.json({ activity });
});

export default router;
