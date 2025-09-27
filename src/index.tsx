import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingList from './BookingList';
import BookingForm from './BookingForm';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Welcome to Booking App</div>} />
        <Route path="/booking/list" element={<BookingList />} />
        <Route path="/booking/form" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root container not found');
}