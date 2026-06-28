import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

const links = [
  { name: "GitHub", href: "https://github.com/conradthegray/clocks" },
  { name: "Can I have a cookie?", href: "https://ko-fi.com/conradthegray" },
];

describe("Footer", () => {
  it("renders the GitHub and Ko-fi links", () => {
    render(<Footer />);

    for (const { name } of links) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("points each link at the right external URL, opened in a new tab", () => {
    render(<Footer />);

    for (const { name, href } of links) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("notes that the page collects no data", () => {
    render(<Footer />);
    expect(
      screen.getByText("This page does not collect any data."),
    ).toBeInTheDocument();
  });
});
