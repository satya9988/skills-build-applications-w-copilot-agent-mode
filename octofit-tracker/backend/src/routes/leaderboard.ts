import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('team');
  res.json({ leaderboard });
});

export default router;
