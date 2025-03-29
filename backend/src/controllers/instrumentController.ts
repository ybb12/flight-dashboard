import { Request, Response } from 'express';
import { FlightInstrument, IFlightInstrument } from '../models/FlightInstrument';

export class InstrumentController {
  // Create a new flight instrument record
  async createInstrumentRecord(req: Request, res: Response) {
    try {
      const { altitude, his, adi } = req.body;

      // Validate input ranges
      if (
        altitude < 0 || altitude > 3000 ||
        his < 0 || his > 360 ||
        adi < -100 || adi > 1000
      ) {
        return res.status(400).json({ 
          error: 'Invalid input ranges',
          details: {
            altitude: { min: 0, max: 3000 },
            his: { min: 0, max: 360 },
            adi: { min: -100, max: 1000 }
          }
        });
      }

      const newRecord = new FlightInstrument({ altitude, his, adi });
      await newRecord.save();

      res.status(201).json(newRecord);
    } catch (error) {
      console.error(`error: ${error}`)
      res.status(500).json({ error: 'Error creating instrument record' });
    }
  }

  // Get all instrument records
  async getAllInstrumentRecords(req: Request, res: Response) {
    try {
      const records = await FlightInstrument.find().sort({ timestamp: -1 });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching instrument records' });
    }
  }

  // Get latest instrument record
  async getLatestInstrumentRecord(req: Request, res: Response) {
    try {
      const latestRecord = await FlightInstrument.findOne().sort({ timestamp: -1 });
      
      if (!latestRecord) {
        return res.status(404).json({ error: 'No records found' });
      }

      res.status(200).json(latestRecord);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching latest instrument record' });
    }
  }
}

export const instrumentController = new InstrumentController();