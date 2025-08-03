import mockData from '../../static/mock-errors.json' with { type: "json" };
import { ErrorObj } from '../models/error.js';
import ErrorModel from '../models/error.model.js';

export async function ingestData(data?: ErrorObj[]) {
  if(data) {
    ingestEvents(data);
  } else {
    ingestEvents(mockData);
  }
}
async function ingestEvents(data: ErrorObj[]) {
  for (const event of data) {
    const doc = new ErrorModel(event);
    await doc.save();
  }
}