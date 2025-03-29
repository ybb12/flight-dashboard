import React, { useEffect, useState } from "react";
import { InstrumentService, FlightInstrumentData } from "../services/instrumentService";

const InstrumentDisplay: React.FC = () => {
  const [data, setData] = useState<FlightInstrumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestData = await InstrumentService.getLatestInstrumentRecord();
        setData(latestData);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Latest Instrument Data</h2>
      <p>Altitude: {data?.altitude} ft</p>
      <p>HIS: {data?.his}</p>
      <p>ADI: {data?.adi}</p>
    </div>
  );
};

export default InstrumentDisplay;
