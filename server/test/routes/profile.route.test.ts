import app from "../../src/app";
import request from "supertest";
import { expect, test, describe, beforeAll } from "@jest/globals";

beforeAll(async () => await new Promise((f) => setTimeout(f, 2000)));

describe("Profile Test", () => {
  test("No Login", (done) => {
    request(app)
      .get("/api/profile")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "Unauthorized" });
        if (err) done(err);
        else return done();
      });
  });

  test("Invalid Token", (done) => {
    request(app)
      .get("/api/profile")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer abc.xyz.rst")
      .expect("Content-Type", /json/)
      .expect(401)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "Unauthorized" });
        if (err) done(err);
        else return done();
      });
  });

  test("Valid Token", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com", password: "reallybadpassword" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        const token = res.body.token;
        request(app)
          .get("/api/profile")
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${token}`)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(function (err, res) {
            expect(res.body).toMatchObject({
              name: "john",
              email: "john@example.com",
              auth_provider: "email",
            });
            if (err) done(err);
            else return done();
          });
      });
  });
});
