import { createIndexWithMapping, esClient } from '../services/elastic.service.js';
import { cacheGet, cacheSet } from '../services/cache.service.js';
// import { AggregationsAggregate, SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { estypes } from '@elastic/elasticsearch';
import { INDEX_ERROR_EVENTS } from '../config.js';
import mongoose from 'mongoose';
import ErrorModel from '../models/error.model.js';
import { ingestData } from '../services/ingest.service.js';
import { SearchFilters } from '../models/search-filters.js';

export async function searchEvents(
  req: { query: SearchFilters }, 
  res: { json: (arg0: estypes.SearchHit<unknown>[]) => void; }
) {
  const cacheKey = `search:${JSON.stringify(req.query)}`;
  console.log('cacheKey', cacheKey);
  const cached = await cacheGet(cacheKey);
  console.log('from cached', cached);
  if (cached && (cached && cached.length > 0)) return res.json(JSON.parse(cached));
  createIndexWithMapping()
  Object.entries(req.query)
  const {timestamp, ...filters} = req.query;

  const result = await esClient.search({
    index: INDEX_ERROR_EVENTS,
    profile: true,
    query: {
      bool: {
        must: Object.entries(req.query).map(([key, val]) => {
          if(key === 'timestamp') {
            const ts = Number(val);
            const start = new Date(ts);
            start.setDate(start.getDate() + 1)
            start.setUTCHours(0, 0, 0, 0);

            const end = new Date(ts);
            end.setDate(end.getDate() + 1)
            end.setUTCHours(23, 59, 59, 999);
            // console.log("start", start, start.toISOString(),)
            // console.log("end", end, end.toISOString())
            return {
              range: {
                timestamp: {
                  gte: start.toISOString(),
                  lte: end.toISOString(),
                }
              }
            }
          } else {
            return {
              match: { [key]: val as string }
            }
          }
        })
      }
    }
  });

  console.log('result esClient', result, result.hits.hits);
  await cacheSet(cacheKey, result.hits.hits);
  console.log('set cached', cacheKey, result.hits.hits);
  res.json(result.hits.hits);
}

export async function getStats(
  req: any, 
  res: { json: (arg0: Record<string, estypes.AggregationsAggregate> | undefined) => void; }
) {
  const cacheKey = 'stats';
  // const cached = await cacheGet(cacheKey);
  // if (cached) return res.json(JSON.parse(cached));
  console.log('getStats')

  const result = await esClient.search({
    index: INDEX_ERROR_EVENTS,
    profile: true,
    size: 0,
    aggs: {
      by_browser: { terms: { field: 'browser.keyword' } },
      by_error: { terms: { field: 'errorMessage.keyword' } }
    }
  });

  // await cacheSet(cacheKey, result.aggregations);
  res.json(result.aggregations);
}
export async function getAllDB(
  req: any, 
  res: any
) {
  const esSearch = {
    "query" : {
      "match_all" : {}
    }
  }
  const result = await esClient.search({
    index: INDEX_ERROR_EVENTS,
    ...esSearch
  });
  console.log("result ES", result);
  console.log("result ES hits: ", result.hits.hits);

  const modelNames = mongoose.modelNames();
  // const deleteRes = await ErrorModel.deleteMany();
  const allData = await ErrorModel.find();
  console.log("modelNames", modelNames);
  console.log("getAllDB", allData, allData.length);
  res.json(allData);
}

export async function addError(
  req: any, 
  res: any
) {
  console.log("addError", req.body);
  await ingestData(req.body);
  const allData = await ErrorModel.find();
  res.json(allData);
}
