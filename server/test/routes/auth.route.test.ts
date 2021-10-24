import app from "../../src/app";
import request from "supertest";
import { expect, test, describe, beforeAll } from "@jest/globals";
import User from "../../src/models/user.model";

beforeAll(async () => await new Promise((f) => setTimeout(f, 2000)));

describe("Login Test", () => {
  test("Valid login", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com", password: "reallybadpassword" })
      .set("Accept", "application/json")
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

  test("No such user", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "sam@example.com", password: "wrongpassword" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "Email or Password incorrect" });
        if (err) done(err);
        else return done();
      });
  });

  test("Wrong auth provider", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "larry@example.com", password: "wrongpassword" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(409)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "Wrong auth provider" });
        if (err) done(err);
        else return done();
      });
  });

  test("Wrong password", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com", password: "wrongpassword" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "Email or Password incorrect" });
        if (err) done(err);
        else return done();
      });
  });

  test("Short password", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com", password: "123" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        expect(res.body).toMatchObject({
          err: "password length must be at least 8 characters long",
        });
        if (err) done(err);
        else return done();
      });
  });

  test("No password", (done) => {
    request(app)
      .post("/api/auth/login")
      .send({ email: "john@example.com" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "password is required" });
        if (err) done(err);
        else return done();
      });
  });

  test("No email", (done) => {
    request(app)
      .post("/api/auth/login")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "email is required" });
        if (err) done(err);
        else return done();
      });
  });
});

describe("Signup Test", () => {
  test("Valid Signup", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "steve@example.com",
        password: "reallybadpassword",
        name: "steve",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(async function (err, res) {
        expect(res.body).toMatchObject({ msg: "User Registered" });
        const user = await User.findOne({
          where: { email: "steve@example.com" },
        });
        expect(user).not.toBeNull();
        if (err) done(err);
        else return done();
      });
  });

  test("User exists", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "john@example.com",
        password: "reallybadpassword",
        name: "john",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(409)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "Email already registered" });
        if (err) done(err);
        else return done();
      });
  });

  test("No name", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({ email: "john@example.com", password: "reallybadpassword" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "name is required" });
        if (err) done(err);
        else return done();
      });
  });

  test("No password", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({ email: "john@example.com" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "password is required" });
        if (err) done(err);
        else return done();
      });
  });

  test("No email", (done) => {
    request(app)
      .post("/api/auth/signup")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        expect(res.body).toMatchObject({ err: "email is required" });
        if (err) done(err);
        else return done();
      });
  });
});
