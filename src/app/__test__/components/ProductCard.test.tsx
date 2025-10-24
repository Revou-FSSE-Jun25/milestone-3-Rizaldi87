import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("next/image", () => (props: any) => <img {...props} alt={props.alt} data-testid="product-image" />);

describe("ProductCard Component", () => {
  const mockProduct = {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();

    const img = screen.getByTestId("product-image") as HTMLImageElement;
    expect(img.src).toContain("test-image1.jpg");
  });

  it("navigates to the product page when Detail button is clicked", () => {
    render(<ProductCard {...mockProduct} />);

    const detailButton = screen.getByRole("button", { name: "Detail" });
    fireEvent.click(detailButton);

    expect(pushMock).toHaveBeenCalledWith("/store/1");
  });

  it("renders fallback image if no product image provided", () => {
    const productNoImage = { ...mockProduct, images: [] };
    render(<ProductCard {...productNoImage} />);

    const image = screen.getByTestId("product-image");
    expect(image).toHaveAttribute("src", "/no-image.png");
  });
  it("navigates to product detail page when Detail button clicked", () => {
    render(<ProductCard {...mockProduct} />);
    const button = screen.getByRole("button", { name: /detail/i });
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith("/store/1");
  });

  it("renders fallback image if no images provided", () => {
    const productWithoutImage = { ...mockProduct, images: [] };
    render(<ProductCard {...productWithoutImage} />);
    const img = screen.getByTestId("product-image") as HTMLImageElement;
    expect(img.src).toContain("/no-image.png");
  });
});
