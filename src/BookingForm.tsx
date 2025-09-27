import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [facility, setFacility] = useState('');
  return (
    <div>
      <h2>Book a Facility</h2>
      <input value={facility} onChange={(e) => setFacility(e.target.value)} placeholder="Facility Name" />
      <button>Book</button>
    </div>
  );
};

export default BookingForm;