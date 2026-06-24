import { Schema, model, Types } from 'mongoose';

const ActivitySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  caloriesPerHour: { type: Number, required: true }
});

export default model('Activity', ActivitySchema);
