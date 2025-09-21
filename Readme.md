# DigiSaarthi - Smart Public Transport Tracking System

## Overview

DigiSaarthi is a comprehensive real-time public transportation tracking system designed to modernize urban transit experiences. The application provides live vehicle tracking, route optimization, and enhanced passenger convenience through a multi-platform approach. The system consists of a web-based passenger interface for real-time bus tracking and a mobile driver application for location broadcasting, creating a complete ecosystem for smart public transport management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client application is built using React with TypeScript, leveraging modern web technologies for optimal performance and user experience:

- **Framework**: React 18 with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The server follows a REST API architecture built on Node.js and Express:

- **Framework**: Express.js with TypeScript for robust API development
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: bcrypt for password hashing and security
- **Middleware**: Custom logging and error handling middleware
- **Development**: Hot module replacement and development server integration

### Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM:

- **Database**: PostgreSQL hosted on Neon for scalability and reliability
- **Schema Management**: Drizzle migrations for version-controlled database changes
- **Connection Pooling**: Neon serverless connection pooling for efficient resource utilization
- **Data Models**: Users (passengers/drivers) and Vehicles with real-time location tracking

### Authentication and Authorization
The system implements a role-based authentication mechanism:

- **User Roles**: Passenger and Driver account types with differentiated access
- **Password Security**: bcrypt hashing with salt rounds for secure password storage
- **Session Management**: Express sessions with PostgreSQL session store
- **Route Protection**: Middleware-based route protection for sensitive endpoints

### Real-time Features
The application provides real-time vehicle tracking capabilities:

- **Location Updates**: Driver mobile app broadcasts real-time GPS coordinates
- **Map Integration**: Google Maps API for interactive vehicle visualization
- **Live Status**: Real-time vehicle occupancy, delays, and route information
- **Push Notifications**: Driver app integration for route and passenger updates

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL-compatible serverless database for data persistence
- **Connection Management**: WebSocket support for real-time database connections

### Maps and Location Services
- **Google Maps API**: Interactive maps, geocoding, and route visualization
- **GPS Tracking**: Mobile device location services for driver position updates

### Third-party Libraries
- **UI Framework**: Radix UI for accessible component primitives
- **Validation**: Zod for runtime type checking and form validation
- **HTTP Client**: Native fetch API with custom request wrapper for API communication
- **Animation**: CSS-based animations with Tailwind utilities

### Development Tools
- **Replit Integration**: Development environment with live reload and error handling
- **Build Pipeline**: Vite for client bundling and esbuild for server compilation
- **Type Checking**: TypeScript compiler for static type analysis

### Mobile Application
- **Driver Mobile App**: React Native or PWA for real-time location broadcasting
- **App Store Distribution**: iOS App Store and Google Play Store deployment
- **Push Notifications**: Firebase Cloud Messaging for driver alerts and updates