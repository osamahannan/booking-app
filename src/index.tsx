import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookingList from './BookingList';
import BookingForm from './BookingForm';
import { ModuleMetadata } from './shared-types';

const registerModule = () => {
  const metadata: ModuleMetadata = {
    name: 'booking',
    url: window.location.origin + '/remoteEntry.js',
    components: ['BookingList', 'BookingForm'],
    routes: ['/booking/list', '/booking/form'],
    permissions: ['user'],
  };
  window.dispatchEvent(new CustomEvent('moduleRegister', { detail: metadata }));
  console.log('Dispatched moduleRegister for booking-app:', metadata);
};

registerModule();

const container = document.getElementById('root');
if (container) {
  console.log('Rendering booking-app routes');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/booking/list" />} />
        <Route path="/booking/list" element={<BookingList />} />
        <Route path="/booking/form" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error('Root container not found');
}