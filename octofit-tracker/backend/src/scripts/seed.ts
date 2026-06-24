/**
 * Seed the octofit_db database with test data
 *
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URL);
  await mongoose.connection.db.dropDatabase();

  // Activities
  const running = await Activity.create({ name: 'Running', type: 'cardio', caloriesPerHour: 600 });
  const cycling = await Activity.create({ name: 'Cycling', type: 'cardio', caloriesPerHour: 500 });
  const yoga = await Activity.create({ name: 'Yoga', type: 'flexibility', caloriesPerHour: 200 });

  // Teams
  const alpha = await Team.create({ name: 'Alpha' });
  const beta = await Team.create({ name: 'Beta' });

  // Users
  const alice = await User.create({ name: 'Alice Johnson', email: 'alice@example.com', team: alpha._id });
  const bob = await User.create({ name: 'Bob Smith', email: 'bob@example.com', team: alpha._id });
  const carol = await User.create({ name: 'Carol Lee', email: 'carol@example.com', team: beta._id });

  // Update team members
  alpha.members = [alice._id, bob._id];
  beta.members = [carol._id];
  await alpha.save();
  await beta.save();

  // Workouts
  const w1 = await Workout.create({ user: alice._id, activity: running._id, durationMinutes: 45 });
  const w2 = await Workout.create({ user: bob._id, activity: cycling._id, durationMinutes: 60 });
  const w3 = await Workout.create({ user: carol._id, activity: yoga._id, durationMinutes: 30 });

  // Leaderboard (score as total minutes for team)
  const alphaScore = 45 + 60; // 105
  const betaScore = 30;
  await Leaderboard.create({ team: alpha._id, score: alphaScore, rank: 1 });
  await Leaderboard.create({ team: beta._id, score: betaScore, rank: 2 });

  console.log('Seeding complete');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
