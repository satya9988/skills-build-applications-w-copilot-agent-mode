import { Schema, model, Types } from 'mongoose';

const WorkoutSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  activity: { type: Types.ObjectId, ref: 'Activity', required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, default: () => new Date() }
});

export default model('Workout', WorkoutSchema);
