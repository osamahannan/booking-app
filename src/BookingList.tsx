import React, { useState, useEffect } from 'react';
import './styles.css';

interface Booking {
  id: string;
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBookings: Booking[] = [
        {
          id: '1',
          facility: 'Conference Room A',
          date: '2024-01-15',
          startTime: '09:00',
          endTime: '11:00',
          purpose: 'Team meeting',
          attendees: 8,
          status: 'confirmed',
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          facility: 'Training Room',
          date: '2024-01-16',
          startTime: '14:00',
          endTime: '17:00',
          purpose: 'Workshop presentation',
          attendees: 15,
          status: 'pending',
          createdAt: '2024-01-11'
        },
        {
          id: '3',
          facility: 'Boardroom',
          date: '2024-01-12',
          startTime: '10:00',
          endTime: '12:00',
          purpose: 'Client presentation',
          attendees: 5,
          status: 'confirmed',
          createdAt: '2024-01-08'
        },
        {
          id: '4',
          facility: 'Meeting Room 1',
          date: '2024-01-10',
          startTime: '15:00',
          endTime: '16:00',
          purpose: 'One-on-one meeting',
          attendees: 2,
          status: 'cancelled',
          createdAt: '2024-01-05'
        }
      ];
      setBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="booking-container">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="booking-header">
          <span className="booking-icon">📋</span>
          <h1 className="booking-title">My Bookings</h1>
          <p className="booking-subtitle">Manage your facility reservations</p>
        </div>

        <div className="form-group">
          <label className="form-label">Filter by Status</label>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            style={{ maxWidth: '200px' }}
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3 className="empty-title">No bookings found</h3>
            <p className="empty-description">
              {filter === 'all' 
                ? "You haven't made any bookings yet." 
                : `No ${filter} bookings found.`
              }
            </p>
          </div>
        ) : (
          <div className="bookings-grid">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="booking-item">
                <div className="booking-item-header">
                  <h3 className="booking-facility">{booking.facility}</h3>
                  <span className={`booking-status status-${booking.status}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="booking-detail">
                    <span className="booking-detail-label">Date</span>
                    <span className="booking-detail-value">{formatDate(booking.date)}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-detail-label">Time</span>
                    <span className="booking-detail-value">
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                    </span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-detail-label">Attendees</span>
                    <span className="booking-detail-value">{booking.attendees} people</span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-detail-label">Purpose</span>
                    <span className="booking-detail-value">{booking.purpose}</span>
                  </div>
                </div>

                {booking.status !== 'cancelled' && (
                  <div className="booking-actions">
                    <button className="action-button edit-button">
                      Edit
                    </button>
                    <button 
                      className="action-button cancel-button"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;