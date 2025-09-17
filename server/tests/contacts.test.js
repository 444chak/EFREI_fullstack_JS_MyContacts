const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import routes and models
const contactRoutes = require('../routes/contact');
const authRoutes = require('../routes/auth');
const User = require('../models/user');
const Contact = require('../models/contact');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Mock error handler
app.use((err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal server error";
    const details = err.details || undefined;

    const payload = { message };
    if (details) payload.details = details;

    res.status(status).json(payload);
});

describe('Contact Endpoints', () => {
    let testUser;
    let testToken;
    let testContact;

    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGODB_URI);

        // Clear collections
        await User.deleteMany({});
        await Contact.deleteMany({});
    });

    afterAll(async () => {
        // Clean up
        await User.deleteMany({});
        await Contact.deleteMany({});
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clean up before each test to avoid duplicate key errors
        await User.deleteMany({});
        await Contact.deleteMany({});

        // Create a test user with unique email
        const hashedPassword = await bcrypt.hash('testpassword123', 10);
        const uniqueEmail = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@example.com`;
        testUser = new User({
            email: uniqueEmail,
            password: hashedPassword
        });
        await testUser.save();

        // Generate test token
        testToken = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        // Create a test contact
        testContact = new Contact({
            firstName: 'John',
            lastName: 'Doe',
            phone: '1234567890',
            contactOf: testUser._id
        });
        await testContact.save();
    });

    afterEach(async () => {
        // Clean up after each test
        await User.deleteMany({});
        await Contact.deleteMany({});
    });

    describe('GET /api/contacts', () => {
        it('should get all contacts for authenticated user', async () => {
            const response = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(1);
            expect(response.body[0].firstName).toBe('John');
            expect(response.body[0].lastName).toBe('Doe');
            expect(response.body[0].phone).toBe('1234567890');
            expect(response.body[0].contactOf).toBe(testUser._id.toString());
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/contacts')
                .expect(401);

            expect(response.body.message).toBe('Unauthorized');
        });

        it('should return 401 with invalid token', async () => {
            const response = await request(app)
                .get('/api/contacts')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);

            expect(response.body.message).toBe('Invalid token');
        });

        it('should return empty array for user with no contacts', async () => {
            // Create another user
            const anotherUser = new User({
                email: 'another@example.com',
                password: await bcrypt.hash('password123', 10)
            });
            await anotherUser.save();

            const anotherToken = jwt.sign({ userId: anotherUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            const response = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${anotherToken}`)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(0);
        });
    });

    describe('POST /api/contacts', () => {
        it('should create a new contact with valid data', async () => {
            const contactData = {
                firstName: 'Jane',
                lastName: 'Smith',
                phone: '0987654321'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${testToken}`)
                .send(contactData)
                .expect(201);

            expect(response.body.firstName).toBe(contactData.firstName);
            expect(response.body.lastName).toBe(contactData.lastName);
            expect(response.body.phone).toBe(contactData.phone);
            expect(response.body.contactOf).toBe(testUser._id.toString());
            expect(response.body._id).toBeDefined();

            // Verify contact was saved to database
            const savedContact = await Contact.findById(response.body._id);
            expect(savedContact).toBeTruthy();
        });

        it('should return 401 without token', async () => {
            const contactData = {
                firstName: 'Jane',
                lastName: 'Smith',
                phone: '0987654321'
            };

            const response = await request(app)
                .post('/api/contacts')
                .send(contactData)
                .expect(401);

            expect(response.body.message).toBe('Unauthorized');
        });

        it('should return 400 for missing firstName', async () => {
            const contactData = {
                lastName: 'Smith',
                phone: '0987654321'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${testToken}`)
                .send(contactData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'firstName', message: 'firstName is required' });
        });

        it('should return 400 for missing lastName', async () => {
            const contactData = {
                firstName: 'Jane',
                phone: '0987654321'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${testToken}`)
                .send(contactData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'lastName', message: 'lastName is required' });
        });

        it('should return 400 for missing phone', async () => {
            const contactData = {
                firstName: 'Jane',
                lastName: 'Smith'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${testToken}`)
                .send(contactData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'phone', message: 'phone is required' });
        });

        it('should return 400 for invalid phone format', async () => {
            const contactData = {
                firstName: 'Jane',
                lastName: 'Smith',
                phone: 'invalid-phone'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${testToken}`)
                .send(contactData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'phone', message: 'Invalid phone, must be 10 digits' });
        });
    });

    describe('PATCH /api/contacts/:id', () => {
        it('should update contact with valid data', async () => {
            const updateData = {
                firstName: 'Johnny',
                lastName: 'Updated',
                phone: '1111111111'
            };

            const response = await request(app)
                .patch(`/api/contacts/${testContact._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send(updateData)
                .expect(200);

            expect(response.body.firstName).toBe(updateData.firstName);
            expect(response.body.lastName).toBe(updateData.lastName);
            expect(response.body.phone).toBe(updateData.phone);
            expect(response.body._id).toBe(testContact._id.toString());

            // Verify contact was updated in database
            const updatedContact = await Contact.findById(testContact._id);
            expect(updatedContact.firstName).toBe(updateData.firstName);
            expect(updatedContact.lastName).toBe(updateData.lastName);
            expect(updatedContact.phone).toBe(updateData.phone);
        });

        it('should return 401 without token', async () => {
            const updateData = {
                firstName: 'Johnny',
                lastName: 'Updated',
                phone: '1111111111'
            };

            const response = await request(app)
                .patch(`/api/contacts/${testContact._id}`)
                .send(updateData)
                .expect(401);

            expect(response.body.message).toBe('Unauthorized');
        });

        it('should return 404 for non-existent contact', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = {
                firstName: 'Johnny',
                lastName: 'Updated',
                phone: '1111111111'
            };

            const response = await request(app)
                .patch(`/api/contacts/${nonExistentId}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send(updateData)
                .expect(404);

            expect(response.body.message).toBe('Contact not found or not authorized');
        });

        it('should return 404 for contact belonging to another user', async () => {
            // Create another user and contact
            const anotherUser = new User({
                email: 'another@example.com',
                password: await bcrypt.hash('password123', 10)
            });
            await anotherUser.save();

            const anotherContact = new Contact({
                firstName: 'Another',
                lastName: 'User',
                phone: '9999999999',
                contactOf: anotherUser._id
            });
            await anotherContact.save();

            const updateData = {
                firstName: 'Johnny',
                lastName: 'Updated',
                phone: '1111111111'
            };

            const response = await request(app)
                .patch(`/api/contacts/${anotherContact._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send(updateData)
                .expect(404);

            expect(response.body.message).toBe('Contact not found or not authorized');
        });

        it('should return 400 for invalid phone format', async () => {
            const updateData = {
                firstName: 'Johnny',
                lastName: 'Updated',
                phone: 'invalid-phone'
            };

            const response = await request(app)
                .patch(`/api/contacts/${testContact._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .send(updateData)
                .expect(400);

            expect(response.body.message).toBe('Validation failed');
            expect(response.body.details).toContainEqual({ field: 'phone', message: 'Invalid phone, must be 10 digits' });
        });
    });

    describe('DELETE /api/contacts/:id', () => {
        it('should delete contact successfully', async () => {
            const response = await request(app)
                .delete(`/api/contacts/${testContact._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .expect(200);

            expect(response.body.message).toBe('Contact deleted successfully');

            // Verify contact was deleted from database
            const deletedContact = await Contact.findById(testContact._id);
            expect(deletedContact).toBeNull();
        });

        it('should return 401 without token', async () => {
            const response = await request(app)
                .delete(`/api/contacts/${testContact._id}`)
                .expect(401);

            expect(response.body.message).toBe('Unauthorized');
        });

        it('should return 404 for non-existent contact', async () => {
            const nonExistentId = new mongoose.Types.ObjectId();

            const response = await request(app)
                .delete(`/api/contacts/${nonExistentId}`)
                .set('Authorization', `Bearer ${testToken}`)
                .expect(404);

            expect(response.body.message).toBe('Contact not found or not authorized');
        });

        it('should return 404 for contact belonging to another user', async () => {
            // Create another user and contact
            const anotherUser = new User({
                email: 'another@example.com',
                password: await bcrypt.hash('password123', 10)
            });
            await anotherUser.save();

            const anotherContact = new Contact({
                firstName: 'Another',
                lastName: 'User',
                phone: '9999999999',
                contactOf: anotherUser._id
            });
            await anotherContact.save();

            const response = await request(app)
                .delete(`/api/contacts/${anotherContact._id}`)
                .set('Authorization', `Bearer ${testToken}`)
                .expect(404);

            expect(response.body.message).toBe('Contact not found or not authorized');
        });
    });
});
