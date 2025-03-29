import React, { useState, useEffect } from 'react';
import { InstrumentService, FlightInstrumentData } from './services/instrumentService';


const FlightInstrumentDisplay = () => {
  // Sample data - in a real application, this would come from your data source
  const [altitude, setAltitude] = useState(12500);
  const [his, setHis] = useState(270);
  const [adi, setAdi] = useState(5);
  
  // UI state
  const [isVisualMode, setIsVisualMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form state
  const [formAltitude, setFormAltitude] = useState(altitude);
  const [formHis, setFormHis] = useState(his);
  const [formAdi, setFormAdi] = useState(adi);
  
  // Simulate changing values when not in form mode
  useEffect(() => {
    if (!isFormOpen) {
      const interval = setInterval(() => {
        setAltitude(prev => prev + Math.floor(Math.random() * 20 - 10));
        setHis(prev => (prev + Math.floor(Math.random() * 3 - 1) + 360) % 360);
        setAdi(prev => Math.max(-10, Math.min(10, prev + Math.floor(Math.random() * 3 - 1))));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isFormOpen]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAltitude(Number(formAltitude));
    setHis(Number(formHis));
    setAdi(Number(formAdi));
    setIsFormOpen(false);
    try {
      await InstrumentService.createInstrumentRecord({altitude: Number(formAltitude), his: Number(formHis),adi: Number(formAdi)});

    } catch (error) {
        
    }
  };
  
  // Render visual altitude display
  const renderVisualAltitude = () => {
    const altitudePercent = Math.min(100, Math.max(0, (altitude / 20000) * 100));
    return (
      <div className="h-32 bg-gray-700 relative rounded overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-green-500 transition-all duration-500"
          style={{ height: `${altitudePercent}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-mono">
          {altitude.toLocaleString()} ft
        </div>
      </div>
    );
  };
  
  // Render visual HIS display
  const renderVisualHis = () => {
    return (
      <div className="h-32 w-32 bg-gray-700 rounded-full relative mx-auto">
        <div className="absolute inset-0 flex items-center justify-center text-white font-mono">
          {his}°
        </div>
        <div 
          className="absolute top-0 left-1/2 w-1 h-1/2 bg-yellow-500 origin-bottom transform -translate-x-1/2 transition-transform duration-500"
          style={{ transform: `translateX(-50%) rotate(${his}deg)` }}
        ></div>
        {/* Compass marking */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-yellow-500">N</div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-yellow-500">E</div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-yellow-500">S</div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-yellow-500">W</div>
      </div>
    );
  };
  
  // Render visual ADI display
  const renderVisualAdi = () => {
    return (
      <div className="h-32 bg-gray-700 rounded relative">
        <div className="absolute inset-0 flex flex-col">
          <div className="h-1/2 bg-blue-900"></div>
          <div className="h-1/2 bg-brown-500"></div>
        </div>
        <div 
          className="absolute inset-0 flex flex-col transition-transform duration-500"
          style={{ transform: `translateY(${adi * 5}%)` }}
        >
          <div className="h-1/2 bg-blue-900"></div>
          <div className="h-1/2 bg-yellow-900"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-1 bg-white"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-mono">
          {adi > 0 ? '+' : ''}{adi}°
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl font-bold">Flight Instruments</h1>
        <div className="space-x-4">
          <button 
            onClick={() => setIsVisualMode(!isVisualMode)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            {isVisualMode ? "Show Numerical" : "Show Visual"}
          </button>
          <button 
            onClick={() => {
              setFormAltitude(altitude);
              setFormHis(his);
              setFormAdi(adi);
              setIsFormOpen(!isFormOpen);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            {isFormOpen ? "Close Form" : "Change Values"}
          </button>
        </div>
      </div>
      
      {isFormOpen ? (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-white text-lg font-semibold mb-4">Update Instrument Values</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-blue-400 mb-2">Altitude (ft)</label>
                <input 
                  type="number" 
                  value={formAltitude}
                  onChange={(e) => setFormAltitude(Number(e.target.value))}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-blue-400 mb-2">HIS (0-359°)</label>
                <input 
                  type="number" 
                  value={formHis}
                  min="0"
                  max="359"
                  onChange={(e) => setFormHis(Number(e.target.value))}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-blue-400 mb-2">ADI (-10 to +10°)</label>
                <input 
                  type="number" 
                  value={formAdi}
                  min="-10"
                  max="10"
                  onChange={(e) => setFormAdi(Number(e.target.value))}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Update Values
              </button>
            </div>
          </form>
        </div>
      ) : null}
      
      <div className="grid grid-cols-3 gap-6">
        {/* Altitude Display */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-blue-400 text-lg font-semibold mb-2 text-center">Altitude</h2>
          {isVisualMode ? (
            renderVisualAltitude()
          ) : (
            <div className="bg-black rounded-md p-4 h-32 flex items-center justify-center">
              <div className="text-green-500 font-mono text-3xl text-center">
                {altitude.toLocaleString()} ft
              </div>
            </div>
          )}
        </div>
        
        {/* HIS Display */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-blue-400 text-lg font-semibold mb-2 text-center">HIS</h2>
          {isVisualMode ? (
            renderVisualHis()
          ) : (
            <div className="bg-black rounded-md p-4 h-32 flex items-center justify-center">
              <div className="text-yellow-500 font-mono text-3xl text-center">
                {his}°
              </div>
            </div>
          )}
        </div>
        
        {/* ADI Display */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col">
          <h2 className="text-blue-400 text-lg font-semibold mb-2 text-center">ADI</h2>
          {isVisualMode ? (
            renderVisualAdi()
          ) : (
            <div className="bg-black rounded-md p-4 h-32 flex items-center justify-center">
              <div className="text-red-500 font-mono text-3xl text-center">
                {adi > 0 ? '+' : ''}{adi}°
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightInstrumentDisplay;