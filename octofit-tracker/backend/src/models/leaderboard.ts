import { Schema, model, Types } from 'mongoose';

const LeaderboardSchema = new Schema({
  team: { type: Types.ObjectId, ref: 'Team', required: true },
  score: { type: Number, required: true },
  rank: { type: Number }
});

export default model('Leaderboard', LeaderboardSchema);
