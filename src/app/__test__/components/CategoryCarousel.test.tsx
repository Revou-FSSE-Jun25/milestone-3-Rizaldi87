import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CategoryCarousel from "@/components/CategoryCarousel";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("category carousel component", () => {
  beforeEach(() => {
    pushMock.mockClear();
    Element.prototype.scrollBy = jest.fn();
  });
  const mockCategories = [
    { id: 1, name: "Electronics", image: "electronics.jpg" },
    { id: 2, name: "Clothing", image: "clothing.jpg" },
    { id: 3, name: "Books", image: "books.jpg" },
  ];
  it("should render category carousel correctly", () => {
    // Test implementation goes here

    render(<CategoryCarousel categories={[...mockCategories]} />);

    //render previous and next button
    const prevButton = screen.getByRole("button", { name: "◀" });
    const afterButton = screen.getByRole("button", { name: "▶" });

    expect(prevButton).toBeInTheDocument();
    expect(afterButton).toBeInTheDocument();

    //render category cards
    mockCategories.forEach((category) => {
      const categoryCard = screen.getByText(category.name);
      expect(categoryCard).toBeInTheDocument();
    });
  });

  it("should scroll left on button clicks", () => {
    render(<CategoryCarousel categories={[...mockCategories]} />);
    const prevButton = screen.getByRole("button", { name: "◀" });

    fireEvent.click(prevButton);

    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });
  });
  it("should scroll right on button clicks", () => {
    render(<CategoryCarousel categories={[...mockCategories]} />);
    const afterButton = screen.getByRole("button", { name: "▶" });

    fireEvent.click(afterButton);

    expect(Element.prototype.scrollBy).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });
  });
});
