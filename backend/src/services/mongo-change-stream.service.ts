import ErrorEvent from '../models/error.model.js';
import { indexToElastic } from './elastic.service.js';

export async function watchEventsCollection() {
  const changeStream = ErrorEvent.watch([], { fullDocument: 'updateLookup' });

  console.log('👀 Watching Event collection for changes...');

  changeStream.on('change', async (change: any) => {
    const doc = change.fullDocument;
    console.log('👀 Watching Event, doc: ', doc);
    console.log('👀 Watching Event, change.operationType: ', change.operationType);

    if (!doc || (change.operationType !== 'insert' && change.operationType !== 'update')) return;

    try {
      await indexToElastic({
          timestamp: doc.timestamp,
          userId: doc.userId,
          browser: doc.browser,
          url: doc.url,
          errorMessage: doc.errorMessage,
          stackTrace: doc.stackTrace,
        });

      console.log(`✅ Synced Event ${doc._id} to Elasticsearch`);
    } catch (err) {
      console.error('❌ Elasticsearch index error:', err);
    }
  });

  changeStream.on('error', (err: Error) => {
    console.error('❌ MongoDB change stream error:', err);
  });
}
