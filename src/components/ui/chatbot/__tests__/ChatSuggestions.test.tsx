import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChatSuggestions } from "../ChatSuggestions";

describe("ChatSuggestions Component", () => {
  it("renders default section suggestions when sectionId is top", () => {
    const handleSelect = vi.fn();
    render(<ChatSuggestions sectionId="top" onSelect={handleSelect} />);

    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview & Bio/i)).toBeInTheDocument();
    expect(screen.getByText(/How does Rodrigo approach CRM & automation\?/i)).toBeInTheDocument();
  });

  it("renders projects section specific suggestions", () => {
    const handleSelect = vi.fn();
    render(<ChatSuggestions sectionId="projects" onSelect={handleSelect} />);

    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Tell me about the HODL Watcher BTC pipeline/i)).toBeInTheDocument();
  });

  it("triggers onSelect callback when clicking a suggestion button", () => {
    const handleSelect = vi.fn();
    render(<ChatSuggestions sectionId="contact" onSelect={handleSelect} />);

    const button = screen.getByText(/I want to send an email to Rodrigo/i);
    fireEvent.click(button);

    expect(handleSelect).toHaveBeenCalledWith("I want to send an email to Rodrigo");
  });
});
