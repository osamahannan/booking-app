Booking App (Micro-Frontend)
This repository contains the Booking micro-frontend, exposing BookingList and BookingForm components via Webpack Module Federation.
Setup Instructions

Clone the repository:
git clone <repository-url>
cd booking-app


Install dependencies:
npm install


Start the development server:
npm start

The app runs on http://localhost:3002.


Architecture Decisions

Module Federation: Exposes booking-related components for dynamic loading.
Standalone: Can run independently for development/testing.
Permissions: Configured in host's config.json to allow 'user' role access.
TypeScript: Uses .tsx for files with JSX (e.g., index.tsx, BookingList.tsx).
React 18: Uses createRoot for rendering (in index.tsx).

Communication Design

Relies on the host for user state (via userLoggedIn event).
Components are stateless, focusing on UI rendering.

Demo Instructions

Local Demo:

Run npm start to start on http://localhost:3002.
Access via host (http://localhost:3000/booking/list) or directly.


Deployed Demo:

Deploy to Vercel: vercel --prod.
Update host's config.json with the deployed URL.
