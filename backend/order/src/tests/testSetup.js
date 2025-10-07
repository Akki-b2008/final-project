const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

// mock axios so tests can set implementations per-test
jest.mock('axios');
const axios = require('axios');

// mock redis used by auth middleware
jest.mock('../db/redis', () => ({
  get: jest.fn().mockResolvedValue(null),
}));

let mongoServer;
let app;
let OrderModel;

async function initTestEnv() {
  // start in-memory mongo
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // connect mongoose
  await mongoose.connect(uri);

  // require app and models after mongoose connect so models bind to this connection
  app = require('../app');
  OrderModel = require('../models/order.model');

  // set JWT secret for middleware
  process.env.JWT_SECRET = 'testsecret';

  return { app, OrderModel, axios };
}

async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

async function closeTestEnv() {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}

function createToken(payload = {}) {
  const id = payload.id || new mongoose.Types.ObjectId().toHexString();
  const role = payload.role || 'user';
  return jwt.sign({ id, role }, process.env.JWT_SECRET);
}

module.exports = {
  initTestEnv,
  clearDatabase,
  closeTestEnv,
  createToken,
  axios,
};
