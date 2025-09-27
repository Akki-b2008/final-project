const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const userModel = require('../src/models/user.model');

// NOTE: Global Mongo + env setup handled in tests/setup.js
// Controller + Route behavior (current):
// Route order: validations -> authMiddlware -> controller
// Validations REQUIRE: street, city, state, pincode (>=4 numeric digits), country
// Optional: isDefault (boolean)
// Auth required (401 if token missing AFTER validations pass). If payload itself invalid, 400 returned before auth check.
// On success: 201, message: "Adderess added successfully" (typo in controller kept), returns updated addresses array.
// If user removed between auth decode & update: 404 with message: "User not found".

describe('POST /api/auth/users/me/addresses', () => {
	const password = 'Secret123!';

	const loginAndGetCookie = async (email) => {
		const res = await request(app).post('/api/auth/login').send({ email, password });
		expect(res.status).toBe(200);
		return res.headers['set-cookie'];
	};

	it('returns 401 when no auth cookie is provided', async () => {
		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.send({ street: '1 Test', city: 'X', state: 'Y', pincode: '1234', country: 'Z' });
		expect(res.status).toBe(401);
		expect(res.body.message).toBe('Unauthorized');
	});

		it('returns 400 when required fields (city/state/pincode/country) are missing', async () => {
		// seed user
		await userModel.create({
			username: 'addr_missing_fields',
			email: 'addr_missing_fields@example.com',
			password: await bcrypt.hash(password, 10),
			fullName: { firstName: 'Addr', lastName: 'Missing' },
		});

		const cookies = await loginAndGetCookie('addr_missing_fields@example.com');

		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.set('Cookie', cookies)
			.send({ street: 'Only Street' });

		expect(res.status).toBe(400);
		expect(res.body.errors).toBeDefined();
		const msgs = res.body.errors.map(e => e.msg);
		// Expect each missing field message
		expect(msgs).toEqual(expect.arrayContaining([
			'City is required',
			'State is required',
			'Pincode is required',
			'Country is required'
		]));
	});

	it('returns 400 when pincode is non-numeric', async () => {
		await userModel.create({
			username: 'addr_bad_pincode',
			email: 'addr_bad_pincode@example.com',
			password: await bcrypt.hash(password, 10),
			fullName: { firstName: 'Addr', lastName: 'BadPin' },
		});
		const cookies = await loginAndGetCookie('addr_bad_pincode@example.com');

		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.set('Cookie', cookies)
			.send({ street: '123', city: 'C', state: 'S', pincode: '12a', country: 'X' });

		expect(res.status).toBe(400);
		const msgs = res.body.errors.map(e => e.msg);
		expect(msgs).toEqual(expect.arrayContaining([
			'Pincode must be numeric',
			'Pincode must be at least 4 digits long' // length check also fails because '12a' length 3 after failing numeric OR we keep both potential messages
		]));
	});

	it('returns 400 when street is missing', async () => {
		await userModel.create({
			username: 'addr_no_street',
			email: 'addr_no_street@example.com',
			password: await bcrypt.hash(password, 10),
			fullName: { firstName: 'Addr', lastName: 'NoStreet' },
		});
		const cookies = await loginAndGetCookie('addr_no_street@example.com');

		// Provide all other required fields except street
		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.set('Cookie', cookies)
			.send({ city: 'City', state: 'ST', pincode: '4444', country: 'USA' });

		expect(res.status).toBe(400);
		expect(res.body.errors).toBeDefined();
		const msgs = res.body.errors.map(e => e.msg);
		expect(msgs).toContain('Street is required');
	});

	it('adds first address successfully (201) and returns addresses array length 1', async () => {
		await userModel.create({
			username: 'addr_first_ok',
			email: 'addr_first_ok@example.com',
			password: await bcrypt.hash(password, 10),
			fullName: { firstName: 'Addr', lastName: 'FirstOK' },
		});
		const cookies = await loginAndGetCookie('addr_first_ok@example.com');

		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.set('Cookie', cookies)
			.send({
				street: '10 Alpha Rd',
				city: 'Metro',
				state: 'CA',
				pincode: '90001',
				country: 'USA',
				isDefault: true,
			});

		expect(res.status).toBe(201);
		expect(res.body.message).toBe('Adderess added successfully');
		expect(Array.isArray(res.body.addresses)).toBe(true);
		expect(res.body.addresses.length).toBe(1);
		expect(res.body.addresses[0].street).toBe('10 Alpha Rd');
	});

	it('appends a second address (length 2 after insert)', async () => {
		await userModel.create({
			username: 'addr_second_ok',
			email: 'addr_second_ok@example.com',
			password: await bcrypt.hash(password, 10),
			fullName: { firstName: 'Addr', lastName: 'SecondOK' },
			addresses: [ { street: '1 First St', city: 'CityOne', state: 'ST', pincode: '1111', country: 'USA', isDefault: true } ],
		});
		const cookies = await loginAndGetCookie('addr_second_ok@example.com');

		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.set('Cookie', cookies)
			.send({ street: '2 Second St', city: 'CityTwo', state: 'ST', pincode: '2222', country: 'USA' });

		expect(res.status).toBe(201);
		expect(res.body.addresses.length).toBe(2);
		const added = res.body.addresses.find(a => a.street === '2 Second St');
		expect(added).toBeDefined();
	});

	it('returns 404 when user was deleted after login before adding address', async () => {
		const user = await userModel.create({
			username: 'addr_deleted_mid',
			email: 'addr_deleted_mid@example.com',
			password: await bcrypt.hash(password, 10),
			fullName: { firstName: 'Addr', lastName: 'DelMid' },
		});
		const cookies = await loginAndGetCookie('addr_deleted_mid@example.com');
		// delete user post-auth
		await userModel.deleteOne({ _id: user._id });

		const res = await request(app)
			.post('/api/auth/users/me/addresses')
			.set('Cookie', cookies)
			.send({ street: 'Ghost', city: 'Gone', state: 'NA', pincode: '5555', country: 'Void' });

		expect(res.status).toBe(404);
		expect(res.body.message).toBe('User not found');
	});
});
