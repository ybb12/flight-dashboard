import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface FlightInstrumentData {
  altitude: number;
  his: number;
  adi: number;
}

export class InstrumentService {
  static async createInstrumentRecord(data: FlightInstrumentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/instruments`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating instrument record:', error);
      throw error;
    }
  }

  static async getAllInstrumentRecords() {
    try {
      const response = await axios.get(`${API_BASE_URL}/instruments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching instrument records:', error);
      throw error;
    }
  }

  static async getLatestInstrumentRecord() {
    try {
      const response = await axios.get(`${API_BASE_URL}/instruments/latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest instrument record:', error);
      throw error;
    }
  }
}