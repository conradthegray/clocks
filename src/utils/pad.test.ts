import { describe, expect, it } from "vitest";
import { pad } from "./pad";

describe("pad", () => {
  it("pads single-digit numbers with a leading zero", () => {
    expect(pad(0)).toBe("00");
    expect(pad(7)).toBe("07");
  });

  it("leaves two-digit numbers unchanged", () => {
    expect(pad(23)).toBe("23");
    expect(pad(59)).toBe("59");
  });

  it("does not truncate numbers with more than two digits", () => {
    expect(pad(123)).toBe("123");
  });
});
