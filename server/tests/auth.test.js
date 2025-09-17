const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import routes and models
const authRoutes = require('../routes/auth');
const User = require('../models/user');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock error handler
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";
    const details = err.details || undefined;

    const payload = { message };
    if (details) payload.details = details;

    res.status(status).json(payload);
});

describe('Auth Endpoints', () => {
    let testUser;
    let testToken;

    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI);

        // Clear users collection
        await User.deleteMany({});
    });

    afterAll(async () => {
        // Clean up
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clean up before each test to avoid duplicate key errors
        await User.deleteMany({});

        // Create a test user for login tests with unique email
        const hashedPassword = await bcrypt.hash('testpassword123', 10);
        const uniqueEmail = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@example.com`;
        testUser = new User({
            email: uniqueEmail,
            password: hashedPassword
        });
        await testUser.save();

        // Generate test token
        testToken = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    });

    afterEach(async () => {
        // Clean up after each test
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user with valid data', async () => {
            const userData = {
                email: 'newuser@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body.message).toBe('User created successfully');
            expect(response.body.user.email).toBe(userData.email);
            expect(response.body.user.id).toBeDefined();
            expect(response.body.user.password).toBeUndefined();

            // Verify user was saved to database
            const savedUser = await User.findOne({ email: userData.email });
            expect(savedUser).toBeTruthy();
            expect(savedUser.email).toBe(userData.email);
        });

        it('should return 400 for missing email', async () => {
            const userData = {
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'email', message: 'email is required' });
        });

        it('should return 400 for missing password', async () => {
            const userData = {
                email: 'test@example.com'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'password', message: 'password is required' });
        });

        it('should return 400 for invalid email format', async () => {
            const userData = {
                email: 'invalid-email',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'email', message: 'Invalid email, must be a valid email' });
        });

        it('should return 400 for duplicate email', async () => {
            // First, create a user
            const firstUserData = {
                email: 'duplicate@example.com',
                password: 'password123'
            };

            await request(app)
                .post('/api/auth/register')
                .send(firstUserData)
                .expect(201);

            // Then try to create another user with the same email
            const userData = {
                email: 'duplicate@example.com', // Same as first user
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.message).toBe('Email already in use');
        });

        it('should hash password before saving', async () => {
            const userData = {
                email: 'hashtest@example.com',
                password: 'password123'
            };

            await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            const savedUser = await User.findOne({ email: userData.email });
            expect(savedUser.password).not.toBe(userData.password);
            expect(await bcrypt.compare(userData.password, savedUser.password)).toBe(true);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login with valid credentials', async () => {
            const loginData = {
                email: testUser.email, // Use the dynamically created user email
                password: 'testpassword123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body.message).toBe('Login successful');
            expect(response.body.token).toBeDefined();
            expect(response.body.user.email).toBe(loginData.email);
            expect(response.body.user.id).toBeDefined();
            expect(response.body.user.password).toBeUndefined();

            // Verify token is valid
            const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET_KEY);
            expect(decoded.userId).toBe(testUser._id.toString());
        });

        it('should return 401 for non-existent user', async () => {
            const loginData = {
                email: 'nonexistent@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should return 401 for wrong password', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should return 400 for missing email', async () => {
            const loginData = {
                password: 'testpassword123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'email', message: 'email is required' });
        });

        it('should return 400 for missing password', async () => {
            const loginData = {
                email: 'test@example.com'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'password', message: 'password is required' });
        });

        it('should return 400 for invalid email format', async () => {
            const loginData = {
                email: 'invalid-email',
                password: 'testpassword123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'email', message: 'Invalid email, must be a valid email' });
        });
    });
});
