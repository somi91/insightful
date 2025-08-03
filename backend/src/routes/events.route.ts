import express from 'express';
import { searchEvents, getStats, getAllDB, addError } from '../controllers/events.controller.js';
const router = express.Router();

router.get('/search', searchEvents);
router.get('/stats', getStats);
router.get('/getAll', getAllDB);
router.post('/addErrors', addError);

export default router;
