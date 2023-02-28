import { describe, it, expect } from "vitest";
import { SimpleCalendar } from "./lib";

describe("Simple calendar lib", () => {
  it("should return 'hello calendar!!!'", () => {
    const calendar = new SimpleCalendar();
    expect(calendar.hello()).toBe("hello calendar!!!");
  });
});
