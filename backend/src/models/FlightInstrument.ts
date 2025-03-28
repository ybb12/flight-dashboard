import mongoose from 'mongoose';

// Interface for type checking
export interface IFlightInstrument {
  altitude: number;
  his: number;
  adi: number;
  timestamp: Date;
}

// Mongoose Schema with validation
const FlightInstrumentSchema = new mongoose.Schema<IFlightInstrument>({
  altitude: {
    type: Number,
    required: true,
    min: 0,
    max: 3000,
    validate: {
      validator: Number.isFinite,
      message: 'Altitude must be a finite number between 0 and 3000'
    }
  },
  his: {
    type: Number,
    required: true,
    min: 0,
    max: 360,
    validate: {
      validator: Number.isFinite,
      message: 'HIS must be a finite number between 0 and 360'
    }
  },
  adi: {
    type: Number,
    required: true,
    min: -100,
    max: 1000,
    validate: {
      validator: Number.isFinite,
      message: 'ADI must be a finite number between -100 and 1000'
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const FlightInstrument = mongoose.model<IFlightInstrument>('FlightInstrument', FlightInstrumentSchema);