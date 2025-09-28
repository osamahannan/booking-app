import React, { useState } from 'react';
import './styles.css';

interface BookingData {
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: number;
}

const BookingForm: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    facility: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    attendees: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const facilities = [
    'Conference Room A',
    'Conference Room B',
    'Meeting Room 1',
    'Meeting Room 2',
    'Training Room',
    'Auditorium',
    'Boardroom'
  ];

  const handleInputChange = (field: keyof BookingData, value: string | number) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingData.facility || !bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      setSuccess('Booking created successfully!');
      setBookingData({
        facility: '',
        date: '',
        startTime: '',
        endTime: '',
        purpose: '',
        attendees: 1
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="booking-container">
      <div className="booking-card booking-form-cad">
        <div className="booking-header">
          <span className="booking-icon">📅</span>
          <h1 className="booking-title">Book a Facility</h1>
          <p className="booking-subtitle">Reserve your meeting space</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Facility *</label>
            <select
              className="form-select"
              value={bookingData.facility}
              onChange={(e) => handleInputChange('facility', e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a facility</option>
              {facilities.map(facility => (
                <option key={facility} value={facility}>{facility}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                type="date"
                className="form-input"
                value={bookingData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                disabled={isLoading}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Attendees</label>
              <input
                type="number"
                className="form-input"
                value={bookingData.attendees}
                onChange={(e) => handleInputChange('attendees', parseInt(e.target.value) || 1)}
                min="1"
                max="50"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Time *</label>
              <input
                type="time"
                className="form-input"
                value={bookingData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Time *</label>
              <input
                type="time"
                className="form-input"
                value={bookingData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Purpose</label>
            <textarea
              className="form-textarea"
              value={bookingData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              placeholder="Describe the purpose of your booking..."
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="booking-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner" style={{ display: 'inline-block', marginRight: '0.5rem' }}></div>
                Creating Booking...
              </>
            ) : (
              'Create Booking'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;