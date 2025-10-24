import { render, screen, fireEvent } from "@testing-library/react";
import PopularProducts from "@/components/PopularProducts";

// 🔹 Mock komponen ProductCard agar tidak render detail aslinya
jest.mock("@/components/ProductCard", () => (props: any) => <div data-testid="product-card">{props.title}</div>);

Object.defineProperty(HTMLElement.prototype, "scrollBy", {
  configurable: true,
  value: jest.fn(),
});

describe("PopularProducts Component", () => {
  const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders up to 10 product cards", () => {
    render(<PopularProducts products={mockProducts} />);
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(10); // maksimal 10 produk ditampilkan
  });

  it("renders navigation buttons", () => {
    render(<PopularProducts products={mockProducts} />);
    expect(screen.getByRole("button", { name: "◀" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "▶" })).toBeInTheDocument();
  });

  it("calls scrollBy when right button is clicked", () => {
    render(<PopularProducts products={mockProducts} />);
    const rightButton = screen.getByRole("button", { name: "▶" });

    fireEvent.click(rightButton);
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });
  });

  it("calls scrollBy when left button is clicked", () => {
    render(<PopularProducts products={mockProducts} />);
    const leftButton = screen.getByRole("button", { name: "◀" });

    fireEvent.click(leftButton);
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });
  });

  it("does nothing if scrollRef is null", () => {
    const { container } = render(<PopularProducts products={[]} />);
    const buttons = container.querySelectorAll("button");

    buttons.forEach((btn) => fireEvent.click(btn));
  });
});
