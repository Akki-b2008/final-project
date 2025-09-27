const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const connectDB = require("../src/db/db");
const userModel = require("../src/models/user.model");

// Tests for: GET /api/auth/users/me/addresses
// Covered cases:
// 1. 401 without auth cookie
// 2. 200 with empty addresses array
// 3. 200 with existing addresses returned
// 4. 401 when user no longer exists after token was issued

describe("GET /api/auth/users/me/addresses", () => {
  beforeAll(async () => {
    await connectDB();
  });

  it("returns 401 when no auth cookie is provided", async () => {
    const res = await request(app).get("/api/auth/users/me/addresses");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  it("returns 200 and empty addresses array for a new user", async () => {
    const password = "Secret123!";
    const hash = await bcrypt.hash(password, 10);
    await userModel.create({
      username: "addr_empty",
      email: "addr_empty@example.com",
      password: hash,
      fullName: { firstName: "Addr", lastName: "Empty" },
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "addr_empty@example.com", password });
    expect(loginRes.status).toBe(200);
    const cookies = loginRes.headers["set-cookie"];
    expect(cookies).toBeDefined();

    const res = await request(app)
      .get("/api/auth/users/me/addresses")
      .set("Cookie", cookies);

    expect(res.status).toBe(200);
    expect(res.body.addresses).toBeDefined();
    expect(Array.isArray(res.body.addresses)).toBe(true);
    expect(res.body.addresses.length).toBe(0);
    expect(res.body.message).toBe("User's addresses fetched successfully");
  });

  it("returns 200 and existing addresses", async () => {
    const password = "Secret123!";
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username: "addr_user",
      email: "addr_user@example.com",
      password: hash,
      fullName: { firstName: "Addr", lastName: "User" },
      addresses: [
        {
          street: "123 Main St",
          city: "Townsville",
          state: "TS",
          zip: "12345",
          country: "USA",
          isDefault: true,
        },
        {
          street: "456 Side Ave",
          city: "Villageton",
          state: "VT",
          zip: "67890",
          country: "USA",
        },
      ],
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "addr_user@example.com", password });
    expect(loginRes.status).toBe(200);
    const cookies = loginRes.headers["set-cookie"];

    const res = await request(app)
      .get("/api/auth/users/me/addresses")
      .set("Cookie", cookies);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.addresses)).toBe(true);
    expect(res.body.addresses.length).toBe(2);
    const defaultAddr = res.body.addresses.find((a) => a.isDefault);
    expect(defaultAddr).toBeDefined();
    expect(defaultAddr.street).toBe("123 Main St");
  });

  it("returns 401 when user no longer exists", async () => {
    const password = "Secret123!";
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username: "addr_deleted",
      email: "addr_deleted@example.com",
      password: hash,
      fullName: { firstName: "Addr", lastName: "Deleted" },
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "addr_deleted@example.com", password });
    expect(loginRes.status).toBe(200);
    const cookies = loginRes.headers["set-cookie"];

    // delete user after token issued
    await userModel.deleteOne({ _id: user._id });

    const res = await request(app)
      .get("/api/auth/users/me/addresses")
      .set("Cookie", cookies);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("user not found");
  });
});
