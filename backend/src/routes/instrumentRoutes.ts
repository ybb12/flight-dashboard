import express from 'express';
import { instrumentController } from '../controllers/instrumentController';

const router = express.Router();

// POST: Create a new instrument record
router.post('/instruments', instrumentController.createInstrumentRecord);

// GET: Retrieve all instrument records
router.get('/instruments', instrumentController.getAllInstrumentRecords);

// GET: Retrieve the latest instrument record
router.get('/instruments/latest', instrumentController.getLatestInstrumentRecord);

export default router;