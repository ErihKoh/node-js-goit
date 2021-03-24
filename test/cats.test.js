const request = require("supertest");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User, cats, newCat } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_WORD = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_WORD);
User.token = token;

jest.mock("../model/cats.js");
jest.mock("../model/users.js");

describe("Testing the route api/cats", () => {
  let idNewCat;
  describe("should handle get request", () => {
    it("should return 200 status for get all cats", async () => {
      const res = await request(app)
        .get("/api/cats")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cats).toBeInstanceOf(Array);
    });
    it("should return 200 status by id", async () => {
      const cat = cats[0];
      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat).toHaveProperty("_id");
      expect(res.body.data.cat._id).toBe(cat._id);
    });
    it("should return 404 status by wrong id", async () => {
      const wrangId = 12345;
      const res = await request(app)
        .get(`/api/cats/${wrangId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
    });
  });
  describe("should handle post request", () => {
    it("should return 201 status create cat", async () => {
      const res = await request(app)
        .post("/api/cats")
        .set("Authorization", `Bearer ${token}`)
        .send(newCat)
        .set("Accept", "application/json");

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewCat = res.body.data.cat._id;
    });
    it("should return 400 status for wrang field", async () => {
      const res = await request(app)
        .post("/api/cats")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newCat, test: 1 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });
    it("should return 400 status whithout required field name", async () => {
      const res = await request(app)
        .post("/api/cats")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Simon" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });
    it("should return 400 status whithout required field age", async () => {
      const res = await request(app)
        .post("/api/cats")
        .set("Authorization", `Bearer ${token}`)
        .send({ age: 3 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });
  });

  describe("should handle put request", () => {
    it("should return 200 status update cat", async () => {
      const res = await request(app)
        .put(`/api/cats/${idNewCat}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Boris" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat.name).toBe("Boris");
    });
    it("should return 400 status for wrang field", async () => {
      const res = await request(app)
        .put(`/api/cats/${idNewCat}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ test: 1 })
        .set("Accept", "application/json");

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
    });
    it("should return 404 status whith wrong id", async () => {
      const res = await request(app)
        .put(`/api/cats/123456`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Simon" })
        .set("Accept", "application/json");

      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
    });
  });
  describe("should handle patch request", () => {});
  describe("should handle delete request", () => {});
});
