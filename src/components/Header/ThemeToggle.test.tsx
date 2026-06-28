import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("offers to switch to dark when the current theme is light", () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);

    const button = screen.getByRole("button", { name: "Switch to dark theme" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveTextContent("🌙");
  });

  it("offers to switch to light when the current theme is dark", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);

    const button = screen.getByRole("button", { name: "Switch to light theme" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveTextContent("☀️");
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<ThemeToggle theme="light" onToggle={onToggle} />);

    await user.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
