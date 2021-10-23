import { expect, test, jest, describe } from "@jest/globals";
import {
  jwtStrategy,
  JwtPayload,
  jwtStrategyCallback,
} from "../../src/config/passport.config";
import { Strategy as JwtStrategy } from "passport-jwt";

test("JWT Strategy is exported", async () => {
  await new Promise((f) => setTimeout(f, 1000));
  expect(jwtStrategy).toBeInstanceOf(JwtStrategy);
});

describe("JWT Strategy Callback", () => {
  test("Email does not exists", async () => {
    const payload: JwtPayload = { email: "abc@abc.com" };
    const mockCallback = jest.fn();
    await jwtStrategyCallback(payload, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
    // First argument null
    expect(mockCallback.mock.calls[0][0]).toBe(null);
    // Second argument false
    expect(mockCallback.mock.calls[0][1]).toBe(false);
  });

  test("Email exists", async () => {
    const payload: JwtPayload = { email: "john@example.com" };
    const mockCallback = jest.fn();
    await jwtStrategyCallback(payload, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(1);
    // First argument null
    expect(mockCallback.mock.calls[0][0]).toBe(null);
    // Second argument false
    const user = mockCallback.mock.calls[0][1];
    expect(user).toMatchObject({
      auth_provider: "email",
      email: "john@example.com",
      name: "john",
    });
  });
});
