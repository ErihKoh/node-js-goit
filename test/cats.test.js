const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User, cats } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_WORD = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_WORD);
User.token = token;

jest.mock("../model/cats.js");
jest.mock("../model/users.js");

describe("Testing the route api/cats", () => {
  describe("should handle get request", () => {
    it("should return 200 status for get all cats", async (done) => {
      const res = await request(app)
        .get("/api/cats")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cats).toBeInstanceOf(Array);
      done();
    });
    it("should return 200 status by id", async (done) => {
      const cat = cats[0];
      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat).toHaveProperty("_id");
      // expect(res.body.cat.id).toBe(cat._id);
      done();
    });
  });
  describe("should handle post request", () => {});
  describe("should handle put request", () => {});
  describe("should handle patch request", () => {});
  describe("should handle delete request", () => {});
});
