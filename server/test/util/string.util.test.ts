import { expect, test } from "@jest/globals";
import { toTitleCase } from "../../src/util/string.util";

test("title case of 'hello' is 'Hello'", () => {
  expect(toTitleCase("hello")).toBe("Hello");
});
