import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ChatBot } from "../ChatBot";

vi.mock("@/src/lib/useActiveSection", () => ({
  useActiveSection: () => "top",
}));

let mockVisitorContext = { languageCode: "es" };
let mockGreeting = "Hola! Soy Clippo.";

vi.mock("@/src/lib/useVisitorContext", () => ({
  useVisitorContext: () => ({
    context: mockVisitorContext,
    greeting: mockGreeting,
  }),
}));

vi.mock("../ClippoAvatar", () => ({
  ClippoAvatar: ({ size }: { size?: number }) => (
    <div data-testid="mock-clippo-avatar" style={{ width: size, height: size }}>
      Clippo Avatar
    </div>
  ),
}));

describe("ChatBot Auto-close behavior on outside unfocus / scroll / click", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockVisitorContext = { languageCode: "es" };
    mockGreeting = "Hola! Soy Clippo.";
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ reply: "Here is what you need to know about the architecture." }),
      })
    );
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("auto-closes 1s after outside click and displays the departure reminder in Spanish", () => {
    render(
      <div>
        <div data-testid="outside-area">Outside Content</div>
        <ChatBot />
      </div>
    );

    const trigger = screen.getByRole("button", { name: /Open Clippo Assistant/i });
    fireEvent.click(trigger);
    expect(screen.getByPlaceholderText(/Ask about systems/i)).toBeInTheDocument();

    // Click outside
    const outsideArea = screen.getByTestId("outside-area");
    fireEvent.mouseDown(outsideArea);

    // Fast-forward 900ms - should still be open
    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByPlaceholderText(/Ask about systems/i)).toBeInTheDocument();

    // Fast-forward remaining 200ms (total 1.1s > 1s)
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Chat should now be closed and floating bubble displays departure reminder
    expect(screen.queryByPlaceholderText(/Ask about systems/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Si quieres seguir acá estoy/i)
    ).toBeInTheDocument();
  });

  it("auto-closes and adapts to English departure reminder when conversation is conducted in English", async () => {
    render(
      <div>
        <div data-testid="outside-area">Outside Content</div>
        <ChatBot />
      </div>
    );

    const trigger = screen.getByRole("button", { name: /Open Clippo Assistant/i });
    fireEvent.click(trigger);

    // User chats in English
    const input = screen.getByPlaceholderText(/Ask about systems/i);
    fireEvent.change(input, { target: { value: "Can you tell me about the architecture projects?" } });
    const sendButton = screen.getByTitle(/Send message/i);
    await act(async () => {
      fireEvent.click(sendButton);
    });

    // Click outside
    const outsideArea = screen.getByTestId("outside-area");
    fireEvent.mouseDown(outsideArea);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.queryByPlaceholderText(/Ask about systems/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/If you'd like to continue, I'm right here! Feel free to plan your questions anytime./i)
    ).toBeInTheDocument();
  });

  it("auto-closes 1s after scrolling / wheeling outside the chat", () => {
    render(
      <div>
        <div data-testid="outside-area">Outside Content</div>
        <ChatBot />
      </div>
    );

    const trigger = screen.getByRole("button", { name: /Open Clippo Assistant/i });
    fireEvent.click(trigger);
    expect(screen.getByPlaceholderText(/Ask about systems/i)).toBeInTheDocument();

    // Scroll outside
    fireEvent.scroll(window);

    // Fast-forward 1.1s
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.queryByPlaceholderText(/Ask about systems/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Si quieres seguir acá estoy/i)
    ).toBeInTheDocument();
  });

  it("cancels auto-close if user clicks inside the chat container before 1s", () => {
    render(
      <div>
        <div data-testid="outside-area">Outside Content</div>
        <ChatBot />
      </div>
    );

    const trigger = screen.getByRole("button", { name: /Open Clippo Assistant/i });
    fireEvent.click(trigger);

    // Click outside
    const outsideArea = screen.getByTestId("outside-area");
    fireEvent.mouseDown(outsideArea);

    // Advance 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Click back inside chat input
    const input = screen.getByPlaceholderText(/Ask about systems/i);
    fireEvent.mouseDown(input);

    // Advance another 800ms (total 1.3s since outside click, but cancelled)
    act(() => {
      vi.advanceTimersByTime(800);
    });

    // Chat remains open
    expect(screen.getByPlaceholderText(/Ask about systems/i)).toBeInTheDocument();
  });
});
