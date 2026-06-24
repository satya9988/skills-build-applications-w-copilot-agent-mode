import { Router, Request, Response } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find().populate('team');
    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json({ entry });
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

export default router;
