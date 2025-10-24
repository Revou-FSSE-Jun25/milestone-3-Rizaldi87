import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/context/CartContext";

const addToCartMock = jest.fn();

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

const mockProductData = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 9.99,
  discountPercentage: 5,
  rating: 4.5,
  stock: 10,
  brand: "Test Brand",
  category: "Test Category",
  thumbnail: "test-thumbnail.jpg",
  images: ["test-image1.jpg", "test-image2.jpg"],
  quantity: 1,
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    addToCartMock.mockClear();
    (useCart as jest.Mock).mockReturnValue({ addToCart: addToCartMock });
  });

  it("should render the button", () => {
    render(<AddToCartButton product={mockProductData} />);
    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  it("should call addToCart when clicked", () => {
    render(<AddToCartButton product={mockProductData} />);
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(addToCartMock).toHaveBeenCalledWith(mockProductData);
    expect(addToCartMock).toHaveBeenCalledTimes(1);
  });
});
