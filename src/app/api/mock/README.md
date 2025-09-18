# Mock API Endpoints

This folder contains mock API endpoints that simulate real API behavior for development and testing purposes.

## Available Endpoints

### App Data
- **POST** `/api/mock/app` - Returns application configuration data

### Hotels
- **POST** `/api/mock/hotels` - Returns mock hotel search results

### Locations
- **GET** `/api/mock/locations?city={city}` - Returns mock location data

### Newsletter
- **POST** `/api/mock/newsletter` - Mock newsletter subscription

### Authentication
- **POST** `/api/mock/auth/login` - Mock user login (test@example.com / password)
- **POST** `/api/mock/auth/signup` - Mock user registration
- **POST** `/api/mock/auth/forgot` - Mock forgot password

### Countries
- **POST** `/api/mock/countries` - Returns mock countries list

## Features

- Simulated API delays (100-250ms)
- Realistic response structures
- Error handling
- Mock authentication with test credentials

## Usage

All original API calls have been updated to use these mock endpoints. The mock data provides a realistic development experience without requiring external API dependencies.