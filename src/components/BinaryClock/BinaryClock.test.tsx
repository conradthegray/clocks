import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BinaryClock } from "./BinaryClock";

describe("BinaryClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 13:25:47 -> hour 0001 0011, min 0010 0101, sec 0100 0111
    vi.setSystemTime(new Date(2026, 0, 1, 13, 25, 47));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const countLitDots = () =>
    screen
      .getAllByTestId("binary-dot")
      .filter((dot) => dot.getAttribute("data-on") === "true").length;

  it("renders one dot per bit: 3 blocks x 2 digits x 4 bits = 24", () => {
    render(<BinaryClock />);
    expect(screen.getAllByTestId("binary-dot")).toHaveLength(24);
  });

  it("lights the dots matching the current time", () => {
    render(<BinaryClock />);
    // total set bits across 13, 25, 47
    expect(countLitDots()).toBe(10);
  });

  it("updates the displayed time on each interval tick", () => {
    render(<BinaryClock />);
    expect(countLitDots()).toBe(10);

    // advancing one second -> 13:25:48 -> sec 0100 1000 (two fewer set bits than 47)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(countLitDots()).toBe(8);
  });
});
