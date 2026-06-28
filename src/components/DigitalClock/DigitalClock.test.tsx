import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DigitalClock } from "./DigitalClock";

describe("DigitalClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 12, 34, 56));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the current time as HH:MM:SS", () => {
    render(<DigitalClock />);
    expect(screen.getByRole("timer")).toHaveTextContent("12:34:56");
  });

  it("pads single-digit values with a leading zero", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 1, 2, 3));
    render(<DigitalClock />);
    expect(screen.getByRole("timer")).toHaveTextContent("01:02:03");
  });

  it("advances the time every second", () => {
    render(<DigitalClock />);
    expect(screen.getByRole("timer")).toHaveTextContent("12:34:56");

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByRole("timer")).toHaveTextContent("12:34:57");
  });

  it("blinks the colons once per second", () => {
    render(<DigitalClock />);

    const visible = () =>
      screen
        .getAllByTestId("digital-colon")
        .every((colon) => colon.getAttribute("data-visible") === "true");

    expect(visible()).toBe(true);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(visible()).toBe(false);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(visible()).toBe(true);
  });
});
