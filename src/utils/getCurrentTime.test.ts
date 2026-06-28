import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentTime } from "./getCurrentTime";

describe("getCurrentTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("splits the current local time into hour, minutes and seconds", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 13, 25, 47));

    expect(getCurrentTime()).toEqual({ hour: 13, minutes: 25, seconds: 47 });
  });

  it("uses a 24-hour clock", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 23, 59, 59));

    expect(getCurrentTime()).toEqual({ hour: 23, minutes: 59, seconds: 59 });
  });

  it("reports midnight as all zeros", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 0, 0, 0));

    expect(getCurrentTime()).toEqual({ hour: 0, minutes: 0, seconds: 0 });
  });

  it("reflects the current moment in time", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 5, 3));
    expect(getCurrentTime()).toEqual({ hour: 8, minutes: 5, seconds: 3 });

    vi.advanceTimersByTime(1000);
    expect(getCurrentTime()).toEqual({ hour: 8, minutes: 5, seconds: 4 });
  });
});
