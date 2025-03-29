import React, { useEffect, useState } from 'react';
import './InputFourm.css';
import { InstrumentService, FlightInstrumentData } from '../services/instrumentService';

const InputForum: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    altitude: '',
    his: '',
    adi: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose =() => {
    setIsOpen(false);
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Convert string values to numbers
      const instrumentData: FlightInstrumentData = {
        altitude: Number(formData.altitude),
        his: Number(formData.his),
        adi: Number(formData.adi)
      };

      // Call the service to create the record
      await InstrumentService.createInstrumentRecord(instrumentData);
      
      console.log('Form submitted successfully:', instrumentData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="container">
      <button 
        onClick={handleOpen}
        className="open-button"
      >
        +
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay">
          {/* Popup content */}
          <div className="popup-content">
            <div className="popup-header">
              <h2 className="popup-title">Enter Variables</h2>
              <button onClick={() => {
                  setSubmitted(false);
                  setFormData({ altitude: '', his: '', adi: '' });
                  handleClose()
              }} className="close-button" >
                ✕
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {submitted ? (
              <div className="success-container">
                <p className="success-message">Form submitted successfully!</p>
                <div className="result-container">
                  <p><strong>Altitude:</strong> {formData.altitude}</p>
                  <p><strong>HIS:</strong> {formData.his}</p>
                  <p><strong>ADI:</strong> {formData.adi}</p>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="altitude">
                    Altitude
                  </label>
                  <input
                    type="number"
                    id="altitude"
                    name="altitude"
                    value={formData.altitude}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="his">
                    HIS 
                  </label>
                  <input
                    type="number"
                    id="his"
                    name="his"
                    value={formData.his}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="adi">
                    ADI
                  </label>
                  <input
                    type="number"
                    id="adi"
                    name="adi"
                    value={formData.adi}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForum;