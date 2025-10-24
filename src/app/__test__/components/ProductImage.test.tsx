import { render, screen, fireEvent } from "@testing-library/react";
import ProductImages from "@/components/ProductImage";

describe("ProductImages Component", () => {
  it("renders main image and thumbnails", () => {
    const images = ["https://example.com/img1.jpg", "https://example.com/img2.jpg", "https://example.com/img3.jpg"];

    render(<ProductImages images={images} title="Sample Product" />);

    // Main image awal
    const mainImage = screen.getByAltText("Sample Product") as HTMLImageElement;
    expect(mainImage).toBeInTheDocument();
    expect(mainImage.src).toContain("img1.jpg");

    // Thumbnail muncul
    const thumbs = screen.getAllByRole("img");
    expect(thumbs.length).toBeGreaterThan(1);
  });

  it("changes image when thumbnail clicked", () => {
    const images = ["https://example.com/img1.jpg", "https://example.com/img2.jpg"];

    render(<ProductImages images={images} title="Switch Test" />);

    // Klik thumbnail kedua
    const thumb2 = screen.getByAltText("Switch Test 1");
    fireEvent.click(thumb2);

    // Main image berubah
    const mainImage = screen.getByAltText("Switch Test") as HTMLImageElement;
    expect(mainImage.src).toContain("img2.jpg");
  });

  it("renders fallback image if no images provided", () => {
    render(<ProductImages images={[]} title="No Image Product" />);

    const fallback = screen.getByAltText("No Image Product") as HTMLImageElement;
    expect(fallback.src).toContain(encodeURIComponent("/no-image.png"));
  });
});
