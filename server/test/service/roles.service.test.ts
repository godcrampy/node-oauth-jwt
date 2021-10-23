import { expect, test } from "@jest/globals";
import { getRoleByNameOrCreate } from "../../src/services/role.service";
import Role, { RoleName } from "../../src/models/role.model";

test("Gets normal role", async () => {
  const role = await getRoleByNameOrCreate(RoleName.NORMAL);
  expect(role.name).toBe(RoleName.NORMAL);
});

test("Gets admin role", async () => {
  const role = await getRoleByNameOrCreate(RoleName.ADMIN);
  expect(role.name).toBe(RoleName.ADMIN);
});

test("Creates new role", async () => {
  const role = await getRoleByNameOrCreate("XYZ");
  expect(role.name).toBe("XYZ");
  expect(role.description).toBe("Xyz");
  let roles = await Role.findAll();
  expect(roles.length).toBe(3);
  await Role.destroy({ where: { name: "XYZ" } });
  roles = await Role.findAll();
  expect(roles.length).toBe(2);
});
