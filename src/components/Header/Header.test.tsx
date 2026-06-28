import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import type { Clock } from "@/types";

const clocks: Clock[] = [
  { id: "digital", label: "Digital" },
  { id: "binary", label: "Binary" },
];

const noop = () => {};

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders the logo and the theme toggle", () => {
    render(
      <Header clocks={clocks} selectedClockId="digital" onClockSelect={noop} />,
    );

    expect(screen.getByText("Clocks")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /switch to .* theme/i }),
    ).toBeInTheDocument();
  });

  it("defaults to the light theme and persists it", () => {
    render(
      <Header clocks={clocks} selectedClockId="digital" onClockSelect={noop} />,
    );

    expect(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    ).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles the theme when the button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Header clocks={clocks} selectedClockId="digital" onClockSelect={noop} />,
    );

    await user.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );

    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("renders a dropdown with all available clocks", () => {
    render(
      <Header clocks={clocks} selectedClockId="digital" onClockSelect={noop} />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Digital" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Binary" })).toBeInTheDocument();
  });

  it("calls onClockSelect when a different clock is chosen", async () => {
    const user = userEvent.setup();
    const onClockSelect = vi.fn();
    render(
      <Header
        clocks={clocks}
        selectedClockId="digital"
        onClockSelect={onClockSelect}
      />,
    );

    await user.selectOptions(screen.getByRole("combobox"), "binary");

    expect(onClockSelect).toHaveBeenCalledWith("binary");
  });
});
