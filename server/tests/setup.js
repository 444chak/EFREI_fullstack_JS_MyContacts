// Test setup file
// Set test environment variables directly
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET_KEY = 'test-secret-key-for-testing-only';
process.env.MONGODB_URI = 'mongodb://localhost:27017/mycontacts_test';

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

