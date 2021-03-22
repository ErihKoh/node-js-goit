const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs/promises");
const { User, newUser } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_WORD = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_WORD);
User.token = token;

jest.mock("../model/cats.js");
jest.mock("../model/users.js");
jest.mock("cloudinary");

describe("Testing the route api/users", () => {
  it("should return 201 status registration", async (done) => {
    const res = await request(app)
      .post("/api/users/registration")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 409 status registration - email already used", async (done) => {
    const res = await request(app)
      .post("/api/users/registration")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
    done();
  });
  it("should return 200 status login", async (done) => {
    const res = await request(app)
      .post("/api/users/login")
      .send(newUser)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 401 status login", async (done) => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "fake@test.com", password: "123456" })
      .set("Accept", "application/json");

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
    done();
  });

  it("should return 200 status upload avatar", async (done) => {
    const buffer = await fs.readFile("./test/tree.jpg");
    const res = await request(app)
      .patch("/api/users/avatar")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buffer, "tree.jpg");
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    done();
  });
});
