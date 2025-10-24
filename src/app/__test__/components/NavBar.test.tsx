import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { isAuthenticated, getCookie, logout } from "@/lib/auth";

// Mock Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"), // default pathname
}));

// Mock auth utilities
jest.mock("@/lib/auth", () => ({
  getCookie: jest.fn(() => null),
  isAuthenticated: jest.fn(() => false),
  logout: jest.fn(),
}));

// Mock CartContext
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(() => ({
    cart: [],
  })),
}));

describe("nav bar component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/");
    (useCart as jest.Mock).mockReturnValue({ cart: [] });
    (isAuthenticated as jest.Mock).mockReturnValue(false);
    (getCookie as jest.Mock).mockReturnValue(null);
  });
  it("renders brand and default links", () => {
    render(<NavBar />);
    expect(screen.getByText("🛍️ RevoShop")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("shows Login button if not logged in", () => {
    render(<NavBar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows Logout button if logged in", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);
    render(<NavBar />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("shows Admin link if logged in as admin", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);
    (getCookie as jest.Mock).mockReturnValue("admin");
    render(<NavBar />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("calls logout() when Logout button clicked", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);
    render(<NavBar />);
    fireEvent.click(screen.getByText("Logout"));
    expect(logout).toHaveBeenCalled();
  });

  it("shows cart badge when items exist", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ id: 1, quantity: 2 }],
    });
    render(<NavBar />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
