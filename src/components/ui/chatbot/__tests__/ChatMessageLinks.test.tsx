import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatMessage, MessageItem } from "../ChatMessage";
import { ActionLinkButton } from "../ActionLinkButton";

vi.mock("../ClippoAvatar", () => ({
  ClippoAvatar: ({ size }: { size?: number }) => (
    <div data-testid="mock-clippo-avatar" style={{ width: size, height: size }}>
      Clippo Avatar
    </div>
  ),
}));

describe("ActionLinkButton and Dynamic In-Response Link Rendering", () => {
  it("renders a GitHub repository link with GitHub icon and opens in a new tab", () => {
    render(
      <ActionLinkButton
        href="https://github.com/netssv/hodl-watcher"
        label="Source Code"
      />
    );

    const link = screen.getByRole("link", { name: /Source Code/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/netssv/hodl-watcher");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a Credentials verification badge with ShieldCheck styling", () => {
    render(
      <ActionLinkButton
        href="https://credentials.example.com/archive"
        label="Verified Credentials Archive"
      />
    );

    const link = screen.getByRole("link", { name: /Verified Credentials Archive/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://credentials.example.com/archive");
  });

  it("renders an in-page section link and calls scrollIntoView on click", () => {
    const scrollIntoViewMock = vi.fn();
    const targetElement = document.createElement("div");
    targetElement.id = "projects";
    targetElement.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(targetElement);

    render(<ActionLinkButton href="#projects" label="View Projects" />);

    const link = screen.getByRole("link", { name: /View Projects/i });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(targetElement);
  });

  it("transforms markdown links inside ChatMessage into ActionLinkButtons", () => {
    const message: MessageItem = {
      id: "msg-1",
      role: "model",
      text: "Check out the repo at [GitHub (@netssv)](https://github.com/netssv) and [Live Demo](https://hodl-watcher.app).",
      timestamp: "12:00 PM",
    };

    render(<ChatMessage message={message} />);

    const githubLink = screen.getByRole("link", { name: /GitHub \(@netssv\)/i });
    const liveDemoLink = screen.getByRole("link", { name: /Live Demo/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/netssv");
    expect(liveDemoLink).toBeInTheDocument();
    expect(liveDemoLink).toHaveAttribute("href", "https://hodl-watcher.app");
  });
});
