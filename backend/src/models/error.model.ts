import mongoose from 'mongoose';

const errorSchema = new mongoose.Schema({
  timestamp: Date,
  userId: String,
  browser: String,
  url: String,
  errorMessage: String,
  stackTrace: String
});

export default mongoose.model('ErrorEvent', errorSchema);
