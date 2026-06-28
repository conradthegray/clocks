import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BarClock } from "./BarClock";

describe("BarClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 0, 1, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a progress bar", () => {
    render(<BarClock />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets progress to 50% at 12:00", () => {
    render(<BarClock />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
  });

  it("sets progress to 0% at midnight", () => {
    vi.setSystemTime(new Date(2026, 0, 1, 0, 0, 0));
    render(<BarClock />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("accounts for minutes in the progress calculation", () => {
    // 12:30 = 750/1440 ≈ 52.1%
    vi.setSystemTime(new Date(2026, 0, 1, 12, 30, 0));
    render(<BarClock />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "52");
  });

  it("updates when time advances", () => {
    render(<BarClock />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");

    act(() => {
      vi.setSystemTime(new Date(2026, 0, 1, 18, 0, 0));
      vi.advanceTimersByTime(1000);
    });

    // 18:00 = 1080/1440 = 75%
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("uses the accent color class for the fill", () => {
    render(<BarClock />);
    expect(screen.getByTestId("bar-fill")).toHaveClass("bg-accent");
  });

  it("uses the surface color class for the track", () => {
    render(<BarClock />);
    expect(screen.getByRole("progressbar")).toHaveClass("bg-surface");
  });
});
