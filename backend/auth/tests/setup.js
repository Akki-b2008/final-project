const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
// Prevent any real Redis connections by mocking ioredis itself BEFORE app code loads
jest.mock('ioredis', () => {
    const mockClient = {
        set: jest.fn().mockResolvedValue('OK'),
        get: jest.fn().mockResolvedValue(null),
        del: jest.fn().mockResolvedValue(1),
        on: jest.fn(),
    };
    return { Redis: jest.fn(() => mockClient) };
});

// Additionally mock our redis wrapper module (path as resolved in tests) to expose same mocked client
jest.mock('../src/db/redis', () => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue(null),
    del: jest.fn().mockResolvedValue(1),
    on: jest.fn(),
}));

let mongo;

beforeAll(async () => {
    // Start in-memory MongoDB
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    process.env.MONGO_URI = uri; // ensure app's db connector uses this
    process.env.JWT_SECRET = "test_jwt_secret"; // set a test JWT secret

    await mongoose.connect(uri);
});

afterEach(async () => {
    // Cleanup all collections between tests
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    if (mongo) await mongo.stop();
});