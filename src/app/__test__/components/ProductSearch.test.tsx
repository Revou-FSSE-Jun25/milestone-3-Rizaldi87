import { render, screen, fireEvent } from "@testing-library/react";
import ProductSearch from "@/components/ProductSearch"; // sesuaikan path-nya
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  getCookie: jest.fn(),
}));

describe("ProductSearch Component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<ProductSearch />);
    expect(screen.getByPlaceholderText(/cari produk/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cari/i })).toBeInTheDocument();
  });

  it("navigates to /store when non-admin and query is empty", () => {
    (getCookie as jest.Mock).mockReturnValue("user");

    render(<ProductSearch />);
    fireEvent.submit(screen.getByRole("search"));

    expect(pushMock).toHaveBeenCalledWith("/store");
  });

  it("navigates to /admin when admin and query is empty", () => {
    (getCookie as jest.Mock).mockReturnValue("admin");

    render(<ProductSearch />);
    fireEvent.submit(screen.getByRole("search"));

    expect(pushMock).toHaveBeenCalledWith("/admin");
  });

  it("navigates to /store?search=query for user input", () => {
    (getCookie as jest.Mock).mockReturnValue("user");

    render(<ProductSearch />);
    fireEvent.change(screen.getByPlaceholderText(/cari produk/i), {
      target: { value: "Classic Shirt" },
    });
    fireEvent.submit(screen.getByRole("search"));

    expect(pushMock).toHaveBeenCalledWith("/store?search=Classic%20Shirt");
  });

  it("navigates to /admin?search=query if admin", () => {
    (getCookie as jest.Mock).mockReturnValue("admin");

    render(<ProductSearch />);
    fireEvent.change(screen.getByPlaceholderText(/cari produk/i), {
      target: { value: "New Product" },
    });
    fireEvent.submit(screen.getByRole("search"));

    expect(pushMock).toHaveBeenCalledWith("/admin?search=New%20Product");
  });
});
