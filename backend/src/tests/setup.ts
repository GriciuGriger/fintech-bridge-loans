import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env['NODE_ENV'] = 'test';
process.env['JWT_SECRET'] = 'test-jwt-secret';
process.env['POSTGRES_DB'] = 'fintech_loans_test';
process.env['MONGODB_DB'] = 'fintech_loans_test';

// Global test timeout
jest.setTimeout(30000);

// Mock console methods in tests to reduce noise
global.console = {
  ...console,
  // Uncomment to silence console logs in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
