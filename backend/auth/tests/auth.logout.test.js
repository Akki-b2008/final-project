
const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const connectDB = require('../src/db/db');
const userModel = require('../src/models/user.model');
const redis = require('../src/db/redis');

// Skipped until the /api/auth/logout endpoint is implemented
describe('GET /api/auth/logout', () => {
    beforeAll(async () => {
        await connectDB();
    });

    it('clears the auth cookie and returns 200 when logged in', async () => {
        // Seed and login to get cookie
        const password = 'Secret123!';
        const hash = await bcrypt.hash(password, 10);
        await userModel.create({
            username: 'logout_user',
            email: 'logout@example.com',
            password: hash,
            fullName: { firstName: 'Log', lastName: 'Out' },
        });

        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({ email: 'logout@example.com', password });

        expect(loginRes.status).toBe(200);
        const cookies = loginRes.headers[ 'set-cookie' ];
        expect(cookies).toBeDefined();

        const res = await request(app)
            .get('/api/auth/logout')
            .set('Cookie', cookies)
            .expect(200);

        const setCookie = res.headers[ 'set-cookie' ] || [];
        const cookieStr = setCookie.join(';');
        // token cookie cleared (empty value) and expired
        expect(cookieStr).toMatch(/token=;/);
        expect(cookieStr.toLowerCase()).toMatch(/expires=/);
        // redis blacklist called
        expect(redis.set).toHaveBeenCalledTimes(1);
        const [key] = redis.set.mock.calls[0];
        expect(key.startsWith('blacklist')).toBe(true);
    });

    it('is idempotent: returns 200 even without auth cookie', async () => {
        const res = await request(app).get('/api/auth/logout').expect(200);
        expect(res.body).toHaveProperty('message', 'Logged out successfully');
    });
});
