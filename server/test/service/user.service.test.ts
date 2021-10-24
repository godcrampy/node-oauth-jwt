import { expect, test, describe } from "@jest/globals";
import {
  createNormalUser,
  doesUserExistByEmail,
  getAllUsers,
  getUserByEmail,
} from "../../src/services/user.service";
import { RoleName } from "../../src/models/role.model";
import User from "../../src/models/user.model";

describe("Does user exists by email", () => {
  test("Existing", async () => {
    const yes = await doesUserExistByEmail("john@example.com");
    expect(yes).toBe(true);
  });

  test("Non Existing", async () => {
    const no = await doesUserExistByEmail("selena@example.com");
    expect(no).toBe(false);
  });
});

describe("Create normal user", () => {
  test("Creates a normal user", async () => {
    const users = await User.findAll();
    const user = await createNormalUser(
      "danny@example.com",
      "danny",
      "badpassword",
      "email"
    );
    expect(user).toMatchObject({
      auth_provider: "email",
      name: "danny",
      email: "danny@example.com",
      password: "badpassword",
    });
    const roles = await user.getRoles();
    expect(roles.length).toBe(1);
    expect(roles[0].name).toBe(RoleName.NORMAL);
    const newUsers = await User.findAll();

    expect(users.length + 1).toBe(newUsers.length);
    expect(newUsers.some((user) => user.email == "danny@example.com"));
  });
});

describe("Get user by email", () => {
  test("User exists", async () => {
    const user = await getUserByEmail("john@example.com");
    expect(user).toMatchObject({
      auth_provider: "email",
      name: "john",
      email: "john@example.com",
    });
  });

  test("User does not exists", async () => {
    try {
      await getUserByEmail("random@example.com");
      expect(true).toBe(false);
    } catch (err) {
      expect(true).toBe(true);
    }
  });
});

describe("Get all users", () => {
  test("Gets all users", async () => {
    const users = await getAllUsers();
    users.forEach((user) => {
      expect(user).toMatchObject({
        auth_provider: expect.any(String),
        email: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
      });
    });
  });
});
