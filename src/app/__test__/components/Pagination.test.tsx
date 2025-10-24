import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination Component", () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all page buttons correctly", () => {
    render(<Pagination currentPage={1} totalPages={3} setCurrentPage={mockSetCurrentPage} />);

    // pastikan ada tombol Prev, Next, dan 3 halaman
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /\d+/ })).toHaveLength(3);
  });

  it("disables Prev button on first page", () => {
    render(<Pagination currentPage={1} totalPages={3} setCurrentPage={mockSetCurrentPage} />);
    const prevButton = screen.getByText("Prev");
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination currentPage={3} totalPages={3} setCurrentPage={mockSetCurrentPage} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("calls setCurrentPage when a page number is clicked", () => {
    render(<Pagination currentPage={1} totalPages={3} setCurrentPage={mockSetCurrentPage} />);
    const page2Button = screen.getByText("2");

    fireEvent.click(page2Button);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentPage when Next or Prev are clicked", () => {
    render(<Pagination currentPage={2} totalPages={3} setCurrentPage={mockSetCurrentPage} />);

    const prevButton = screen.getByText("Prev");
    const nextButton = screen.getByText("Next");

    fireEvent.click(prevButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);

    fireEvent.click(nextButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it("highlights the active page correctly", () => {
    render(<Pagination currentPage={2} totalPages={3} setCurrentPage={mockSetCurrentPage} />);
    const activePage = screen.getByText("2");

    expect(activePage).toHaveClass("bg-indigo-600");
  });
});
