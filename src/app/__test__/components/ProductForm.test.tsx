import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "@/components/ProductForm";
import { createProduct, updateProduct } from "@/lib/api";

// 🧩 Mock API dan fetch bawaan browser
global.fetch = jest.fn();
jest.mock("@/lib/api", () => ({
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

describe("ProductForm Component", () => {
  const mockCategories = [
    { id: 1, name: "Category A" },
    { id: 2, name: "Category B" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch categories API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });
  });

  it("renders form fields correctly", async () => {
    render(<ProductForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/images/i)).toBeInTheDocument();

    // Tunggu kategori muncul di dropdown
    await waitFor(() => expect(screen.getByText("Category A")).toBeInTheDocument());
  });

  it("submits form and calls createProduct", async () => {
    const mockOnSuccess = jest.fn();
    (createProduct as jest.Mock).mockResolvedValueOnce({ id: 10, title: "New Product" });

    render(<ProductForm onSuccess={mockOnSuccess} />);

    // Tunggu kategori muncul
    await screen.findByText("Category A");

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test Product" } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Nice product" } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/images/i), { target: { value: "https://example.com/img.jpg" } });

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      expect(createProduct).toHaveBeenCalledWith({
        title: "Test Product",
        price: 100,
        description: "Nice product",
        categoryId: 1,
        images: "https://example.com/img.jpg",
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("calls updateProduct when product prop is provided", async () => {
    const mockProduct = {
      id: 1,
      title: "Old Product",
      description: "Old desc",
      price: 50,
      category: 2,
      images: ["https://img.jpg"],
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: "Test Brand",
      thumbnail: "",
      quantity: 1,
    };

    (updateProduct as jest.Mock).mockResolvedValueOnce({
      ...mockProduct,
      title: "Updated Product",
    });

    // Mock fetch categories
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 2, name: "Category A" }],
    });

    render(<ProductForm product={mockProduct} />);

    // Tunggu dropdown kategori muncul
    await screen.findByText("Category A");

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Updated Product" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update product/i }));

    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalledWith(1, {
        title: "Updated Product",
        price: 50,
        description: "Old desc",
        categoryId: 2,
        images: "https://img.jpg",
      });
    });
  });
});
