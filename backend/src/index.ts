import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import eventsRouter from './routes/events.route.js';
import { ingestData } from './services/ingest.service.js';
import { watchEventsCollection } from './services/mongo-change-stream.service.js';
import { createIndexWithMapping } from './services/elastic.service.js';

const app = express();
app.use(express.json());

app.use('/events', eventsRouter);
console.log("process.env.MONGO_URLl", process.env.MONGO_URL);
mongoose.connect(`${process.env.MONGO_URL as string}?replicaSet=rs0`).then(async () => {
  console.log('MongoDB connected');
  await createIndexWithMapping();
  // await ingestData();

  watchEventsCollection();
});

app.listen(3000, () => console.log('Server on port 3000'));
