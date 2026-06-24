import express from 'express';
import connectDatabase, { MONGO_URL } from './database';
// Simple CORS middleware (avoid external dependency resolution issues)
function simpleCors(options: { origin?: string[] }) {
  const allowed = options.origin || [];
  return (req: any, res: any, next: any) => {
    const origin = req.headers.origin;
    if (origin && allowed.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    }
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  };
}
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const PORT = Number(process.env.PORT || 8000);

const app = express();
app.use(express.json());

const LOCAL_FRONTEND = 'http://localhost:5173';
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-${PORT}.githubpreview.dev`
  : `http://localhost:${PORT}`;

const corsOptions = {
  origin: [LOCAL_FRONTEND, API_URL],
};

app.use(simpleCors(corsOptions));

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend running', apiUrl: API_URL });
});

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function start() {
  try {
    await connectDatabase();
    console.log('API URL:', API_URL);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
