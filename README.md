Booking App
The Booking App is a micro-frontend in a Webpack Module Federation architecture, providing a facility booking system with listing and form components using React and TypeScript.
Repository

GitHub: https://github.com/osamahannan/booking-app

Features

Booking System: Exposes BookingList and BookingForm components for managing facility bookings.
Self-Registration: Registers with the host via the moduleRegister event, providing metadata for routes (/booking/list, /booking/form) restricted to user or admin roles.
Role-Based Access: Routes require user or admin permissions.
Netlify Deployment: Independently deployed with CORS headers for remoteEntry.js.

Setup

Clone the Repository:git clone https://github.com/osamahannan/booking-app.git
cd booking-app


Install Dependencies:npm install


Run Locally:npm start


Opens at http://localhost:3002.
Test standalone routes: http://localhost:3002/booking/list, http://localhost:3002/booking/form.


Build for Production:npm run build


Outputs to dist/.


Deploy to Netlify:npm run deploy


Deploys to https://micro-booking.netlify.app.



Architecture Decisions

Webpack Module Federation: Exposes BookingList and BookingForm via remoteEntry.js for host integration.
TypeScript: Ensures type safety for components and shared ModuleMetadata interface.
React with react-router-dom: Supports standalone routing for testing (/booking/list, /booking/form).
SPA Routing: Configured historyApiFallback and netlify.toml for consistent SPA behavior.
Role-Based Access: Routes restricted to user or admin, enforced by the host’s routing logic.

Communication Design

Self-Registration: Dispatches moduleRegister event in index.tsx with metadata (name: booking, routes, components, permissions: ['user'], URL).
Shared Dependencies: Shares react, react-dom, react-router-dom as singletons with the host.
CORS: netlify.toml sets Access-Control-Allow-Origin: * for remoteEntry.js access.
No Direct Events: Relies on host’s userRole state for access control, updated via auth-app events.

Testing

Local: Run npm start and test http://localhost:3002/booking/list. Verify routes in the host (http://localhost:3000/booking/list) after login.
Production: Test at https://micro-booking.netlify.app/booking/list and in the host at https://micro-host-app.netlify.app/booking/list.
Self-Registration: Check console for Dispatched moduleRegister for booking-app log.
