import React from "react";
import "@testing-library/jest-dom";
import CategoryCard from "@/components/CategoryCard";
import { fireEvent, render, screen } from "@testing-library/react";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("category card component", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  it("should render category card correctly", () => {
    // Test implementation goes here

    // Render the CategoryCard component with test props
    render(<CategoryCard id={1} name="Electronics" images="image-url" slug="electronics" />);
    const categoryName = screen.getByRole("heading", {
      level: 1,
      name: /Electronics/i,
    });
    expect(categoryName).toBeInTheDocument();

    const categoryImage = screen.getByRole("img", {
      name: /product image/i,
    });
    expect(categoryImage).toBeInTheDocument();

    const goToStoreButton = screen.getByRole("button", {
      name: /go to store/i,
    });
    expect(goToStoreButton).toBeInTheDocument();
  });

  it("should navigate to store on button click", () => {
    render(<CategoryCard id={1} name="Electronics" images="image-url" slug="electronics" />);
    const goToStoreButton = screen.getByRole("button", {
      name: /Go To Store/i,
    });
    fireEvent.click(goToStoreButton);

    expect(pushMock).toHaveBeenCalledWith("/store/?categoryId=1");
    expect(pushMock).toHaveBeenCalledTimes(1);
  });
});
