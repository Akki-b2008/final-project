const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

afterEach(async () => {
  // clear database between tests
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

// Mock the auth middleware to inject a test user
jest.mock('./src/middlewares/auth.middleware', () => {
  return jest.fn(() => (req, res, next) => {
    req.user = { id: '000000000000000000000001', roles: ['user'] };
    next();
  });
});
