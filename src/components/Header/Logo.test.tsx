import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders the project name", () => {
    render(<Logo />);
    expect(screen.getByText("Clocks")).toBeInTheDocument();
  });

  it("renders the author byline", () => {
    render(<Logo />);
    expect(screen.getByText("by Conrad Gray")).toBeInTheDocument();
  });
});
