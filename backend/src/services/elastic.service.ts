import { Client } from '@elastic/elasticsearch';
import { INDEX_ERROR_EVENTS } from '../config.js';

console.log("process.env.ELASTIC_URL", process.env.ELASTIC_URL);
export const esClient = new Client({ 
  node: process.env.ELASTIC_URL || 'http://elasticsearch:9200',
  maxRetries: 5,
  requestTimeout: 80000,
  sniffOnStart: true,
});

export async function indexToElastic(event: any, refresh: boolean = false) {
  console.log('elastic.service.ts: ', refresh)
  await esClient.index({
    index: INDEX_ERROR_EVENTS,
    refresh: refresh,
    document: event
  });
}

export async function createIndexWithMapping() {
  const exists = await esClient.indices.exists({ index: INDEX_ERROR_EVENTS });

  if (exists) {
    console.log(`ℹ️ Index '${INDEX_ERROR_EVENTS}' already exists.`);
    
    // await esClient.indices.delete({ index: INDEX_ERROR_EVENTS }); // to delete 
    const mapping = await esClient.indices.getMapping();
    console.log(`ℹ️ mapping '${INDEX_ERROR_EVENTS}' already exists.`, mapping[INDEX_ERROR_EVENTS].mappings.properties);
    return;
  }

  await esClient.indices.create({
    index: INDEX_ERROR_EVENTS,
    mappings: {
      properties: {
        timestamp: { type: 'date' },
        userId: { type: 'text' },
        browser: { type: 'text' },
        url: { type: 'text' },
        errorMessage: { type: 'text' },
        stackTrace: { type: 'text' },
      }
    }
  });

  console.log(`✅ Created index '${INDEX_ERROR_EVENTS}' with custom mappings.`);
}
