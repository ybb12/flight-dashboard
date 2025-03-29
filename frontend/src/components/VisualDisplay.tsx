import React, { useEffect, useState, useRef } from "react";
import { InstrumentService, FlightInstrumentData } from "../services/instrumentService";
import '../App.css'
const VisualDisplay: React.FC = () => {
  const [data, setData] = useState<FlightInstrumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const maxPossibleValue = 100;
  
  

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

const renderVisualAltitude = () => {
  const percentage = (data?.altitude||0) / (1000);
  const height =  percentage * (100); 
  const clampedHeight = Math.max(0, Math.min(100, height));
 return (
    <div id="compass-container">
      <div 
        style={{ backgroundColor: "green",
          width: '125px', 
          margin: '0 auto', 
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderRadius: '4px 4px 0 0',
          height: `${clampedHeight}%` }}
      >
      </div>
    </div>
    
  );
};

// Render visual HIS display
const renderVisualHis = () => {
  return (
    <div id="compass-container">
      <h2 id="compass-title">HIS</h2>
      <div id="compass-wrapper">
        {/* Compass background */}
        <div id="compass-background">
          {/* Cardinal directions */}
          <div className="north" id="cardinal-direction">270</div>
          <div className="east" id="cardinal-direction">180</div>
          <div className="south" id="cardinal-direction">0</div>
          <div className="west" id="cardinal-direction">90</div>
          
          {/* Degree markers */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              id="degree-marker"
              style={{
                transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-24px)`
              }}
            />
          ))}
        </div>
        
        {/* Needle */}
        <div 
          id="compass-needle"
          style={{ transform: `translateX(-50%) rotate(${data?.his}deg)` }}
        >
          <div id="needle-cap" />
        </div>
        
        {/* Center point */}
        <div id="compass-center" />
      </div>
    </div>
  );
};

// Render visual ADI display
const renderVisualAdi = () => {
  return (
    <div className="compass-container">
      
      {/* Circle container */}
      <div className="circle-container">
        {/* Blue section (top) */}
        <div 
          className="blue-section" 
          style={{ 
            height: `${data?.adi}%`
          }}
        />
        
        {/* Green section (bottom) */}
        <div 
          className="green-section" 
          style={{ 
            height: `${100 - (data?.adi||0)}%`
          }}
        />
      </div>
    </div>
  );
};


return (
  <div>
    <h2>Latest Visual Instrument Data</h2>
    <div id="continer">
      
      {renderVisualAltitude()}
      {renderVisualHis()}
      {renderVisualAdi()}
    </div>
  </div>
);
}
export default VisualDisplay;