import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BarsClock } from "./BarsClock";

describe("BarsClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 12, 30, 45));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders three progress bars", () => {
    render(<BarsClock />);
    expect(screen.getAllByRole("progressbar")).toHaveLength(3);
  });

  it("labels bars as Hours, Minutes, and Seconds", () => {
    render(<BarsClock />);
    expect(screen.getByRole("progressbar", { name: "Hours" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Minutes" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Seconds" })).toBeInTheDocument();
  });

  it("sets hours bar to the current hour value out of 23", () => {
    render(<BarsClock />);
    const bar = screen.getByRole("progressbar", { name: "Hours" });
    expect(bar).toHaveAttribute("aria-valuenow", "12");
    expect(bar).toHaveAttribute("aria-valuemax", "23");
  });

  it("sets minutes bar to the current minutes value out of 59", () => {
    render(<BarsClock />);
    const bar = screen.getByRole("progressbar", { name: "Minutes" });
    expect(bar).toHaveAttribute("aria-valuenow", "30");
    expect(bar).toHaveAttribute("aria-valuemax", "59");
  });

  it("sets seconds bar to the current seconds value out of 59", () => {
    render(<BarsClock />);
    const bar = screen.getByRole("progressbar", { name: "Seconds" });
    expect(bar).toHaveAttribute("aria-valuenow", "45");
    expect(bar).toHaveAttribute("aria-valuemax", "59");
  });

  it("sets all bars to 0 at midnight", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 0, 0, 0));
    render(<BarsClock />);
    for (const bar of screen.getAllByRole("progressbar")) {
      expect(bar).toHaveAttribute("aria-valuenow", "0");
    }
  });

  it("updates all bars every second", () => {
    render(<BarsClock />);
    expect(screen.getByRole("progressbar", { name: "Seconds" })).toHaveAttribute(
      "aria-valuenow",
      "45",
    );

    act(() => {
      // Set 1s before target — advanceTimersByTime(1000) also ticks the fake clock forward
      vi.setSystemTime(new Date(2026, 0, 1, 13, 31, 9));
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByRole("progressbar", { name: "Hours" })).toHaveAttribute(
      "aria-valuenow",
      "13",
    );
    expect(screen.getByRole("progressbar", { name: "Minutes" })).toHaveAttribute(
      "aria-valuenow",
      "31",
    );
    expect(screen.getByRole("progressbar", { name: "Seconds" })).toHaveAttribute(
      "aria-valuenow",
      "10",
    );
  });
});
