const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let mongo;

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});

// Helper to create auth token
global.signin = (role = 'seller', id = new mongoose.Types.ObjectId().toString()) => {
  const payload = { id, role };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
